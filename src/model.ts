export enum KoobiyoStatusType {
  "SUCCESS" = "success",
  "ERROR" = "error"
}

export enum KoobiyoVehicleType {
  "BIKE" = "Bike",
  "3WHEEL" = "Three wheel",
  "LORRY" = "Lorry"
}

export enum KoobiyoOrderStatusType {
  "PROCESSING" = "Processing",
  "COLLECTED" = "Collected by Koombiyo",
  "RECEIVED_AT_WAREHOUSE" = "Received at Warehouse",
  "DISPATCHED_TO_DESTINATION" = "Dispatch to Destination",
  "RECEIVED_AT_DESTINATION" = "Received at Destination ",
  "DISPATCHED" = "Out for Delivery",
  "DELIVERED" = "Delivered",
  "CLIENT_RECEIVED" = "Client Received"
}

export enum KoobiyoDeliveryStatusType {
  "PROCESSING" = "1",
  "COLLECTED" = "2",
  "RECEIVED_AT_WAREHOUSE" = "14",
  "DISPATCHED_TO_DESTINATION" = "3",
  "RECEIVED_AT_DESTINATION" = "4",
  "DISPATCHED" = "5",
  "DELIVERED" = "6",
  "CLIENT_RECEIVED" = "15"
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
  status_id: KoobiyoDeliveryStatusType;
  comments: string;
  date: string;
  status: KoobiyoOrderStatusType;
  remark?: string;
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
  orderstatus: KoobiyoOrderStatusType,
  deliverystatus: KoobiyoDeliveryStatusType
}
export interface OrderTrackingResponse {
  cust_orders: OrderTracking[];
  rowcount: number;
}