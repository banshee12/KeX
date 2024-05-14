import {ContactData, Experience, KexUserSkill} from "../models/kex-profile.model";
import {KexLoadState} from "../../../core/models/kex-core.models";

export interface KexProfileState {
  skills : KexUserSkill[],
  skillsLoadState : KexLoadState,
  experiences : Experience[],
  experienceLoadState : KexLoadState,
  contactData : ContactData | undefined,
  contactDataLoadState : KexLoadState,
  deleteSkillLoadState : KexLoadState,
  editSkillLoadState : KexLoadState,
  updateVisibilitySkillLoadState: KexLoadState,
  addSkillLoadState : KexLoadState,
  experiencesLoadState: KexLoadState,
  editExperienceLoadState: KexLoadState,
  deleteExperienceLoadState : KexLoadState,
  addExperienceLoadState : KexLoadState,
  updateVisibilityExperienceLoadState : KexLoadState
  currentUser : User | undefined,
  currentUserLoadState : KexLoadState,
  setContactTimeLoadState: KexLoadState,
  setContactOptionLoadState: KexLoadState
}
