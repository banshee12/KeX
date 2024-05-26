import {Component, OnDestroy, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import {KexProfileState} from "../../../../profile/store/kex-profile.state";
import {GetSkillsActions} from "../../../../profile/store/actions/kex-profile.actions";
import {Observable, Subscription} from "rxjs";
import {KexUserSkill} from "../../../../profile/models/kex-profile.model";
import {KexProfileSelector} from "../../../../profile/store/selectors/kex-profile.selectors";
import {KexLoadState} from "../../../../../core/models/kex-core.models";
import {Router} from "@angular/router";

@Component({
  selector: 'kex-widget-skills',
  templateUrl: './kex-widget-skills.component.html',
  styleUrl: './kex-widget-skills.component.scss'
})
export class KexWidgetSkillsComponent implements OnInit, OnDestroy{
   private limitOfSkills = 3;
   public userSkills : KexUserSkill[] = [];
   public subs : Subscription[] = [];
   KexLoadState = KexLoadState;


  constructor(private store : Store<KexProfileState>, private router : Router){

  }

  goToProfile() {
    this.router.navigate(['profile'], {queryParams : {tab : '0'}}).then();
  }

  get hasSkills() {
    return this.userSkills.length > 0;
  }

  get $skills() : Observable<KexUserSkill[]>
  {
    return this.store.select(KexProfileSelector.getSkills);
  }

  get $skillsLoadState() : Observable<KexLoadState>
  {
    return this.store.select(KexProfileSelector.getSkillsLoadState);
  }

  ngOnInit(): void {
    this.store.dispatch(GetSkillsActions.do());
    this.subs.push(this.$skills.subscribe(skills => {
      if(skills.length > this.limitOfSkills){
        this.userSkills = skills.slice(0, this.limitOfSkills - 1);
      }else{
        this.userSkills = skills;
      }
    }))
  }

  ngOnDestroy(): void {
    this.subs.forEach(sub => sub.unsubscribe());
  }



}
