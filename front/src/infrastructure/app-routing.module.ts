import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from 'src/app/login/login.component';
import {RegistrationComponent} from "../app/registration/registration.component";
import {FileUploadComponent} from "../app/file-upload/file-upload.component";
import {VerificationCodeComponent} from "../app/verification-code/verification-code.component";
import { MemeComponent } from 'src/app/meme/meme.component';
import {ItemsOverviewComponent} from "../app/items-overview/items-overview.component";
import {ItemDetailsComponent} from "../app/item-details/item-details.component";
import {AllAlbumsComponent} from "../app/all-albums/all-albums.component";
import {AlbumComponent} from "../app/album/album.component";
import { FamilyComponent } from 'src/app/family/family.component';

const routes: Routes = [
  { path: '', component: MemeComponent},
  { path: 'login', component: LoginComponent},
  { path: 'registration', component: RegistrationComponent},
  { path: 'file-upload', component: FileUploadComponent},
  { path: 'overview', component: ItemsOverviewComponent},
  { path: 'item-details', component: ItemDetailsComponent},
  { path: 'my-albums', component: AllAlbumsComponent},
  { path: 'album', component: AlbumComponent},
  { path: 'verification', component: VerificationCodeComponent},
  { path: 'family', component: FamilyComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
