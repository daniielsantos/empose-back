import { Store } from "./store.model";

export class Uploads {
    constructor(
      public id?: number,
      public name?: string,
      public path?: string,
      public store?: Store,
      public created_at?: Date,
      public updated_at?: Date,
    ) {}
}