import { Component } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {User, UserCredentials} from "../model";
import {Router} from "@angular/router";
import {CognitoService} from "../services/cognito.service";
import {StorageService} from "../services/storage.service";


@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {
  registrationForm: FormGroup;
  errorMessage: string = '';

  constructor(private cognitoService:CognitoService,private router:Router,private storageService:StorageService) {
    this.registrationForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      surname: new FormControl('', [Validators.required]),
      dateOfBirth: new FormControl('', [Validators.required]),
      username: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)])
    });
  }
  register(user:User):void{
    this.cognitoService.register(user)
      .then(() =>{
        this.storageService.saveUser(user);
        this.router.navigate(['/verification'])
      }).catch((error) =>{
      alert(error.message);
    })

  }

  onSubmit() {
    let user : User = this.registrationForm.value;
    this.register(user);
  }
}
