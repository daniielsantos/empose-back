export class EmailParams {
  constructor(
    public name?: string,
    public password?: string,
  ) {}
}

export class EmailOptions {
    constructor(
      public host?: string,
      public port?: number,
      public username?: string,
      public password?: string,
      public from?: string,
      public to?: string,
      public template?: string,
      public params?: EmailParams,
      public subject?: string,
      public text?: string,
      public html?: string,
      public attachments?: Object[]
    ) {}
}

