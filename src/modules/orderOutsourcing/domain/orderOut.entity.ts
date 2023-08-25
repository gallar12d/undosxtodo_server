export interface OrderOutsourcingEntity {
  id: string;
  orderNumber: string;
  orderId: number;
  customerName: string;
  customerAddress: string;
  city: string;
  customerEmail: string;
  customerPhoneNumber: string;
  sellerName: string;
  sellerAddress: string;
  sellerPhoneNumber: string;
  expectedDeliveryDate: string;
  expectedPickupTime: string;
  expectedDeliveryTime: string;
  pickupLatitude: string;
  pickupLongitude: string;
  deliveryLatitude: string;
  deliveryLongitude: string;
  orderItem: object[];
  tips: number;
  tax: number;
  discountAmount: number;
  deliveryFee: number;
  totalOrderCost: number;
  pickupInstruction: string;
  deliveryInstruction: string;
  orderSource: string;
  additionalId: string;
  clientId: number;
  paymentMethod: string;
  creditCardType: string;
  creditCardId: number;
  pickup: Object;
  dropoff: Object;
  orderState: string;
}