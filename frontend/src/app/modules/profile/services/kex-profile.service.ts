import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {Store} from "@ngrx/store";
import {KexProfileState} from "../store/kex-profile.state";
import {Skill} from "../models/kex-profile.model";
import {KexProfileSelector} from "../store/selectors/kex-profile.selectors";
import {KexLoadState} from "../../../core/models/kex-core.models";
import {
  AddSkillActions,
  DeleteSkillActions,
  EditSkillActions,
  GetSkillsActions
} from "../store/actions/kex-profile.actions";

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

  get $editSkillLoadState() : Observable<KexLoadState>
  {
    return this.store.select(KexProfileSelector.editSkillLoadState);
  }

  get $deleteSkillLoadState() : Observable<KexLoadState>
  {
    return this.store.select(KexProfileSelector.deleteSkillLoadState);
  }

  get $addSkillLoadState() : Observable<KexLoadState>
  {
    return this.store.select(KexProfileSelector.addSkillLoadState);
  }

  loadSkills() {
    this.store.dispatch(GetSkillsActions.do());
  }

  saveSkill(skill : Skill) {
    this.store.dispatch(EditSkillActions.do(skill));
  }

  deleteSkill(skill : Skill) {
    this.store.dispatch(DeleteSkillActions.do(skill));
  }

  addSkill(skill : Skill) {
    this.store.dispatch(AddSkillActions.do(skill));
  }
}
