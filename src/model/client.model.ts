import { Address } from "./address.model";

export class Client {
    constructor(
      public id?: number,
      public name?: string,
      public email?: string,
      public cpf?: string,
      public phoneNumber?: string,
      public address?: Address[],
      public createdAt?: Date,
      public updatedAt?: Date,
    ) {}
}