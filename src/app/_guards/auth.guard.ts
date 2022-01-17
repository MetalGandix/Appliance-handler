import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import {SecureStoragePlugin} from "capacitor-secure-storage-plugin";
import {AuthenticationService} from "../_services/authentication.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {


  constructor(private authService: AuthenticationService) { }

  isAuth: any;

  async canActivate(): Promise<boolean>{

    return await this.authService.isAuthenticated();

  }

}
