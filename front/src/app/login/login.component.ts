import { Component } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {UserCredentials} from "../model";
import {CognitoService} from "../services/cognito.service";
import {Router} from "@angular/router";
import {StorageService} from "../services/storage.service";
import {enviroment} from "../../enviroments/enviroment";
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  user?: UserCredentials;

  constructor(private cognitoService:CognitoService, private router:Router, private storageService:StorageService, private http: HttpClient) {
    this.loginForm = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)])
    });
  }


  onSubmit() {
    let email = this.loginForm.value.username;
    let password = this.loginForm.value.password;

    if(email === null || password === null || email === undefined || password == undefined)
      return;

    this.cognitoService.signIn(email,password)
      .then((data)=>{
        // DEBUG
        this.http.post('https://749995w0n8.execute-api.eu-central-1.amazonaws.com/dev/todos', {}).subscribe(console.log);
        return data;
      })
      .then((data) =>{
        this.storageService.saveUser(data['attributes']);

        this.router.navigate(['']);        
      })
      .catch((error) => {
        console.error(error)
        alert("Wrong credentials");
      });
  }
}
function fromCognitoIdentityPool(arg0: { clientConfig: { region: string; }; identityPoolId: any; logins: { 'cognito-idp.us-west-2.amazonaws.com/<user_pool_id>': any; }; }): import("aws-sdk").Credentials | import("aws-sdk/lib/credentials").CredentialsOptions {
  throw new Error('Function not implemented.');
}

