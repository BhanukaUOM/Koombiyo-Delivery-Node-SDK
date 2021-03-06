[![NPM version](https://img.shields.io/npm/v/koombiyo-sdk.svg)](https://www.npmjs.com/package/koombiyo-sdk)
[![Build Status](https://app.travis-ci.com/BhanukaUOM/Koombiyo-Delivery-Node-SDK.svg?token=NH86SUy1dkpsjcZCuvyg&branch=main)](https://app.travis-ci.com/BhanukaUOM/Koombiyo-Delivery-Node-SDK)
[![Downloads](https://img.shields.io/npm/dm/koombiyo-sdk.svg)](https://npmcharts.com/compare/koombiyo-sdk?minimal=true)
![NPM](https://img.shields.io/npm/l/koombiyo-sdk)

# Koombiyo-Delivery-Node-SDK

Koombiyo Delivery API Client for NodeJS written in TypeScript

[![Koombiyo Delivery Logo](https://koombiyodelivery.lk/assets/img/logo.png)](https://koombiyodelivery.lk)

[https://koombiyodelivery.lk](https://koombiyodelivery.lk)

<hr/>

## Install

```
$ npm install --save koombiyo-sdk
```

## Usage

### Initialization

```
import { Koombiyo } from 'koombiyo-sdk';

Koombiyo.init(KOOMBIYO_API_KEY);
```
### Add New Order

```
import { Koombiyo, Types } from 'koombiyo-sdk';

Koombiyo.AddNewOrder({
  orderWaybillid: 123,
  orderNo: 123,
  receiverName: 'Kamal Perera',
  receiverStreet: '123, Kohuwala, Nugegoda',
  receiverDistrict: Types.KoombiyoDeliveryDistrictList.COLOMBO,
  receiverCity: Types.KoombiyoDeliveryCityList.KOHUWALA,
  receiverPhone: "0777123456",
  description: "1 x USB Drive",
  spclNote: '-',
  getCod: 1000
})
  .then(res => console.log('res', res))
  .catch(err => console.error('err', err));
```

### Add PickUp Request

```
import { Koombiyo, Types } from 'koombiyo-sdk';

Koombiyo.AddPickupRequest({
  vehicleType: Types.KoombiyoVehicleType.BIKE,
  pickup_remark: '-',
  pickup_address: '123, Kohuwala, Nugegoda',
  phone: '0777123456',
  qty: 1,
  latitude: 6.872916,
  longitude: 79.888634
})
  .then(res => console.log('res', res))
  .catch(err => console.error('err', err));
```


### Generate Order Tracking URL

```
import { Koombiyo } from 'koombiyo-sdk';

const trackingURL = Koombiyo.GenerateTrackingURL(KOOMBIYO_WAYBILLID, DELIVERY_RECEIVER_PHONE_NO);
console.log('Tracking URL', trackingURL);
```

### Track Order

```
import { Koombiyo } from 'koombiyo-sdk';

Koombiyo.GetTrackOrderById(KOOMBIYO_WAYBILLID)
  .then(res => console.log('res', res))
  .catch(err => console.error('err', err));
```

### Track All Order

```
import { Koombiyo } from 'koombiyo-sdk';

Koombiyo.GetAllOrdersTracking(PAGE, ITEMS_PER_PAGE)
  .then(res => console.log('res', res))
  .catch(err => console.error('err', err));
```

### Get Order Tracking History

```
import { Koombiyo } from 'koombiyo-sdk';

Koombiyo.GetOrderHistory(KOOMBIYO_WAYBILLID)
  .then(res => console.log('res', res))
  .catch(err => console.error('err', err));
```
## Release Notes
> #### v1.2.0
> 
> -  Added Koombiyo City List Support
>
> #### v1.1.0
> 
> -  Added Support for Order Tracking URL Generation
>
> #### v1.0.0
> 
> -  Initial Release
>


## License

Licensed under The MIT License (MIT)
