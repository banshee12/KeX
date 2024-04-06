import {KexProfileState} from "../kex-profile.state";
import {KexLoadState} from "../../../../core/models/kex-core.models";
import {Action, createReducer, on} from "@ngrx/store";
import * as KexProfileActions from '../actions/kex-profile.actions';

const initialState : KexProfileState = {
  skills : [],
  skillsLoadState : KexLoadState.NONE,
  experiences : [],
  experienceLoadState : KexLoadState.NONE,
  experiencesLoadState : KexLoadState.NONE,
  editExperienceLoadState : KexLoadState.NONE,
  deleteExperienceLoadState : KexLoadState.NONE,
  addExperienceLoadState : KexLoadState.NONE,
  contactData : undefined,
  contactDataLoadState : KexLoadState.NONE,
  deleteSkillLoadState : KexLoadState.NONE,
  editSkillLoadState : KexLoadState.NONE,
  addSkillLoadState : KexLoadState.NONE,
  updateVisibilitySkillLoadState : KexLoadState.NONE
}

const _kexProfileReducer = createReducer(
  initialState,

  //get skills
  on(
    KexProfileActions.GetSkillsActions.do,
    (state, action) => ({
      ...state,
      skills : [],
      skillsLoadState: KexLoadState.LOADING,
    })
  ),
  on(
    KexProfileActions.GetSkillsActions.success,
    (state, action) => ({
      ...state,
      skills : action.skills,
      skillsLoadState: KexLoadState.SUCCESS
    })
  ),
  on(
    KexProfileActions.GetSkillsActions.fail,
    (state, action) => ({
      ...state,
      skills : [],
      skillsLoadState: KexLoadState.FAILURE
    })
  ),

  // delete skills
  on(
    KexProfileActions.DeleteSkillActions.do,
    (state, action) => ({
      ...state,
      deleteSkillLoadState: KexLoadState.LOADING,
    })
  ),
  on(
    KexProfileActions.DeleteSkillActions.success,
    (state, action) => ({
      ...state,
      deleteSkillLoadState: KexLoadState.SUCCESS
    })
  ),
  on(
    KexProfileActions.DeleteSkillActions.fail,
    (state, action) => ({
      ...state,
      deleteSkillLoadState: KexLoadState.FAILURE
    })
  ),
  on(
    KexProfileActions.DeleteSkillActions.reset,
    (state, action) => ({
      ...state,
      deleteSkillLoadState: KexLoadState.NONE
    })
  ),


  // edit skills
  on(
    KexProfileActions.EditSkillActions.do,
    (state, action) => ({
      ...state,
      editSkillLoadState: KexLoadState.LOADING,
    })
  ),
  on(
    KexProfileActions.EditSkillActions.success,
    (state, action) => ({
      ...state,
      editSkillLoadState: KexLoadState.SUCCESS
    })
  ),
  on(
    KexProfileActions.EditSkillActions.fail,
    (state, action) => ({
      ...state,
      editSkillLoadState: KexLoadState.FAILURE
    })
  ),
  on(
    KexProfileActions.EditSkillActions.reset,
    (state, action) => ({
      ...state,
      editSkillLoadState: KexLoadState.NONE
    })
  ),

  // update visibility skills
  on(
    KexProfileActions.UpdateVisibilitySkillActions.do,
    (state, action) => ({
      ...state,
      updateVisibilitySkillLoadState: KexLoadState.LOADING,
    })
  ),
  on(
    KexProfileActions.UpdateVisibilitySkillActions.success,
    (state, action) => ({
      ...state,
      updateVisibilitySkillLoadState: KexLoadState.SUCCESS
    })
  ),
  on(
    KexProfileActions.UpdateVisibilitySkillActions.fail,
    (state, action) => ({
      ...state,
      updateVisibilitySkillLoadState: KexLoadState.FAILURE
    })
  ),
  on(
    KexProfileActions.UpdateVisibilitySkillActions.reset,
    (state, action) => ({
      ...state,
      updateVisibilitySkillLoadState: KexLoadState.NONE
    })
  ),

  // add skills
  on(
    KexProfileActions.AddSkillActions.do,
    (state, action) => ({
      ...state,
      addSkillLoadState: KexLoadState.LOADING,
    })
  ),
  on(
    KexProfileActions.AddSkillActions.success,
    (state, action) => ({
      ...state,
      addSkillLoadState: KexLoadState.SUCCESS
    })
  ),
  on(
    KexProfileActions.AddSkillActions.fail,
    (state, action) => ({
      ...state,
      addSkillLoadState: KexLoadState.FAILURE
    })
  ),
  on(
    KexProfileActions.AddSkillActions.reset,
    (state, action) => ({
      ...state,
      addSkillLoadState: KexLoadState.NONE
    })
  ),
  // get experiences
  on(
      KexProfileActions.GetExperiencesActions.do,
      (state, action) => ({
        ...state,
        experiences : [],
        experiencesLoadState: KexLoadState.LOADING
      })
    ),
    on(
      KexProfileActions.GetExperiencesActions.success,
      (state, action) => ({
        ...state,
        experiences : action.experiences,
        experiencesLoadState: KexLoadState.SUCCESS
      })
    ),
    on(
      KexProfileActions.GetExperiencesActions.fail,
      (state, action) => ({
        ...state,
        experiences : [],
        experiencesLoadState: KexLoadState.FAILURE
      })
    )


);

export function kexProfileReducer(state: KexProfileState, action: Action) {
  return _kexProfileReducer(state, action);
}

export const KEX_PROFILE_STORE_FEATURE_KEY = 'kex-profile-store';




