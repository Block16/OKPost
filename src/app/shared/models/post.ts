export class Post {
  readonly identity: string;
  readonly message: string;

  constructor(identity: string, message: string) {
    this.identity = identity;
    this.message = message;
  }
}
