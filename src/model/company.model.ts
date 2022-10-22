
export class Company {
    constructor(
      public id?: number,
      public name?: string,
      public email?: string,
      public cnpj?: string,
      public address?: string,
      public createdAt?: Date,
      public updatedAt?: Date,
    ) {}
}