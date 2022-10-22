export class EmailOptions {
    constructor(
      public host?: string,
      public port?: number,
      public username?: string,
      public password?: string,
      public from?: string,
      public to?: string,
      public subject?: string,
      public text?: string,
      public html?: string,
      public attachments?: Object[]
    ) {}
}