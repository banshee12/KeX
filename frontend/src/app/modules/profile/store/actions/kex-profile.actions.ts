import {createActionGroup, emptyProps, props} from "@ngrx/store";
import {ContactTime, ContactTimeSlot, KexUserSkill} from "../../models/kex-profile.model";
import {Experience} from "../../models/kex-profile.model";
import {KexSortData, User} from "../../../../core/models/kex-core.models";

export const GetSkillsActions = createActionGroup({
  source : '[PROFILE] get skills',
  events : {
    do : props<KexSortData>(),
    success : props<{skills : KexUserSkill[]}>(),
    fail : emptyProps,
    reset : emptyProps,
  }
});

export const DeleteSkillActions = createActionGroup({
  source : '[PROFILE] delete skill',
  events : {
    do : props<KexUserSkill>(),
    success : emptyProps,
    fail : emptyProps,
    reset : emptyProps,
  }
});

export const EditSkillActions = createActionGroup({
  source : '[PROFILE] edit skill',
  events : {
    do : props<KexUserSkill>(),
    success : emptyProps,
    fail : emptyProps,
    reset : emptyProps,
  }
});

export const UpdateVisibilitySkillActions = createActionGroup({
  source : '[PROFILE] update visibility skill',
  events : {
    do : props<KexUserSkill>(),
    success : emptyProps,
    fail : emptyProps,
    reset : emptyProps
  }
});

export const AddSkillActions = createActionGroup({
  source : '[PROFILE] add skill',
  events : {
    do : props<KexUserSkill>(),
    success : emptyProps,
    fail : emptyProps,
    reset : emptyProps
  }
});

export const GetExperiencesActions= createActionGroup({
  source : '[PROFILE] get experiences',
  events : {
    do : emptyProps(),
    success : props<{experiences : Experience[]}>(),
    fail : emptyProps,
    reset : emptyProps,
  }
});

export const EditExperienceActions= createActionGroup({
  source : '[PROFILE] edit experience',
  events : {
    do : props<Experience>(),
    success : emptyProps,
    fail : emptyProps,
    reset : emptyProps,
  }
});

export const DeleteExperienceActions= createActionGroup({
  source : '[PROFILE] delete experience',
  events : {
    do : props<Experience>(),
    success : emptyProps,
    fail : emptyProps,
    reset : emptyProps,
  }
});

export const AddExperienceActions = createActionGroup({
  source : '[PROFILE] add experience',
  events : {
    do : props<Experience>(),
    success : emptyProps,
    fail : emptyProps,
    reset : emptyProps,
  }
});

export const UpdateVisibilityExperienceActions = createActionGroup({
  source : '[PROFILE] update visibility experience',
  events : {
    do : props<Experience>(),
    success : emptyProps,
    fail : emptyProps,
    reset : emptyProps
  }
});

export const GetCurrentUser = createActionGroup({
  source : '[PROFILE] get current user',
  events : {
    do : emptyProps(),
    success : props<{user : User}>(),
    fail : emptyProps,
    reset : emptyProps,
  }
});

export const SetContactOptions = createActionGroup({
  source : '[PROFILE] set contact options',
  events : {
    do : props<{user : User}>(),
    success : emptyProps,
    fail : emptyProps,
    reset : emptyProps,
  }
});

export const SetContactTimes = createActionGroup({
  source : '[PROFILE] set contact times',
  events : {
    do : props<{contactTimeSlots : ContactTimeSlot[]}>(),
    success : emptyProps,
    fail : emptyProps,
    reset : emptyProps,
  }
});
