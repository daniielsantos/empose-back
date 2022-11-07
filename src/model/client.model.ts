import { Address } from "./address.model";
import { Company } from "./company.model";

export class Client {
    constructor(
      public id?: number,
      public name?: string,
      public email?: string,
      public cpf?: string,
      public phone_number?: string,
      public company?: Company,
      public address?: Address[],
      public created_at?: Date,
      public updated_at?: Date,
    ) {}
}