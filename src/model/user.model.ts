import { Company } from "./company.model";

export class Users {
    constructor(
      public id?: number,
      public name?: string,
      public email?: string,
      public password?: string,
      public role?: string,
      public company?: Company,
      public createdAt?: Date,
      public updatedAt?: Date,
    ) {}
}