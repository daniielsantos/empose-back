import { Category } from "./category.model";
import { Store } from "./store.model";
import { Sku } from "./sku.model";

export class Product {
    constructor(
      public id?: number,
      public name?: string,
      public description?: string,
      public active?: boolean,
      public discount?: number,
      public category?: Category,
      public skus?: Sku[],
      public store?: Store,
      public created_at?: Date,
      public updated_at?: Date,
    ) {}
}