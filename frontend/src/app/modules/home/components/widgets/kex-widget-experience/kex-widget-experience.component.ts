import { Component } from '@angular/core';
import {Store} from "@ngrx/store";
import {Observable, Subscription} from "rxjs";
import {KexProfileState} from "../../../../profile/store/kex-profile.state";
import {KexProfileSelector} from "../../../../profile/store/selectors/kex-profile.selectors";
import {GetExperiencesActions} from "../../../../profile/store/actions/kex-profile.actions";
import {Router} from "@angular/router";
import {Experience} from "../../../../profile/models/kex-profile.model";
import {KexLoadState} from "../../../../../core/models/kex-core.models";

@Component({
  selector: 'kex-widget-experience',
  templateUrl: './kex-widget-experience.component.html',
  styleUrl: './kex-widget-experience.component.scss'
})
export class KexWidgetExperienceComponent {

         private limitOfExperiences = 3;
         public userExperiences : Experience[] = [];
         public subs : Subscription[] = [];
         KexLoadState = KexLoadState;
  constructor(private store : Store<KexProfileState>, private router : Router){

  }

  get hasExperiences() {
      return this.userExperiences.length > 0;
    }
  get $experiences() : Observable<Experience[]>
    {
      return this.store.select(KexProfileSelector.getExperiences);
    }

     get $experiencesLoadState() : Observable<KexLoadState>
      {
        return this.store.select(KexProfileSelector.getExperiencesLoadState);
      }
  goToProfile() {
    this.router.navigate(['profile'], {queryParams : {tab : '1'}}).then();
  }

    ngOnInit(): void {
      this.store.dispatch(GetExperiencesActions.do());
      this.subs.push(this.$experiences.subscribe(experiences => {
        if(experiences.length > this.limitOfExperiences){
          this.userExperiences = experiences.slice(-this.limitOfExperiences).reverse();
        }else{
          this.userExperiences = experiences;
        }
      }))
    }

    ngOnDestroy(): void {
      this.subs.forEach(sub => sub.unsubscribe());
    }
}
