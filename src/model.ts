export enum KoobiyoStatusType {
  "SUCCESS" = "success",
  "ERROR" = "error"
}

export enum KoobiyoVehicleType {
  "BIKE" = "Bike",
  "3WHEEL" = "Three wheel",
  "LORRY" = "Lorry"
}

export interface KoobiyoRespose {
  status: KoobiyoStatusType,
  message: string;
}

export interface KoobiyoNewOrderRequest {
  orderWaybillid: number;
  orderNo: number;
  receiverName: string;
  receiverStreet: string;
  receiverDistrict: number;
  receiverCity: number;
  receiverPhone: string;
  description: string;
  spclNote: string;
  getCod: number;
}

export interface KoobiyoPikcUpRequest {
  vehicleType: KoobiyoVehicleType;
  pickup_remark: string;
  pickup_address: string;
  latitude: number;
  longitude: number;
  phone: string;
  qty: number;
}


export interface OrderHistory {
  status_id:  string;
  comments:  string;
  date:  string;
  status:  string;
  remark?:  string;
}
export interface OrderHistoryResponse {
  order_history: OrderHistory[];
}

export interface ReturnNotesResponse {
  return_notes: any[];
}

export interface ReturnItemsResponse {
  return_items: any[];
}
export interface OrderTracking {
  waybill_id: string,
  weight: string,
  order_id: string,
  remarks: null,
  cust_remarks: string,
  deliverycharge: string,
  codamount: string,
  order_date: string,
  deliveryaddress: string,
  phoneno: string,
  recever: string,
  description: string,
  district: string,
  orderstatus: string,
  deliverystatus: string
}
export interface OrderTrackingResponse {
  cust_orders: OrderTracking[];
  rowcount: number;
}