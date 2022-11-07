export class Address {
    constructor(
      public id?: number,
      public address?: string,
      public city?: string,
      public state?: string,
      public zip_code?: string,
      public country?: string,
      public created_at?: Date,
      public updated_at?: Date,
    ) {}
}