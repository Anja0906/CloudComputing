import { Component } from '@angular/core';
import {StorageService} from "../services/storage.service";
import {Router} from "@angular/router";
import {CognitoService} from "../services/cognito.service";
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent {
  constructor(public storageService: StorageService, private router: Router, private cognitoService:CognitoService, public dataService : DataService) {}

  ngOnInit() {
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

  upload() {
    this.router.navigate(["file-upload"])
  }

  overview() {
    this.router.navigate(["overview"])
  }

  newAlbum() {
    this.dataService.createAlbum("New Album").subscribe({
      next: album => {
        this.dataService.selectedAlbum  = album;
        this.router.navigate(["album"])
      }
    })
  }

  myAlbums() {
    this.router.navigate(["my-albums"])
  }

  inviteFamily() {
    this.router.navigate(["family"])
  }
}
