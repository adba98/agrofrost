export class UserRegisterModel {
  public firstName: string;
  public lastName: string;

  public municipality: string;

  public email: string;
  public password: string;

  constructor() {
    this.firstName = '';
    this.lastName = '';
    this.municipality = 'Venecia';
    this.email = '';
    this.password = '';
  }
}
