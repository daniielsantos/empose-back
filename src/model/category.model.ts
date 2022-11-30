import { Store } from "./store.model";

export class Category {
    constructor(
      public id?: number,
      public name?: string,
      public description?: string,
      public store?: Store,
      public created_at?: Date,
      public updated_at?: Date,
    ) {}
}