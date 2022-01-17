import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpErrorResponse
} from '@angular/common/http';
import {BehaviorSubject, Observable, of, throwError} from 'rxjs';
import {ApplianceService} from "../_services/appliance.service";
import {AuthenticationService} from "../_services/authentication.service";
import {catchError, filter, map, switchMap, take} from "rxjs/operators";
import {OauthToken} from "../_models/oauth-token";
import {SecureStoragePlugin} from "capacitor-secure-storage-plugin";
import {fromPromise} from "rxjs/internal-compatibility";

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  private isRefreshing = false;
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor(private applianceService: ApplianceService, private authService: AuthenticationService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let authReq = request;
    let isAuth: boolean = false;
    var acc_tk_obs = fromPromise(SecureStoragePlugin.get({key: "access_token"}));

    return acc_tk_obs.pipe(
      switchMap(token => {
        console.log("Token ", token);
        authReq = authReq.clone({
          setHeaders: {
            Authorization: `Bearer ${token}`
          }
        });
        return next.handle(authReq)
      }),
      catchError(err => {
        if (err instanceof HttpErrorResponse && err.status === 401) {
          return this.handle401Error(authReq, next);
        }

        return throwError(err);
      })
    );
  }

  private handle401Error(request: HttpRequest<any>, next: HttpHandler) {

    if (!this.isRefreshing) {
      this.isRefreshing = true;

      var ref_tok_obs = fromPromise(this.authService.getRefreshToken());

      return ref_tok_obs.pipe(
        switchMap(refresh_token => {
          return this.authService.refreshToken(refresh_token).pipe(
            switchMap((token: any) => {
              this.authService.saveToken(token.accessToken);
              this.authService.saveRefreshToken(token.refreshToken);

              var authRequest: any = request.clone({
                setHeaders: {
                  Authorization: `Bearer ${token}`
                }
              });
              return next.handle(authRequest);
            })
          )
        })
      )

    }

    return of(SecureStoragePlugin.get({key: "access_token"})).pipe(
      switchMap(token => {
        next.handle(request.clone({
          setHeaders: {
            Authorization: `Bearer ${token}`
          }
        }));
        return next.handle(request);
      })
    )
  }
}
