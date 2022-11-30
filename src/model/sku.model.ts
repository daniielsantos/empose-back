import { Store } from "./store.model";
import { Product } from "./product.model";
import { SkuImage } from "./sku.image.model";
import { SkuInventory } from "./sku.inventory.model";

export class Sku {
    constructor(
      public id?: number | string,
      public name?: string,
      public description?: string,
      public active?: boolean,
      public price?: number,
      public product?: Product,
      public images?: SkuImage[],
      public inventory?: SkuInventory,
      public store?: Store,
      public created_at?: Date,
      public updated_at?: Date,
    ) {}
}