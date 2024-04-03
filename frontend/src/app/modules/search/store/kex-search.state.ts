import {KexLoadState, User} from "../../../core/models/kex-core.models";
import {KexSearchResult} from "../models/kex-search.model";

export interface KexSearchState {
  userProfile : KexUserProfileState,
  searchResults : KexSearchResultState
}

interface KexUserProfileState {
  data : User | undefined,
  loadState : KexLoadState
}

interface KexSearchResultState {
  data : KexSearchResult | undefined,
  loadState : KexLoadState
}
