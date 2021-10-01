export class UserModel {

  public firstName: string;
  public lastName: string;

  public municipality: string;

  public email: string;
  public password: string;

  constructor() {
    this.firstName = '';
    this.lastName = '';
    this.municipality = '';
    this.email = '';
    this.password = '';
  }
}

