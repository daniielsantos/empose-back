import { Sku } from "./sku.model";
import { Store } from "./store.model";

export class SkuInventory {
    constructor(
      public id?: number,
      public quantity?: number,
      public store?: Store,
      public sku?: Sku,
      public created_at?: Date,
      public updated_at?: Date
    ) {}
}