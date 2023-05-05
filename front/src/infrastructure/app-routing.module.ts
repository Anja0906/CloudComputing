import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from 'src/app/login/login.component';
import {RegistrationComponent} from "../app/registration/registration.component";
import {FileUploadComponent} from "../app/file-upload/file-upload.component";
import {VerificationCodeComponent} from "../app/verification-code/verification-code.component";
import { MemeComponent } from 'src/app/meme/meme.component';

const routes: Routes = [
  { path: '', component: MemeComponent},
  { path: 'login', component: LoginComponent},
  { path: 'registration', component: RegistrationComponent},
  { path: 'file-upload', component: FileUploadComponent},
  { path: 'verification', component: VerificationCodeComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
