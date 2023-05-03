import {FormControl, Validators} from "@angular/forms";

export class UserCredentials{
  username : string | undefined;
  password : string | undefined;
}

export interface User{
  name:string,
  surname:string,
  birthDate:string,
  username:string,
  email:string,
  password:string,
}
