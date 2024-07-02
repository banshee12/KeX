import {createActionGroup, emptyProps, props} from "@ngrx/store";
import {User} from "../../models/kex-core.models";

export const GetCurrentUser = createActionGroup({
  source : '[PROFILE] get current user',
  events : {
    do : emptyProps(),
    success : props<{user : User}>(),
    fail : emptyProps,
    reset : emptyProps,
  }
});
