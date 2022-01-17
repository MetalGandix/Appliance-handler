import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AppComponent} from "./app.component";
import {HomeComponent} from "./home/home.component";
import {AppliancesListComponent} from "./appliances/appliances-list/appliances-list.component";
import {ApplianceDetailComponent} from "./appliances/appliance-detail/appliance-detail.component";
import {AuthGuard} from "./_guards/auth.guard";

const routes: Routes = [
  { path: '', component: AppliancesListComponent , canActivate: [AuthGuard] },
  { path: 'appliance/:haId', component: ApplianceDetailComponent , canActivate: [AuthGuard] }
  // { path: 'welcome', loadChildren: () => import('./pages/welcome/welcome.module').then(m => m.WelcomeModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
