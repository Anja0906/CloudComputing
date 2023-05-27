import {EventEmitter, Injectable} from '@angular/core';
import {Amplify, Auth} from "aws-amplify";
import {enviroment} from "../../enviroments/enviroment";
import {User, UserCredentials} from "../model";

@Injectable({
  providedIn: 'root'
})
export class CognitoService {

  constructor() {
    Amplify.configure({
      Auth:enviroment.cognito,
      Storage: {AWSS3: enviroment.storage},
    })
  }
  register(user: User) : Promise<any> {
    return Auth.signUp({
      username:user.email,
      password:user.password,
      attributes:{
        given_name:user.name,
        family_name:user.surname,
        birthdate: user.birthDate,
        email:user.email,
        phone_number:user.phone_number,
        'custom:email_of_inviter': user.email_of_inviter
      }
    });
  }

  signIn(email:string, password:string): Promise<any> {
    return Auth.signIn(email, password);
  }

  activate(activateCode: string, userEmail: string): Promise<any>{
    return Auth.confirmSignUp(userEmail, activateCode);
  }

  getUser(): Promise<any> {
    return Auth.currentUserInfo();
  }

  signOut(): Promise<any> {
    return Auth.signOut();
  }

}
