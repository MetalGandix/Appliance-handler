import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {AuthenticationService} from "./_services/authentication.service";
import {ApplianceService} from "./_services/appliance.service";
import {Appliance} from "./_models/appliance";
import { OAuth2Client } from '@byteowls/capacitor-oauth2';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  isCollapsed = false;
  // @ts-ignore
  appliances: Appliance[];
  refreshToken: string = '';
  oauth2Options: any = {
    "appId": "941A49AE931239EDE8CD001478BB522185D36CB84FBEE900FF6DFF68096156F5",
    "appName": "Vismap",
    "webDir": "dist/appliance-handler",
    "bundledWebRuntime": false,
    "responseType": "code",
    "redirectUrl": "vismap://oauth",
    "authorizationBaseUrl": "https://api.home-connect.com/security/oauth/authorize",
    "scope": "IdentifyAppliance Oven",
    "logsEnabled": true
  };
  code: any = "";
  isAuth: boolean = false;

  constructor(private route: ActivatedRoute, public authService: AuthenticationService, public applianceService: ApplianceService) { }

  ngOnInit() {
    this.authService.isAuthenticated().then(res => {
      this.isAuth = res;
    }).catch(error => {
      this.isAuth = false;
    })
  //   this.route.queryParams.subscribe(params => {
  //     if (params.code != null && this.authService.currentToken$ != null && localStorage.getItem('access_token') == null) {
  //       this.authService.setCode(params.code);
  //       this.authService.getCode();
  //       this.authService.getToken(params.code);
  //       this.authService.currentToken$.subscribe(res => {
  //         console.log(res);
  //       })
  //     }
  //   })

  //   this.applianceService.applianceList().subscribe(appliances => {
  //     this.appliances = JSON.parse(JSON.stringify(appliances)).data.homeappliances;
  //   })
  //   this.authService.isAuthenticated();
  }

  onOAuthBtnClick() {
      OAuth2Client.authenticate(
          this.oauth2Options
      ).then(result => {
        console.log("risultato");
        console.log("result:", JSON.stringify(result));
        console.log(result.authorization_response.code);
          this.code = result.authorization_response.code;
          this.authService.getToken(this.code);
          /*let accessToken = response["access_token"];
          this.refreshToken = response["refresh_token"];*/

          // go to backend
      }).catch(reason => {
          console.error("OAuth rejected", reason);
      });
  }

}
