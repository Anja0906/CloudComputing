import { Component } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {User, UserCredentials} from "../model";
import {ActivatedRoute, Router} from "@angular/router";
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

  constructor(private cognitoService:CognitoService,private router:Router,private storageService:StorageService,private route: ActivatedRoute) {
    this.registrationForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      surname: new FormControl('', [Validators.required]),
      dateOfBirth: new FormControl('', [Validators.required]),
      phone_number: new FormControl('', [Validators.required, Validators.pattern(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)]),
      email_of_inviter: new FormControl('', [Validators.email])
    });
  }

  ngOnInit() {
    this.route.queryParams
      .subscribe((params) => {
        this.registrationForm.patchValue({email_of_inviter: params?.['inviter'] ?? ''});
      }
    );
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
