import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject} from "rxjs";


const USER_KEY = 'auth-user';
@Injectable({
  providedIn: 'root'
})

export class StorageService {
  loggedIn = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) {}


  clean(): void {
    window.sessionStorage.clear();
    this.loggedIn.next(false);
  }

  public saveUser(user: any): void {
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
    this.loggedIn.next(true);
  }

  public getUser(): any {
    const user = window.sessionStorage.getItem(USER_KEY);
    if (user) {
      return JSON.parse(user);
    }

    return {};
  }


  public isLoggedIn(): boolean {
    const user = window.sessionStorage.getItem(USER_KEY);
    if (user) {
      return true;
    }

    return false;
  }
}
