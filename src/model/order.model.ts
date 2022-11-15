import { Client } from "./client.model";
import { Company } from "./company.model";
import { PaymentMethods } from "./payment.method.model";
import { Sku } from "./sku.model";


export class OrderItem {
    constructor(
      public id?: number,
      public quantity?: number,
      public order?: Orders,
      public sku?: Sku,
      public company?: Company,
      public created_at?: Date,
      public updated_at?: Date,
    ) {}
}

export class Orders {
    constructor(
      public id?: number,
      public total?: number,
      public status?: string,
      public delivery_status?: string,
      public payment?: PaymentMethods,
      public client?: Client,
      public items?: OrderItem[],
      public company?: Company,
      public created_at?: Date,
      public updated_at?: Date,
    ) {}
}

