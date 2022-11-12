import { Company } from "./company.model";

export class Category {
    constructor(
      public id?: number,
      public name?: string,
      public description?: string,
      public company?: Company,
      public created_at?: Date,
      public updated_at?: Date,
    ) {}
}