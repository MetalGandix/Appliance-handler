import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {ReplaySubject} from "rxjs";
import {OauthToken} from "../_models/oauth-token";
import {SecureStoragePlugin} from "capacitor-secure-storage-plugin";
import {updateSuperClassAbstractMembersContext} from "@angular/core/schematics/migrations/static-queries/strategies/usage_strategy/super_class_context";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private code = new ReplaySubject<any>(1);
  currentCode$ = this.code.asObservable();
  private token = new ReplaySubject<OauthToken>(1);
  currentToken$ = this.token.asObservable();
  private oauth_url = 'https://api.home-connect.com/security/oauth/token';


  constructor(private http: HttpClient) {
  }

  setCode(code: any) {
    this.code.next(code);
  }

  getCode() {
    this.currentCode$.subscribe(value => {
      console.log(value);
      return value;
    })
  }

  getToken(authCode: any) {
    console.log("prima di prendere il token")
    const body = new HttpParams()
      .set('client_id', "941A49AE931239EDE8CD001478BB522185D36CB84FBEE900FF6DFF68096156F5")
      .set('client_secret', "A13091E8BD0DA49447C23F4D6D2C3F7F7423AA91527C66769AC02C01E5ED9479")
      .set('redirect_uri', "vismap://oauth")
      .set('grant_type', "authorization_code")
      .set('code', authCode)
    console.log(body.toString())
    this.http.post<OauthToken>(this.oauth_url, body.toString(),
      {
        headers: new HttpHeaders()
          .set('Content-Type', 'application/x-www-form-urlencoded')
      }).subscribe(res => {
        // console.log("prendendo il token")
        this.token.next(res);
        this.saveToken(res.access_token);
        this.saveRefreshToken(res.refresh_token);
        console.log("risultato " + JSON.stringify(res))
        // console.log(res.access_token)
        // console.log(res.refresh_token)
    },
      error => { console.log("errore ")});
  }

  async isAuthenticated() : Promise<boolean> {
    console.log("prova isAuthenticated");
    const key = 'access_token';

    try {
      await SecureStoragePlugin.get({ key: "access_token" });
      return true;
    } catch (error) {
      return false;
    }
  }

  // used to call API endpoint to refresh the token
  refreshToken(token: string) {
    const body = new HttpParams()
      .set('grant_type', "authorization_code")
      .set('client_secret', "A13091E8BD0DA49447C23F4D6D2C3F7F7423AA91527C66769AC02C01E5ED9479")
      .set('refresh_token', token)
    return this.http.post(this.oauth_url, body.toString(),
      {
        headers: new HttpHeaders()
          .set('Content-Type', 'application/x-www-form-urlencoded')
      });
  }

  async saveToken(token: string) {
    try {
      await SecureStoragePlugin.set({key: "access_token", value: token})
      console.log("access token salvato")
    } catch (error) {
      console.log(error);
    }
  }

  async saveRefreshToken(refresh_token: string) {
    try {
      await SecureStoragePlugin.set({key: "refresh_token", value: refresh_token})
      console.log("refresh token salvato")
    } catch (error) {
      console.log(error);
    }
  }

  async getRefreshToken(): Promise<any> {
    let refresh_token: any;
    try {
      refresh_token = await SecureStoragePlugin.get({key: "refresh_token"});
      return refresh_token;
    } catch (error) {
      console.log('Errore prendendo il refresh token', error);
      return null;
    }
  }

}
