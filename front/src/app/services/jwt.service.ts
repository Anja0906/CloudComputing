import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, from, switchMap } from "rxjs";
import { Auth } from 'aws-amplify';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor() { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return from(Auth.currentSession())
      .pipe(
        switchMap((data) => {
          if (data?.getIdToken()?.getJwtToken()) {
            const clonedRequest = request.clone({
              setHeaders: {
                Authorization: `Bearer ${data.getIdToken().getJwtToken()}`
              }
            });
            return next.handle(clonedRequest);
          } else {
            return next.handle(request);
          }
        })
      );
  }
}