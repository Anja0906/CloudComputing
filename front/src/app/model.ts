import {FormControl, Validators} from "@angular/forms";

export class UserCredentials{
  username : string | undefined;
  password : string | undefined;
}

export class User {
  name: string | undefined;
  surname: string | undefined;
  dateOfBirth: string | undefined;
  username: string | undefined;
  email: string | undefined;
  password: string | undefined;
}
