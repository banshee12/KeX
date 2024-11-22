import {createFeatureSelector, createSelector, Selector} from "@ngrx/store";
import {KEX_CORE_STORE_FEATURE_KEY} from "../reducers/kex-core.reducers";
import {KexCoreState} from "../kex-core.state";


const getKexCoreState: Selector<object, KexCoreState> = createFeatureSelector(KEX_CORE_STORE_FEATURE_KEY);

const getCurrentUserLoadState = createSelector(getKexCoreState, (state: KexCoreState) => state.currentUserLoadState);
const getCurrentUser = createSelector(getKexCoreState, (state: KexCoreState) => state.currentUser);
const getContactTime = createSelector(getKexCoreState, (state: KexCoreState) => state.currentUser?.userContactTimes);
const getFavoriteUserList = createSelector(getKexCoreState, (state: KexCoreState) => state.favoriteUserList);
const getFavoriteUserListLoadState = createSelector(getKexCoreState, (state: KexCoreState) => state.favoriteUserListLoadState);
const getAddFavoriteLoadState = createSelector(getKexCoreState, (state: KexCoreState) => state.addFavoriteLoadState);
const getRemoveFavoriteLoadState = createSelector(getKexCoreState, (state: KexCoreState) => state.removeFavoriteLoadState);
const getWidgetSettingsLoadState = createSelector(getKexCoreState, (state: KexCoreState) => state.loadWidgetSettingsLoadState);
const getWidgetSettings = createSelector(getKexCoreState, (state: KexCoreState) => state.savedWidgetSettings);
const getSaveWidgetSettingsLoadState = createSelector(getKexCoreState, (state: KexCoreState) => state.saveWidgetSettingsLoadState);
export const KexCoreSelector = {
  getCurrentUserLoadState : getCurrentUserLoadState,
  getCurrentUser : getCurrentUser,
  getContactTime : getContactTime,
  getFavoriteUserList : getFavoriteUserList,
  getFavoriteUserListLoadState : getFavoriteUserListLoadState,
  getAddFavoriteLoadState : getAddFavoriteLoadState,
  getRemoveFavoriteLoadState : getRemoveFavoriteLoadState,
  getWidgetSettingsLoadState : getWidgetSettingsLoadState,
  getWidgetSettings : getWidgetSettings,
  getSaveWidgetSettingsLoadState : getSaveWidgetSettingsLoadState
};

