import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {Store} from "@ngrx/store";
import {KexProfileState} from "../store/kex-profile.state";
import {KexUserSkill} from "../models/kex-profile.model";
import {Experience} from "../models/kex-profile.model";
import {KexProfileSelector} from "../store/selectors/kex-profile.selectors";
import {KexLoadState, KexSortData} from "../../../core/models/kex-core.models";
import {
  AddSkillActions,
  DeleteSkillActions,
  EditSkillActions,
  GetSkillsActions,
  GetExperiencesActions,
  EditExperienceActions,
  DeleteExperienceActions,
  AddExperienceActions,
  UpdateVisibilitySkillActions,
  UpdateVisibilityExperienceActions, deleteProfile
} from "../store/actions/kex-profile.actions";

@Injectable({
  providedIn: 'root'
})
export class KexProfileService {

  constructor(private store: Store<KexProfileState>) {
  }

  get $skills(): Observable<KexUserSkill[]> {
    return this.store.select(KexProfileSelector.getSkills)
  }

  get $experiences(): Observable<Experience[]> {
    return this.store.select(KexProfileSelector.getExperiences)
  }

  get $experiencesLoadState(): Observable<KexLoadState> {
    return this.store.select(KexProfileSelector.getExperiencesLoadState)
  }

  get $editExperienceLoadState(): Observable<KexLoadState> {
    return this.store.select(KexProfileSelector.editExperienceLoadState)
  }

  get $deleteExperienceLoadState(): Observable<KexLoadState> {
    return this.store.select(KexProfileSelector.deleteExperienceLoadState)
  }

  get $addExperienceLoadState(): Observable<KexLoadState> {
    return this.store.select(KexProfileSelector.addExperienceLoadState);
  }


  get $skillsLoadState(): Observable<KexLoadState> {
    return this.store.select(KexProfileSelector.getSkillsLoadState)
  }

  get $editSkillLoadState(): Observable<KexLoadState> {
    return this.store.select(KexProfileSelector.editSkillLoadState);
  }

  get $deleteSkillLoadState(): Observable<KexLoadState> {
    return this.store.select(KexProfileSelector.deleteSkillLoadState);
  }

  get $addSkillLoadState(): Observable<KexLoadState> {
    return this.store.select(KexProfileSelector.addSkillLoadState);
  }

  get $updateVisibilitySkillLoadState(): Observable<KexLoadState> {
    return this.store.select(KexProfileSelector.getUpdateVisibilitySkillLoadState);
  }

  get $updateVisibilityExperienceLoadState(): Observable<KexLoadState> {
    return this.store.select(KexProfileSelector.getUpdateVisibilityExperienceLoadState);
  }

  get $deleteProfileLoadState(): Observable<KexLoadState> {
    return this.store.select(KexProfileSelector.deleteProfileLoadState);
  }

  loadSkills(sortData?: KexSortData) {
    if (!sortData) {
      sortData = {sortBy: 'skill.title', asc: true};
    }
    this.store.dispatch(GetSkillsActions.do(sortData));
  }

  saveSkill(skill: KexUserSkill) {
    this.store.dispatch(EditSkillActions.do(skill));
  }

  updateVisibilitySkill(skill: KexUserSkill) {
    this.store.dispatch(UpdateVisibilitySkillActions.do(skill));
  }

  deleteSkill(skill: KexUserSkill) {
    this.store.dispatch(DeleteSkillActions.do(skill));
  }

  addSkill(skill: KexUserSkill) {
    this.store.dispatch(AddSkillActions.do(skill));
  }


  loadExperiences(sortData?: KexSortData) {
    if (!sortData) {
      sortData = {sortBy: 'title', asc: true};
    }
    this.store.dispatch(GetExperiencesActions.do(sortData));
  }

  saveExperience(experience: Experience) {
    this.store.dispatch(EditExperienceActions.do(experience));
  }

  deleteExperience(experience: Experience) {
    this.store.dispatch(DeleteExperienceActions.do(experience));
  }

  addExperience(experience: Experience) {
    this.store.dispatch(AddExperienceActions.do(experience));
  }

  updateVisibilityExperience(experience: Experience) {
    this.store.dispatch(UpdateVisibilityExperienceActions.do(experience));
  }

  deleteProfile() {
    this.store.dispatch(deleteProfile.do());
  }

  resetDeleteProfile() {
    this.store.dispatch(deleteProfile.reset());
  }
}
