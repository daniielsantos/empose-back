import { Category } from "./category.model";
import { Company } from "./company.model";
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
      public company?: Company,
      public created_at?: Date,
      public updated_at?: Date,
    ) {}
}