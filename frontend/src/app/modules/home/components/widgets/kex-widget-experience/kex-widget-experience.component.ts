import { Component } from '@angular/core';
import {Store} from "@ngrx/store";
import {KexProfileState} from "../../../../profile/store/kex-profile.state";
import {Router} from "@angular/router";

@Component({
  selector: 'kex-widget-experience',
  templateUrl: './kex-widget-experience.component.html',
  styleUrl: './kex-widget-experience.component.scss'
})
export class KexWidgetExperienceComponent {

  constructor(private store : Store<KexProfileState>, private router : Router){

  }
  goToProfile() {
    this.router.navigate(['profile'], {queryParams : {tab : '1'}}).then();
  }
}
