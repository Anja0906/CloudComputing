import { Component } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {UserCredentials} from "../model";
import {CognitoService} from "../services/cognito.service";
import {Router} from "@angular/router";
import {StorageService} from "../services/storage.service";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  user?: UserCredentials;

  constructor(private cognitoService:CognitoService, private router:Router, private storageService:StorageService) {
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
      .then((data) =>{
        this.storageService.saveUser(data['attributes']);
        this.router.navigate(['']);
      })
      .catch((error) => {
        alert("Wrong credentials");
      });
  }
}
