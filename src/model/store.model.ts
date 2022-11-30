
export class Store {
    constructor(
      public id?: number,
      public name?: string,
      public email?: string,
      public cnpj?: string,
      public address?: string,
      public created_at?: Date,
      public updated_at?: Date,
    ) {}
}