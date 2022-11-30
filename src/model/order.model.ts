import { Client } from "./client.model";
import { Store } from "./store.model";
import { PaymentMethods } from "./payment.method.model";
import { Sku } from "./sku.model";


export class OrderItem {
    constructor(
      public id?: number,
      public quantity?: number,
      public order?: Orders,
      public sku?: Sku,
      public store?: Store,
      public created_at?: Date,
      public updated_at?: Date,
    ) {}
}

export class Orders {
    constructor(
      public id?: number,
      public total?: number,
      public status?: number,
      public delivery_status?: number,
      public payment?: PaymentMethods,
      public client?: Client,
      public items?: OrderItem[],
      public store?: Store,
      public canceled?: boolean,
      public created_at?: Date,
      public updated_at?: Date,
    ) {}
}

