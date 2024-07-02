import {createFeatureSelector, createSelector, Selector} from "@ngrx/store";
import {KEX_CORE_STORE_FEATURE_KEY} from "../reducers/kex-core.reducers";
import {KexCoreState} from "../kex-core.state";
import {KexProfileState} from "../../../modules/profile/store/kex-profile.state";

const getKexCoreState: Selector<object, KexCoreState> = createFeatureSelector(KEX_CORE_STORE_FEATURE_KEY);

const getCurrentUserLoadState = createSelector(getKexCoreState, (state: KexCoreState) => state.currentUserLoadState);
const getCurrentUser = createSelector(getKexCoreState, (state: KexCoreState) => state.currentUser);
const getContactTime = createSelector(getKexCoreState, (state: KexCoreState) => state.currentUser?.userContactTimes);
export const KexCoreSelector = {
  getCurrentUserLoadState : getCurrentUserLoadState,
  getCurrentUser : getCurrentUser,
  getContactTime : getContactTime
};
