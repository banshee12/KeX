import {createActionGroup, emptyProps, props} from "@ngrx/store";
import {User} from "../../models/kex-core.models";
import {KexWidgetSetting} from "../../../modules/settings/models/kex-settings.model";

export const GetCurrentUser = createActionGroup({
  source : '[PROFILE] get current user',
  events : {
    do : emptyProps(),
    success : props<{user : User}>(),
    fail : emptyProps,
    reset : emptyProps,
  }
});

export const GetFavoriteUserList = createActionGroup({
  source : '[CORE] get favorite user list',
  events : {
    do : emptyProps(),
    success : props<{users : User[]}>(),
    fail : emptyProps,
    reset : emptyProps,
  }
});

export const AddFavoriteUser = createActionGroup({
  source : '[CORE] add favorite user',
  events : {
    do : props<{userSub: string}>(),
    success : emptyProps,
    fail : emptyProps,
    reset : emptyProps,
  }
});

export const RemoveFavoriteUser = createActionGroup({
  source : '[CORE] remove favorite user',
  events : {
    do : props<{userSub: string}>(),
    success : emptyProps,
    fail : emptyProps,
    reset : emptyProps,
  }
});

export const loadWidgetSettings = createActionGroup({
  source : '[CORE] load widget settings',
  events : {
    do : emptyProps,
    success : props<{widgetSettings : string[]}>(),
    fail : emptyProps,
    reset : emptyProps,
  }
});

export const saveWidgetSettings = createActionGroup({
  source : '[CORE] set widget settings',
  events : {
    do : props<{widgetSettings : string[]}>(),
    success : emptyProps,
    fail : emptyProps,
    reset : emptyProps,
  }
});
