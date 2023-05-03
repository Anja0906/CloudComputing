import { Component } from '@angular/core';
import {StorageService} from "../services/storage.service";
import {Router} from "@angular/router";
import {CognitoService} from "../services/cognito.service";

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent {
  isLoggedIn$ = this.storageService.loggedIn;

  constructor(private storageService: StorageService, private router: Router, private cognitoService:CognitoService) {}

  ngOnInit() {
    this.storageService.loggedIn.subscribe(isLoggedIn => {
      this.isLoggedIn$.next(isLoggedIn);
    });
  }

  login() {
    this.router.navigate(["login"])
  }

  logout() {
    this.storageService.clean();
    this.cognitoService.signOut();
    this.router.navigate(["login"])
  }

  signup() {
    this.router.navigate(["registration"])
  }
}
