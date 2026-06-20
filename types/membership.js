/**
 * @typedef {{
 *  discountBold: string
 *  testCountBold: string
 * }} PerksRefObject
 *
 * @typedef {keyof typeof import("constant/membership").MEMBERSHIP_ACTIVITY_TYPES} MembershipActivityTypes
 * @typedef {keyof typeof import("constant/membership").MEMBERSHIP_TIERS} MembershipTiers
 *
 * @typedef {{
 *  tier: MembershipTiers,
 *  discount_percent: number,
 *  price: number,
 *  final_price: number,
 *  discount_price: number,
 * }} ProductMembershipTierPrice
 *
 * @typedef {{
 *  icon: IconProps
 *  title: string
 *  isMostPopular: boolean
 *  perks: Array<string>
 *  perksRef: PerksRefObject
 *  price: ?number
 *  priceString: ?string
 *  totalPaid: ?number
 *  totalPaidString: ?string
 *  userId: ?string
 *  isPendingPayment: boolean
 * }} MembershipTier
 *
 * @typedef {{
 *  id: string
 *  name: string
 *  code: string
 *  payment_method_type: string
 *  logo_pic: string
 *  min_amount: number
 *  max_amount: number
 *  admin_fee_amount: number
 *  admin_fee_percent: number
 *  deadline_minutes: number
 *  country_id: string
 *  currency: string
 *  can_receive: boolean
 *  can_send: boolean
 *  remarks: string
 * }} PaymentMethod
 *
 * @typedef {{
 *  status: string
 *  memberType: string
 *  startDate: string
 *  endDate: string
 *  numberOfPurchase: number
 *  totalPaid: number
 *  isLoading: boolean
 *  error: string
 *  checkoutTier: string
 *  remainingProfilingTest: string
 * }} MembershipInitialState
 *
 * @typedef {{
 *  type: ?MembershipActivityTypes
 *  activity_date: ?string
 *  sort_by: ?string
 *  limit: ?number
 *  page: ?number
 * }} MembershipActivitiesQuery
 *
 * @typedef {{
 *  userId: string
 * }} MembershipActivitiesParam
 *
 *
 * @typedef {{
 *  total_amount_string: string
 *  user_id: string
 *  activity_date: string
 *  activity_type: MembershipActivityTypes
 *  description: string
 *  ref_code: string
 *  total_amount: number
 *  id: string
 * }} MembershipActivitiesResData
 *
 */
