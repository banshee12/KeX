import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {KexProfileComponent} from "./modules/profile/components/kex-profile/kex-profile.component";
import {KexHomeComponent} from "./modules/home/components/kex-home/kex-home.component";
import {KexPublicComponent} from "./kex-public/kex-public.component";
import {KexAuthGuard} from "./kex-auth-guard.guard";
import {KexSearchComponent} from "./modules/search/components/kex-search/kex-search.component";

const routes: Routes = [
  {path: 'profile', component: KexProfileComponent, canActivate: [KexAuthGuard]},
  {path: 'home', component: KexHomeComponent},
  {path : 'search', component: KexSearchComponent},
  {path: 'login', component: KexPublicComponent},
  {path: '**', component: KexPublicComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
