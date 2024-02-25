import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {Store} from "@ngrx/store";
import {KexProfileState} from "../store/kex-profile.state";
import {Skill} from "../models/kex-profile.model";
import {KexProfileSelector} from "../store/selectors/kex-profile.selectors";
import {KexLoadState} from "../../../core/models/kex-core.models";
import {GetSkillsActions} from "../store/actions/kex-profile.actions";

@Injectable({
  providedIn: 'root'
})
export class KexProfileService {

  constructor(private store : Store<KexProfileState>) { }

  get $skills() : Observable<Skill[]>
  {
    return this.store.select(KexProfileSelector.getSkills)
  }

  get $skillsLoadState() : Observable<KexLoadState>
  {
    return this.store.select(KexProfileSelector.getSkillsLoadState)
  }

  loadSkills() {
    this.store.dispatch(GetSkillsActions.do());
  }
}
