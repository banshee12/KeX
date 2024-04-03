import {createFeatureSelector, createSelector, Selector} from "@ngrx/store";
import {KexProfileState} from "../kex-profile.state";
import {KEX_PROFILE_STORE_FEATURE_KEY} from "../reducers/kex-profile.reducers";

const getKexProfileState: Selector<object, KexProfileState> = createFeatureSelector(KEX_PROFILE_STORE_FEATURE_KEY);

const skills = createSelector(getKexProfileState, (state: KexProfileState) => state.skills);
const skillsLoadState = createSelector(getKexProfileState, (state: KexProfileState) => state.skillsLoadState);
const deleteSkillLoadState = createSelector(getKexProfileState, (state: KexProfileState) => state.deleteSkillLoadState);
const editSkillLoadState = createSelector(getKexProfileState, (state: KexProfileState) => state.editSkillLoadState);
const addSkillLoadState = createSelector(getKexProfileState, (state: KexProfileState) => state.addSkillLoadState);
const experiencesLoadState  = createSelector(getKexProfileState,(state: KexProfileState)=>state.experiencesLoadState);
const experiences = createSelector(getKexProfileState, (state: KexProfileState) => state.experiences);
const deleteExperienceLoadState = createSelector(getKexProfileState, (state: KexProfileState) => state.deleteExperienceLoadState);
const editExperienceLoadState = createSelector(getKexProfileState, (state: KexProfileState) => state.editExperienceLoadState);
const addExperienceLoadState = createSelector(getKexProfileState, (state: KexProfileState) => state.addExperienceLoadState);
const updateVisibilitySkillLoadState = createSelector(getKexProfileState, (state: KexProfileState) => state.updateVisibilitySkillLoadState);

export const KexProfileSelector = {
  getSkills : skills,
  getSkillsLoadState : skillsLoadState,
  deleteSkillLoadState : deleteSkillLoadState,
  editSkillLoadState : editSkillLoadState,
  addSkillLoadState : addSkillLoadState,
  getExperiencesLoadState : experiencesLoadState,
  getExperiences : experiences,
  deleteExperienceLoadState :deleteExperienceLoadState,
  editExperienceLoadState : editExperienceLoadState,
  addExperienceLoadState : addExperienceLoadState,
  getUpdateVisibilitySkillLoadState : updateVisibilitySkillLoadState
};
