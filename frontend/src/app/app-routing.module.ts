import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {KexProfileComponent} from "./modules/profile/components/kex-profile/kex-profile.component";
import {KexHomeComponent} from "./modules/home/components/kex-home/kex-home.component";

const routes: Routes = [
  {path: 'profile', component: KexProfileComponent},
  {path: 'home', component: KexHomeComponent},
  {path: '**', component: KexHomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
