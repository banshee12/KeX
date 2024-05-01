import {createActionGroup, emptyProps, props} from "@ngrx/store";
import {KexUserSkill} from "../../../profile/models/kex-profile.model";
import {KexSearchRequest, KexSearchResult} from "../../models/kex-search.model";
import {User} from "../../../../core/models/kex-core.models";

export const SearchUserActions = createActionGroup({
  source : '[SEARCH] search user',
  events : {
    do : props<KexSearchRequest>(),
    success : props<KexSearchResult>(),
    fail : emptyProps,
  }
});

export const GetUserProfileActions = createActionGroup({
  source : '[SEARCH] get user profile',
  events : {
    do : props<{userId : string}>(),
    success : props<User>(),
    fail : emptyProps,
  }
});
