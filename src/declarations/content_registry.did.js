export const idlFactory = ({ IDL }) => {
  const ContentRegistration = IDL.Record({
    'id' : IDL.Text,
    'total_sales' : IDL.Nat64,
    'title' : IDL.Text,
    'creator' : IDL.Principal,
    'content_hash' : IDL.Text,
    'description' : IDL.Text,
    'created_at' : IDL.Nat64,
    'total_revenue' : IDL.Nat64,
    'is_active' : IDL.Bool,
    'price_icp' : IDL.Nat64,
  });
  const PaymentRecord = IDL.Record({
    'id' : IDL.Text,
    'creator' : IDL.Principal,
    'transaction_hash' : IDL.Text,
    'content_id' : IDL.Text,
    'amount_icp' : IDL.Nat64,
    'timestamp' : IDL.Nat64,
    'buyer' : IDL.Principal,
  });
  const Result_1 = IDL.Variant({ 'Ok' : PaymentRecord, 'Err' : IDL.Text });
  const Result = IDL.Variant({ 'Ok' : ContentRegistration, 'Err' : IDL.Text });
  return IDL.Service({
    'get_content' : IDL.Func(
        [IDL.Text],
        [IDL.Opt(ContentRegistration)],
        ['query'],
      ),
    'get_content_by_creator' : IDL.Func(
        [IDL.Principal],
        [IDL.Vec(ContentRegistration)],
        ['query'],
      ),
    'get_payments_by_buyer' : IDL.Func(
        [IDL.Principal],
        [IDL.Vec(PaymentRecord)],
        ['query'],
      ),
    'get_payments_for_content' : IDL.Func(
        [IDL.Text],
        [IDL.Vec(PaymentRecord)],
        ['query'],
      ),
    'get_stats' : IDL.Func([], [IDL.Nat64, IDL.Nat64], ['query']),
    'has_purchased_content' : IDL.Func(
        [IDL.Principal, IDL.Text],
        [IDL.Bool],
        ['query'],
      ),
    'record_payment' : IDL.Func(
        [IDL.Text, IDL.Text, IDL.Nat64, IDL.Text],
        [Result_1],
        [],
      ),
    'register_content' : IDL.Func(
        [IDL.Text, IDL.Text, IDL.Text, IDL.Text, IDL.Nat64],
        [Result],
        [],
      ),
    'update_content_status' : IDL.Func([IDL.Text, IDL.Bool], [Result], []),
  });
};
export const init = ({ IDL }) => { return []; };
