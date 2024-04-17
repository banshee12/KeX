import {createActionGroup, emptyProps, props} from "@ngrx/store";
import {KexUserSkill} from "../../models/kex-profile.model";
import {Experience} from "../../models/kex-profile.model";

export const GetSkillsActions = createActionGroup({
  source : '[PROFILE] get skills',
  events : {
    do : emptyProps(),
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
  source : '',
  events : {
    do : props<Experience>(),
    success : emptyProps,
    fail : emptyProps,
    reset : emptyProps,
  }
});

export const DeleteExperienceActions= createActionGroup({
  source : '',
  events : {
    do : props<Experience>(),
    success : emptyProps,
    fail : emptyProps,
    reset : emptyProps,
  }
});

export const AddExperienceActions = createActionGroup({
  source : '',
  events : {
    do : props<Experience>(),
    success : emptyProps,
    fail : emptyProps,
    reset : emptyProps,
  }
});

export const UpdateVisibilityExperienceActions = createActionGroup({
  source : '[PROFILE] update visibility skill',
  events : {
    do : props<Experience>(),
    success : emptyProps,
    fail : emptyProps,
    reset : emptyProps
  }
});
