
# CreatorChain - Decentralized Content Monetization Platform

CreatorChain is a decentralized platform built on the Internet Computer (ICP) blockchain that allows content creators to monetize their work directly through smart contracts, ensuring fair compensation and copyright protection.

## 🚀 Features

- **Secure Authentication**: Email/password authentication with Supabase
- **File Upload & Storage**: Upload various content types (images, videos, audio, PDFs)
- **ICP Wallet Integration**: Connect ICP wallets for blockchain transactions
- **Smart Contract Protection**: Rust-based canisters for copyright and payment management
- **Instant Payments**: Direct creator-to-consumer transactions
- **Zero Platform Fees**: Creators keep 100% of their earnings

## 🛠 Tech Stack

### Frontend
- **React 18** with TypeScript
- **Tailwind CSS** for styling
- **Shadcn/UI** component library
- **React Router** for navigation
- **Sonner** for notifications

### Backend
- **Supabase** for database and authentication
- **Supabase Storage** for file storage
- **Row Level Security (RLS)** for data protection

### Blockchain
- **Internet Computer (ICP)** blockchain
- **Rust** for smart contract development
- **Candid** for interface definitions
- **Internet Identity** for decentralized authentication

## 📦 Project Structure

```
CreatorChain/
├── src/
│   ├── components/          # React components
│   ├── pages/              # Page components
│   ├── hooks/              # Custom React hooks
│   ├── integrations/       # Supabase integration
│   └── lib/                # Utility functions
├── canisters/
│   └── content_registry/   # Rust smart contract
├── public/                 # Static assets
└── docs/                   # Documentation
```

## 🚦 Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn
- Rust and Cargo (for canister development)
- DFX CLI (Internet Computer SDK)
- Supabase account

### Installation

1. **Clone and install dependencies:**
```bash
git clone <repository-url>
cd CreatorChain
npm install
```

2. **Set up Supabase:**
   - Create a new Supabase project
   - Run the SQL migrations (provided in the setup)
   - Configure authentication providers
   - Set up storage bucket with proper policies

3. **Configure environment variables:**
```bash
# Create .env.local file
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

4. **Install DFX and set up local ICP environment:**
```bash
sh -ci "$(curl -fsSL https://internetcomputer.org/install.sh)"
dfx start --background
```

5. **Deploy smart contracts:**
```bash
dfx deploy --with-cycles 1000000000000
```

6. **Start development server:**
```bash
npm run dev
```

## 🔧 Database Schema

### Tables

1. **profiles** - User profile information
2. **content** - Content metadata and file information
3. **transactions** - Payment and transaction records

### Storage

- **content-files** bucket for uploaded content with proper access controls

## 🔐 Authentication Flow

1. User signs up/signs in with email/password
2. Profile automatically created in database
3. User can connect ICP wallet for blockchain interactions
4. Content upload and monetization features unlocked

## 📤 Content Upload Process

1. **File Upload**: Users upload content to Supabase storage
2. **Metadata Storage**: File information saved to database
3. **Smart Contract Registration**: Content registered on ICP blockchain
4. **Copyright Protection**: Immutable ownership record created
5. **Monetization**: Content available for purchase with instant payments

## 🌐 Smart Contract Features

The Rust-based canister provides:

- Content registration with ownership proof
- Payment processing and recording
- Revenue tracking for creators
- Purchase verification for buyers
- Content access control

### Key Functions

- `register_content()` - Register new content on blockchain
- `record_payment()` - Process and record payments
- `get_content_by_creator()` - Retrieve creator's content
- `has_purchased_content()` - Verify purchase access

## 🔗 ICP Wallet Integration

### Supported Wallets
- Internet Identity (primary authentication)
- Stoic Wallet
- Plug Wallet
- Other ICP-compatible wallets

### Transaction Flow
1. User connects wallet
2. Smart contract validates payment
3. Funds transferred to creator
4. Purchase recorded on blockchain
5. Access granted to buyer

## 🚀 Deployment

### Frontend Deployment
The frontend can be deployed to any static hosting service:
- Vercel
- Netlify
- GitHub Pages

### Canister Deployment
Deploy to ICP mainnet:
```bash
dfx deploy --network ic --with-cycles 1000000000000
```

### Production Configuration
1. Update Supabase URL configuration
2. Configure authentication redirects
3. Set up custom domain
4. Enable email confirmations
5. Configure storage policies

## 🧪 Testing

### Local Development
```bash
npm run test
```

### Canister Testing
```bash
dfx canister call content_registry get_stats
```

## 📋 TODO / Roadmap

### Phase 1 (Current)
- [x] Basic authentication
- [x] File upload functionality
- [x] Database structure
- [x] Smart contract template
- [x] ICP wallet integration (full implementation)
- [ ] Payment processing

### Phase 2 (Next)
- [ ] Content marketplace
- [ ] Advanced search and filtering
- [ ] Creator analytics dashboard
- [ ] Subscription models
- [ ] NFT integration

### Phase 3 (Future)
- [ ] Decentralized governance
- [ ] Cross-chain compatibility
- [ ] Mobile application
- [ ] Advanced smart contract features

## 🤝 Contributing

1. Fork the repository
2. Create feature branch
3. Make changes
4. Add tests
5. Submit pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support and questions:
- Create an issue on GitHub
- Join our Discord community
- Check the documentation

## 🔧 Manual Setup Steps

After downloading/cloning the project, you'll need to:

1. **Supabase Configuration:**
   - Run the provided SQL migrations
   - Set up authentication providers
   - Configure storage bucket policies
   - Add environment variables

2. **ICP Development:**
   - Install DFX CLI
   - Start local replica
   - Deploy canisters
   - Configure wallet connections

3. **Environment Setup:**
   - Create `.env.local` with Supabase credentials
   - Configure authentication redirects
   - Set up proper CORS policies

The platform is designed to be production-ready with proper security, scalability, and user experience considerations.
