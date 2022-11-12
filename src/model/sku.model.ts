import { Company } from "./company.model";
import { SkuImage } from "./sku.image.model";

export class Sku {
    constructor(
      public id?: number,
      public name?: string,
      public description?: string,
      public active?: boolean,
      public image?: SkuImage[],
      public company?: Company,
      public created_at?: Date,
      public updated_at?: Date,
    ) {}
}