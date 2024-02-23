import {createActionGroup, emptyProps, props} from "@ngrx/store";
import {Skill} from "../../models/kex-profile.model";

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
