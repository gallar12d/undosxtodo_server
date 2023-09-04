import mongoose from "mongoose";
import { OrderOutsourcingEntity } from "../../domain/orderOut.entity";
import { OrderRepository } from "../../domain/orderOut.respository";
import { OrderOutsourcingModel } from "../model/orderOut.schema";
import { SellerModel } from "../../../seller/infrastructure/model/seller.schema";
import axios from 'axios';
import jwt from "jsonwebtoken";
import { VehicleModel } from "../../../vehicle/infrastructure/model/vehicle.schema";
import { DepotModel } from "../../../depot/infrastructure/model/depot.schema";
import schedule from "node-schedule";
import { DateTime } from 'luxon';

import Shipday from 'shipday/integration';
import OrderInfoRequest from "shipday/integration/order/request/order.info.request";
import PaymentMethod from "shipday/integration/order/types/payment.method";
import CardType from "shipday/integration/order/types/card.type";
import OrderItem from "shipday/integration/order/request/order.item";

export class MongoRepository implements OrderRepository {

  private shipdayClient: Shipday;

  public constructor() {
    this.shipdayClient = new Shipday('A9xc9Tk8QH.dcWOv1xxmMnXFwxti9HZ', 10000);
    // this.shipdayClient.orderService.getOrders().then( (d)=> console.log(d) )
  }

  public async registerOrder(order: OrderOutsourcingEntity): Promise<any | null> {
    try {
      let res: any;
      const orderInfoRequest = new OrderInfoRequest(
        order.orderNumber,
        order.customerName,
        order.customerAddress,
        order.customerEmail,
        order.customerPhoneNumber,
        order.sellerName,
        order.sellerAddress
      );


      orderInfoRequest.setRestaurantPhoneNumber(order.sellerPhoneNumber);
      // orderInfoRequest.setExpectedDeliveryDate(new Date(order.expectedDeliveryDate));
      // orderInfoRequest.setExpectedDeliveryTime(order.expectedDeliveryTime);
      // orderInfoRequest.setExpectedPickupTime(order.expectedPickupTime);
      // orderInfoRequest.setPickupLatLong(order.pickupLatitude, order.pickupLongitude);
      // orderInfoRequest.setDeliveryLatLong(order.deliveryLatitude, order.deliveryLongitude);
      // orderInfoRequest.setTips(order.tips);
      // orderInfoRequest.setTax(order.tax);
      // orderInfoRequest.setDiscountAmount(order.discountAmount);
      // orderInfoRequest.setDeliveryFee(order.deliveryFee);
      orderInfoRequest.setTotalOrderCost(order.totalOrderCost);
      // orderInfoRequest.setDeliveryInstruction(order.deliveryInstruction);
      // orderInfoRequest.setOrderSource(order.orderSource);
      // orderInfoRequest.setAdditionalId(order.additionalId);
      // orderInfoRequest.setClientRestaurantId(order.clientId);

      const itemsArr = [];
      order.orderItem.forEach((item: any) => {
        itemsArr.push(new OrderItem(item.name, parseInt(item.subtotal), parseInt(item.quantity)));
      });

      orderInfoRequest.setOrderItems(itemsArr);

      const res2 = await this.shipdayClient.orderService.insertOrder(orderInfoRequest);
      if (res2.success === true) {
        order.orderId = res2.orderId;
        res = await OrderOutsourcingModel.create(order);
      }

      // console.log(res2);
      return res;
    } catch (error) {
      console.log(error);
    }
  }

  public async getOrdersPage(seller_id, pag): Promise<any | null> {
    const options = {
      page: pag,
      limit: 6,
      sort: { createdAt: -1 }
    }

    var orders = await OrderOutsourcingModel.paginate({ sellerId: new mongoose.Types.ObjectId(seller_id) }, options);
    orders = JSON.parse(JSON.stringify(orders));

    for await (const order of orders.docs) {
      order.createdAt = new Date(order.createdAt).toISOString().slice(0, 10);
    }

    return orders;
  }

  public async getOrderOutDate(body: any): Promise<any | null> {
    const theDate = body.date.split('-');
    const theYear = parseInt(theDate[0]);
    const theMonth = parseInt(theDate[1]);
    const theDay = parseInt(theDate[2]);

    if (body.rol === 'superuser') {
      let ordersDate = [];
      if (Number.isNaN(theDay)) {
        ordersDate = await OrderOutsourcingModel.find({ createdAt: { $gt: new Date(`${theYear}-${theMonth}-01`), $lt: new Date(`${theYear}-${theMonth + 1}-01`) } });
      } else {
        ordersDate = await OrderOutsourcingModel.find({ createdAt: { $gt: new Date(`${theYear}-${theMonth}-${theDay}`) } });
      }
      ordersDate = JSON.parse(JSON.stringify(ordersDate));
      for await (const order of ordersDate) {
        order.createdAt = new Date(order.createdAt).toISOString().slice(0, 10);
      }
      return ordersDate;
    }

    let ordersDate = [];
    if (Number.isNaN(theDay)) {
      ordersDate = await OrderOutsourcingModel.find({ createdAt: { $gt: new Date(`${theYear}-${theMonth}-01`), $lt: new Date(`${theYear}-${theMonth + 1}-01`) }, sellerId: new mongoose.Types.ObjectId(body.seller_id) });
    } else {
      ordersDate = await OrderOutsourcingModel.find({ createdAt: { $gt: new Date(`${theYear}-${theMonth}-${theDay}`) }, sellerId: new mongoose.Types.ObjectId(body.seller_id) });
    }
    ordersDate = JSON.parse(JSON.stringify(ordersDate));
    for await (const order of ordersDate) {
      order.createdAt = new Date(order.createdAt).toISOString().slice(0, 10);
    }

    return ordersDate;
  }

  public async recentOutOrders(body: any): Promise<any | null> {
    const options = {
      page: 1,
      limit: 10,
      sort: { createdAt: -1 },
      // select: { client_name: 1, client_surname: 1, products: 1, value_to_collect: 1, guide_status: 1 }
    }

    let recentOrders: any = [];
    recentOrders = await OrderOutsourcingModel.paginate({ sellerId: new mongoose.Types.ObjectId(body.seller_id) }, { options });

    return recentOrders;
  }

  public async setOrderStatus(event: any): Promise<any | null> {
    // El token brindado a Shipday para el cambio de estado caduca dentro de 10 años y fue creado en el 2023
    console.log(event);
    console.log();
    await OrderOutsourcingModel.updateOne({ orderId: event.order.id }, { $set: { orderState: event.order_status } });
    return event;
  }

  public async allOutOrders(pag: any): Promise<any | null> {
    const options = {
      page: pag,
      limit: 7,
      sort: { createdAt: -1 }
    }

    var result = await OrderOutsourcingModel.paginate({}, options);
    const orders = JSON.parse(JSON.stringify(result));
    for await (const order of orders.docs) {
      order.seller = order.sellerName;
      order.equalDates = order.createdAt === order.updatedAt;
      order.createdAt = new Date(order.createdAt).toISOString().slice(0, 10);
    }

    return orders;
  }

  public async getOrderOutsourcing(order: any): Promise<any | null> {
    const myOrder = await this.shipdayClient.orderService.getOrderDetails(order.orderNumber);
    return myOrder;
  }

}