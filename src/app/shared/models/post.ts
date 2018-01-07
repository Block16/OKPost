export class Post {

  constructor(identity: string, message: string) {
    this.identity = identity;
    this.message = message;
  }

  identity: string;
  message: string;
}
