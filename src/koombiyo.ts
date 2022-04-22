import axios from 'axios';
import { KoobiyoNewOrderRequest, KoobiyoPikcUpRequest, KoobiyoRespose, OrderHistoryResponse, OrderTracking, OrderTrackingResponse, ReturnItemsResponse, ReturnNotesResponse } from './model';

class Koombiyo {
  private static _apiHost: string = "https://application.koombiyodelivery.lk/api";
  private static _apiKey: string;
  private static _debug: boolean;

  static init(apiKey: string, debug = false) {
    this._apiKey = apiKey;
    this._debug = debug;
  }

  static _koobiyoAPIFn = async (endpoint: string, body: object = {}): Promise<any> => {
    if (Koombiyo._debug) console.log('Koobiyo Req:', endpoint, body);

    try {
      const params = new URLSearchParams();
      Object.entries(body).forEach(([key, value]) => params.append(key, value))
      params.append('apikey', Koombiyo._apiKey);

      const api_response = await axios.post(
        `${Koombiyo._apiHost}/${endpoint}`,
        params
      );

      const data = await api_response.data;
      if (Koombiyo._debug) console.log('Koobiyo Response:', data);
      return data;
    } catch (err) {
      throw err;
    }
  };

  static AddNewOrder = async (newOrderRequest: KoobiyoNewOrderRequest): Promise<KoobiyoRespose> => {
    try {
      const res = await Koombiyo._koobiyoAPIFn('Addorders/users', newOrderRequest);
      return res;
    } catch (err) {
      throw err;
    }
  }

  static AddPickupRequest = async (pickUpReq: KoobiyoPikcUpRequest): Promise<KoobiyoRespose> => {
    try {
      const res = await Koombiyo._koobiyoAPIFn('Pickups/users', pickUpReq);
      return res;
    } catch (err) {
      throw err;
    }
  }

  static GetTrackOrderById = async (waybillid: string): Promise<OrderTracking> => {
    try {
      const res: OrderTrackingResponse = await Koombiyo._koobiyoAPIFn('Allorders/users', {
        waybillid: waybillid,
        offset: 0,
        limit: 1
      });
      return <OrderTracking>(res?.cust_orders?.[0] || {});
    } catch (err) {
      throw err;
    }
  }

  static GetAllOrdersTracking = async (page = 1, pageSize = 10): Promise<OrderTrackingResponse> => {
    try {
      const res = await Koombiyo._koobiyoAPIFn('Allorders/users', {
        offset: (page - 1) * pageSize,
        limit: pageSize
      });
      return res;
    } catch (err) {
      throw err;
    }
  }

  static GetOrderHistory = async (waybillid: string): Promise<OrderHistoryResponse> => {
    try {
      const res = await Koombiyo._koobiyoAPIFn('Orderhistory/users', {
        waybillid: waybillid
      });
      return res;
    } catch (err) {
      throw err;
    }
  }

  static ReturnReceive = async (waybillid: string): Promise<KoobiyoRespose> => {
    try {
      const res = await Koombiyo._koobiyoAPIFn('Returnreceive/users', {
        orderWaybillid: waybillid
      });
      return res;
    } catch (err) {
      throw err;
    }
  }

  static GetAllReturnNotes = async (): Promise<ReturnNotesResponse> => {
    try {
      const res = await Koombiyo._koobiyoAPIFn('Returnnotes/users');
      return res;
    } catch (err) {
      throw err;
    }
  }

  static GetReturnItems = async (noteId: string): Promise<ReturnItemsResponse> => {
    try {
      const res = await Koombiyo._koobiyoAPIFn('Returnitems/users', {
        noteId: noteId
      });
      return res;
    } catch (err) {
      throw err;
    }
  }
}

export default Koombiyo;