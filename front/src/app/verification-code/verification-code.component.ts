import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {CognitoService} from "../services/cognito.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {StorageService} from "../services/storage.service";

@Component({
  selector: 'app-verification-code',
  templateUrl: './verification-code.component.html',
  styleUrls: ['./verification-code.component.css']
})
export class VerificationCodeComponent {
  verificationForm: FormGroup;



  constructor( private router: Router, private cognitoService: CognitoService, private storageService:StorageService ) {
    this.verificationForm = new FormGroup({
      code: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(15)])
    });
  }


  onSubmit() {
    let activationCode = this.verificationForm.value.code;
    let user = this.storageService.getUser();

    this.cognitoService.activate(activationCode, user['username'])
      .then(() =>{
        this.router.navigate(['login']);
      }).catch((error) =>{
      alert(error.message);
    });
  }
}
