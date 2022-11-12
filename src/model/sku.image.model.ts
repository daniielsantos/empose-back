import { Company } from "./company.model";

export class SkuImage {
    constructor(
      public id?: number,
      public url?: string,
      public name?: string,
      // public company?: Company,
      public created_at?: Date,
      public updated_at?: Date
    ) {}
}