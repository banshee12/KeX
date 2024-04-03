import {createFeatureSelector, createSelector, Selector} from "@ngrx/store";
import {KexSearchState} from "../kex-search.state";
import {KEX_SEARCH_STORE_FEATURE_KEY} from "../reducers/kex-search.reducers";

const getKexSearchState: Selector<object, KexSearchState> = createFeatureSelector(KEX_SEARCH_STORE_FEATURE_KEY);

const searchResultsData = createSelector(getKexSearchState, (state: KexSearchState) => state.searchResults.data);
const userProfileData = createSelector(getKexSearchState, (state: KexSearchState) => state.userProfile.data);
const searchResultsLoadState = createSelector(getKexSearchState, (state: KexSearchState) => state.searchResults.loadState);
const userProfileLoadState = createSelector(getKexSearchState, (state: KexSearchState) => state.userProfile.loadState);

export const KexSearchSelector = {
  getSearchResults : searchResultsData,
  getUserProfile : userProfileData,
  getSearchResultsLoadState : searchResultsLoadState,
  getUserProfileLoadState : userProfileLoadState
};
