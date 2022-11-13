import { Company } from "./company.model";

export class Uploads {
    constructor(
      public id?: number,
      public name?: string,
      public path?: string,
      public company?: Company,
      public created_at?: Date,
      public updated_at?: Date,
    ) {}
}