import {ContactData, Experience, Skill} from "../models/kex-profile.model";
import {KexLoadState} from "../../../core/models/kex-core.models";

export interface KexProfileState {
  skills : Skill[],
  skillsLoadState : KexLoadState,
  experience : Experience[],
  experienceLoadState : KexLoadState,
  contactData : ContactData | undefined,
  contactDataLoadState : KexLoadState,
  deleteSkillLoadState : KexLoadState,
  editSkillLoadState : KexLoadState,
  addSkillLoadState : KexLoadState,
}
