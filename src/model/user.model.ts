import { Store } from "./store.model";

export class Users {
    constructor(
      public id?: number,
      public name?: string,
      public email?: string,
      public password?: string,
      public role?: string,
      public store?: Store,
      public created_at?: Date,
      public updated_at?: Date,
    ) {}
}