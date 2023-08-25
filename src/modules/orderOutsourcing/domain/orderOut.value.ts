import { v4 as uuid } from "uuid";
import { OrderOutsourcingEntity } from "./orderOut.entity";

export class OrderValue implements OrderOutsourcingEntity {
  id: string;
  orderNumber: string;
  orderId: number;
  customerName: string;
  customerAddress: string;
  city: string;
  customerEmail: string;
  customerPhoneNumber: string;
  sellerId: string;
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

  constructor({
    orderNumber,
    orderId,
    customerName,
    customerAddress,
    city,
    customerEmail,
    customerPhoneNumber,
    sellerId,
    sellerName,
    sellerAddress,
    sellerPhoneNumber,
    expectedDeliveryDate,
    expectedPickupTime,
    expectedDeliveryTime,
    pickupLatitude,
    pickupLongitude,
    deliveryLatitude,
    deliveryLongitude,
    orderItem,
    tips,
    tax,
    discountAmount,
    deliveryFee,
    totalOrderCost,
    pickupInstruction,
    deliveryInstruction,
    orderSource,
    additionalId,
    clientId,
    paymentMethod,
    creditCardType,
    creditCardId,
    pickup,
    dropoff,
    orderState
  }: {
    orderNumber: string;
    orderId: number;
    customerName: string;
    customerAddress: string;
    city: string;
    customerEmail: string;
    customerPhoneNumber: string;
    sellerId: string;
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
  }) {
    this.id = uuid();
    this.orderNumber = orderNumber;
    this.orderId = orderId;
    this.customerName = customerName;
    this.customerAddress = customerAddress;
    this.city = city;
    this.customerEmail = customerEmail;
    this.customerPhoneNumber = customerPhoneNumber;
    this.sellerId = sellerId;
    this.sellerName = sellerName;
    this.sellerAddress = sellerAddress;
    this.sellerPhoneNumber = sellerPhoneNumber;
    this.expectedDeliveryDate = expectedDeliveryDate;
    this.expectedPickupTime = expectedPickupTime;
    this.expectedDeliveryTime = expectedDeliveryTime;
    this.pickupLatitude = pickupLatitude;
    this.pickupLongitude = pickupLongitude;
    this.deliveryLatitude = deliveryLatitude;
    this.deliveryLongitude = deliveryLongitude;
    this.orderItem = orderItem;
    this.tips = tips;
    this.tax = tax;
    this.discountAmount = discountAmount;
    this.deliveryFee = deliveryFee;
    this.totalOrderCost = totalOrderCost;
    this.pickupInstruction = pickupInstruction;
    this.deliveryInstruction = deliveryInstruction;
    this.orderSource = orderSource;
    this.additionalId = additionalId;
    this.clientId = clientId;
    this.paymentMethod = paymentMethod;
    this.creditCardType = creditCardType;
    this.creditCardId = creditCardId;
    this.pickup = pickup;
    this.dropoff = dropoff;
    this.orderState = orderState;
  }
}
