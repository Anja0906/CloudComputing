import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import {MatIconModule} from "@angular/material/icon";
import {MatMenuModule} from "@angular/material/menu";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatButtonModule} from "@angular/material/button";
import { LoginComponent } from './login/login.component';
import {RouterModule, RouterOutlet, Routes} from "@angular/router";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AppRoutingModule} from "../infrastructure/app-routing.module";
import { RegistrationComponent } from './registration/registration.component';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatInputModule} from "@angular/material/input";
import {MatNativeDateModule} from "@angular/material/core";
import { FileUploadComponent } from './file-upload/file-upload.component';
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {FileUploadService} from "./file-upload/file-upload-service/file-upload.service";
import {HttpClientModule} from "@angular/common/http";
import {MatDividerModule} from "@angular/material/divider";
import {MatCardModule} from "@angular/material/card";
import {MatListModule} from "@angular/material/list";
import { DragDropDirective } from './directives/drag-drop.directive';
import {CdkVirtualScrollViewport} from "@angular/cdk/scrolling";
import {NgRoundPipeModule} from "angular-pipes";

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    LoginComponent,
    RegistrationComponent,
    FileUploadComponent,
    DragDropDirective
  ],
    imports: [
        BrowserModule,
        NoopAnimationsModule,
        MatIconModule,
        MatMenuModule,
        MatToolbarModule,
        MatButtonModule,
        RouterOutlet,
        FormsModule,
        AppRoutingModule,
        MatFormFieldModule,
        MatDatepickerModule,
        MatNativeDateModule,
        ReactiveFormsModule,
        MatInputModule,
        MatProgressBarModule,
        HttpClientModule,
        MatDividerModule,
        MatCardModule,
        MatListModule,
        CdkVirtualScrollViewport,
        NgRoundPipeModule
    ],
  providers: [],
  bootstrap: [AppComponent],

})
export class AppModule { }
