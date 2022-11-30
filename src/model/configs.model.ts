import { Store } from "./store.model";

export class Configs {
    constructor(
      public id?: number,
      public email_host?: string,
      public email_port?: number,
      public email_username?: string,
      public email_password?: string,
      public store?: Store,
    ) {}
}