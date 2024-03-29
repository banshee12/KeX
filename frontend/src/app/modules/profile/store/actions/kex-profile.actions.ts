import {createActionGroup, emptyProps, props} from "@ngrx/store";
import {Skill} from "../../models/kex-profile.model";
import {Experience} from "../../models/kex-profile.model";

export const GetSkillsActions = createActionGroup({
  source : '[PROFILE] get skills',
  events : {
    do : emptyProps(),
    success : props<{skills : Skill[]}>(),
    fail : emptyProps,
  }
});

export const DeleteSkillActions = createActionGroup({
  source : '[PROFILE] delete skill',
  events : {
    do : props<Skill>(),
    success : emptyProps,
    fail : emptyProps,
  }
});

export const EditSkillActions = createActionGroup({
  source : '[PROFILE] edit skill',
  events : {
    do : props<Skill>(),
    success : emptyProps,
    fail : emptyProps,
  }
});

export const AddSkillActions = createActionGroup({
  source : '[PROFILE] add skill',
  events : {
    do : props<Skill>(),
    success : emptyProps,
    fail : emptyProps,
  }
});

export const GetExperiencesActions= createActionGroup({
  source : '[PROFILE] get experiences',
  events : {
    do : emptyProps(),
    success : props<{experiences : Experience[]}>(),
    fail : emptyProps,
  }
});

export const EditExperienceActions= createActionGroup({
  source : '',
  events : {
    do : props<Experience>(),
    success : emptyProps,
    fail : emptyProps,
  }
});

export const DeleteExperienceActions= createActionGroup({
  source : '',
  events : {
    do : props<Experience>(),
    success : emptyProps,
    fail : emptyProps,
  }
});

export const AddExperienceActions = createActionGroup({
  source : '',
  events : {
    do : props<Experience>(),
    success : emptyProps,
    fail : emptyProps,
  }
});
