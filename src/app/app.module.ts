import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatIconModule} from "@angular/material/icon";
import {MatListModule} from "@angular/material/list";
import {NZ_I18N} from 'ng-zorro-antd/i18n';
import {en_US} from 'ng-zorro-antd/i18n';
import {registerLocaleData} from '@angular/common';
import en from '@angular/common/locales/en';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {IconsProviderModule} from './icons-provider.module';
import {NzLayoutModule} from 'ng-zorro-antd/layout';
import {NzMenuModule} from 'ng-zorro-antd/menu';
import {HomeComponent} from "./home/home.component";
import {JwtInterceptor} from "./_interceptors/jwt.interceptor";
import {AppliancesListComponent} from "./appliances/appliances-list/appliances-list.component";
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {ApplianceDetailComponent} from "./appliances/appliance-detail/appliance-detail.component";
import {ToastrModule, ToastrService} from "ngx-toastr";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatOptionModule} from "@angular/material/core";
import {MatSelectModule} from "@angular/material/select";
import {ApplianceOptionComponent} from "./appliances/appliance-option/appliance-option.component";
import {MatSliderModule} from "@angular/material/slider";
import {NgxMatTimepickerModule} from "@angular-material-components/datetime-picker";
import {NgxMaterialTimepickerModule} from "ngx-material-timepicker";
import {MatSelectInfiniteScrollModule} from "ng-mat-select-infinite-scroll";
import {SecureStoragePlugin} from "capacitor-secure-storage-plugin";

registerLocaleData(en);

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AppliancesListComponent,
    ApplianceDetailComponent,
    ApplianceOptionComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    FontAwesomeModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    FormsModule,
    IconsProviderModule,
    NzLayoutModule,
    NzMenuModule,
    MatSlideToggleModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-right'
    }),
    MatFormFieldModule,
    MatOptionModule,
    MatSelectModule,
    MatSliderModule,
    NgxMatTimepickerModule,
    NgxMaterialTimepickerModule,
    MatSelectModule,
    MatSelectInfiniteScrollModule
  ],
  providers: [{provide: NZ_I18N, useValue: en_US}, /*{provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},*/
    ToastrService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
