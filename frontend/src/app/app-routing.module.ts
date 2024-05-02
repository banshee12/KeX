import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {KexProfileComponent} from "./modules/profile/components/kex-profile/kex-profile.component";
import {KexHomeComponent} from "./modules/home/components/kex-home/kex-home.component";
import {KexAuthGuard} from "./kex-auth-guard.guard";
import {KexSearchComponent} from "./modules/search/components/kex-search/kex-search.component";

const routes: Routes = [
  {path: 'profile', component: KexProfileComponent, canActivate: [KexAuthGuard]},
  {path: 'search', component: KexSearchComponent, canActivate: [KexAuthGuard]},
  {path: 'home', component: KexHomeComponent, canActivate: [KexAuthGuard]},
  {path: '**', component: KexHomeComponent, canActivate: [KexAuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
