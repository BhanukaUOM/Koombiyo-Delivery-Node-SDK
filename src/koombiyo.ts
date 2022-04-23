import axios from 'axios';
import { KoombiyoNewOrderRequest, KoombiyoPikcUpRequest, KoombiyoRespose, KoombiyoStatusType, OrderHistoryResponse, OrderTracking, OrderTrackingResponse, ReturnItemsResponse, ReturnNotesResponse } from './model';

class Koombiyo {
  private static _apiHost: string = "https://application.koombiyodelivery.lk/api";
  private static _trackingURL: string = "https://koombiyodelivery.lk/Track/track_id";
  private static _apiKey: string;
  private static _debug: boolean;

  static init(apiKey: string, debug = false) {
    this._apiKey = apiKey;
    this._debug = debug;
  }

  static _koombiyoAPIFn = async (endpoint: string, body: object = {}): Promise<any> => {
    if (Koombiyo._debug) console.log('Koombiyo Req:', endpoint, body);
    if (!Koombiyo._apiKey) throw Error('Please Initialize Koombiyo Client. Use "Koombiyo.init(KOOMBIYO_API_KEY)"')

    try {
      const params = new URLSearchParams();
      Object.entries(body).forEach(([key, value]) => params.append(key, value))
      params.append('apikey', Koombiyo._apiKey);

      const api_response = await axios.post(
        `${Koombiyo._apiHost}/${endpoint}`,
        params
      );

      const data = await api_response.data;
      if (Koombiyo._debug) console.log('Koombiyo Response:', data);
      return data;
    } catch (err) {
      throw err;
    }
  };

  static GenerateTrackingURL = (waybillid: number, receiverPhoneNo: string) => {
    return `${Koombiyo._trackingURL}?id=${encodeURIComponent(waybillid)}&phone=${encodeURIComponent(receiverPhoneNo)}`
  }

  static AddNewOrder = async (newOrderRequest: KoombiyoNewOrderRequest): Promise<KoombiyoRespose> => {
    try {
      const res = await Koombiyo._koombiyoAPIFn('Addorders/users', newOrderRequest);
      if (res.status !== KoombiyoStatusType.SUCCESS) throw Error(res.message || res);
      return res;
    } catch (err) {
      throw err;
    }
  }

  static AddPickupRequest = async (pickUpReq: KoombiyoPikcUpRequest): Promise<KoombiyoRespose> => {
    try {
      const res = await Koombiyo._koombiyoAPIFn('Pickups/users', pickUpReq);
      if (res.status !== KoombiyoStatusType.SUCCESS) throw Error(res.message || res);
      return res;
    } catch (err) {
      throw err;
    }
  }

  static GetTrackOrderById = async (waybillid: string): Promise<OrderTracking> => {
    try {
      const res: OrderTrackingResponse = await Koombiyo._koombiyoAPIFn('Allorders/users', {
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
      const res = await Koombiyo._koombiyoAPIFn('Allorders/users', {
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
      const res = await Koombiyo._koombiyoAPIFn('Orderhistory/users', {
        waybillid: waybillid
      });
      return res;
    } catch (err) {
      throw err;
    }
  }

  static ReturnReceive = async (waybillid: string): Promise<KoombiyoRespose> => {
    try {
      const res = await Koombiyo._koombiyoAPIFn('Returnreceive/users', {
        orderWaybillid: waybillid
      });
      return res;
    } catch (err) {
      throw err;
    }
  }

  static GetAllReturnNotes = async (): Promise<ReturnNotesResponse> => {
    try {
      const res = await Koombiyo._koombiyoAPIFn('Returnnotes/users');
      return res;
    } catch (err) {
      throw err;
    }
  }

  static GetReturnItems = async (noteId: string): Promise<ReturnItemsResponse> => {
    try {
      const res = await Koombiyo._koombiyoAPIFn('Returnitems/users', {
        noteId: noteId
      });
      return res;
    } catch (err) {
      throw err;
    }
  }
}

export default Koombiyo;