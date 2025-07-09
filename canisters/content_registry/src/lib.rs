
use candid::{CandidType, Deserialize, Principal};
use ic_cdk::api::time;
use ic_cdk_macros::*;
use ic_stable_structures::{
    memory_manager::{MemoryId, MemoryManager, VirtualMemory},
    storable::Bound,
    DefaultMemoryImpl, StableBTreeMap, Storable,
};
use std::{borrow::Cow, cell::RefCell};

type Memory = VirtualMemory<DefaultMemoryImpl>;

// Content registration structure
#[derive(CandidType, Deserialize, Clone)]
pub struct ContentRegistration {
    pub id: String,
    pub creator: Principal,
    pub title: String,
    pub description: String,
    pub content_hash: String,
    pub price_icp: u64, // Price in e8s (1 ICP = 100_000_000 e8s)
    pub created_at: u64,
    pub total_sales: u64,
    pub total_revenue: u64,
    pub is_active: bool,
}

// Payment record structure
#[derive(CandidType, Deserialize, Clone)]
pub struct PaymentRecord {
    pub id: String,
    pub content_id: String,
    pub buyer: Principal,
    pub creator: Principal,
    pub amount_icp: u64,
    pub timestamp: u64,
    pub transaction_hash: String,
}

// Implement Storable for ContentRegistration
impl Storable for ContentRegistration {
    fn to_bytes(&self) -> Cow<[u8]> {
        Cow::Owned(candid::encode_one(self).unwrap())
    }

    fn from_bytes(bytes: Cow<[u8]>) -> Self {
        candid::decode_one(&bytes).unwrap()
    }

    const BOUND: Bound = Bound::Unbounded;
}

// Implement Storable for PaymentRecord
impl Storable for PaymentRecord {
    fn to_bytes(&self) -> Cow<[u8]> {
        Cow::Owned(candid::encode_one(self).unwrap())
    }

    fn from_bytes(bytes: Cow<[u8]>) -> Self {
        candid::decode_one(&bytes).unwrap()
    }

    const BOUND: Bound = Bound::Unbounded;
}

thread_local! {
    static MEMORY_MANAGER: RefCell<MemoryManager<DefaultMemoryImpl>> =
        RefCell::new(MemoryManager::init(DefaultMemoryImpl::default()));

    static CONTENT_REGISTRY: RefCell<StableBTreeMap<String, ContentRegistration, Memory>> =
        RefCell::new(StableBTreeMap::init(
            MEMORY_MANAGER.with(|m| m.borrow().get(MemoryId::new(0)))
        ));

    static PAYMENT_RECORDS: RefCell<StableBTreeMap<String, PaymentRecord, Memory>> =
        RefCell::new(StableBTreeMap::init(
            MEMORY_MANAGER.with(|m| m.borrow().get(MemoryId::new(1)))
        ));
}

// Register new content
#[update]
fn register_content(
    id: String,
    title: String,
    description: String,
    content_hash: String,
    price_icp: u64,
) -> Result<ContentRegistration, String> {
    let caller = ic_cdk::caller();
    
    if caller == Principal::anonymous() {
        return Err("Anonymous users cannot register content".to_string());
    }

    let content = ContentRegistration {
        id: id.clone(),
        creator: caller,
        title,
        description,
        content_hash,
        price_icp,
        created_at: time(),
        total_sales: 0,
        total_revenue: 0,
        is_active: true,
    };

    CONTENT_REGISTRY.with(|registry| {
        registry.borrow_mut().insert(id, content.clone());
    });

    Ok(content)
}

// Record a payment for content
#[update]
fn record_payment(
    payment_id: String,
    content_id: String,
    amount_icp: u64,
    transaction_hash: String,
) -> Result<PaymentRecord, String> {
    let buyer = ic_cdk::caller();
    
    if buyer == Principal::anonymous() {
        return Err("Anonymous users cannot make payments".to_string());
    }

    // Get content details
    let content = CONTENT_REGISTRY.with(|registry| {
        registry.borrow().get(&content_id)
    });

    let content = match content {
        Some(c) => c,
        None => return Err("Content not found".to_string()),
    };

    if !content.is_active {
        return Err("Content is not active".to_string());
    }

    if amount_icp < content.price_icp {
        return Err("Insufficient payment amount".to_string());
    }

    // Create payment record
    let payment = PaymentRecord {
        id: payment_id.clone(),
        content_id: content_id.clone(),
        buyer,
        creator: content.creator,
        amount_icp,
        timestamp: time(),
        transaction_hash,
    };

    // Save payment record
    PAYMENT_RECORDS.with(|payments| {
        payments.borrow_mut().insert(payment_id, payment.clone());
    });

    // Update content statistics
    let mut updated_content = content;
    updated_content.total_sales += 1;
    updated_content.total_revenue += amount_icp;

    CONTENT_REGISTRY.with(|registry| {
        registry.borrow_mut().insert(content_id, updated_content);
    });

    Ok(payment)
}

// Get content by ID
#[query]
fn get_content(id: String) -> Option<ContentRegistration> {
    CONTENT_REGISTRY.with(|registry| {
        registry.borrow().get(&id)
    })
}

// Get content by creator
#[query]
fn get_content_by_creator(creator: Principal) -> Vec<ContentRegistration> {
    CONTENT_REGISTRY.with(|registry| {
        registry
            .borrow()
            .iter()
            .filter(|(_, content)| content.creator == creator)
            .map(|(_, content)| content)
            .collect()
    })
}

// Get payment records for content
#[query]
fn get_payments_for_content(content_id: String) -> Vec<PaymentRecord> {
    PAYMENT_RECORDS.with(|payments| {
        payments
            .borrow()
            .iter()
            .filter(|(_, payment)| payment.content_id == content_id)
            .map(|(_, payment)| payment)
            .collect()
    })
}

// Get payments by buyer
#[query]
fn get_payments_by_buyer(buyer: Principal) -> Vec<PaymentRecord> {
    PAYMENT_RECORDS.with(|payments| {
        payments
            .borrow()
            .iter()
            .filter(|(_, payment)| payment.buyer == buyer)
            .map(|(_, payment)| payment)
            .collect()
    })
}

// Check if user has purchased content
#[query]
fn has_purchased_content(buyer: Principal, content_id: String) -> bool {
    PAYMENT_RECORDS.with(|payments| {
        payments
            .borrow()
            .iter()
            .any(|(_, payment)| payment.buyer == buyer && payment.content_id == content_id)
    })
}

// Update content status (deactivate/activate)
#[update]
fn update_content_status(content_id: String, is_active: bool) -> Result<ContentRegistration, String> {
    let caller = ic_cdk::caller();
    
    let content = CONTENT_REGISTRY.with(|registry| {
        registry.borrow().get(&content_id)
    });

    let mut content = match content {
        Some(c) => c,
        None => return Err("Content not found".to_string()),
    };

    if content.creator != caller {
        return Err("Only the creator can update content status".to_string());
    }

    content.is_active = is_active;

    CONTENT_REGISTRY.with(|registry| {
        registry.borrow_mut().insert(content_id, content.clone());
    });

    Ok(content)
}

// Get canister stats
#[query]
fn get_stats() -> (u64, u64) {
    let content_count = CONTENT_REGISTRY.with(|registry| registry.borrow().len());
    let payment_count = PAYMENT_RECORDS.with(|payments| payments.borrow().len());
    
    (content_count, payment_count)
}

// Export Candid interface
ic_cdk::export_candid!();
