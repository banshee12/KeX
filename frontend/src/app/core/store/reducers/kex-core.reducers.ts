import {Action, createReducer, on} from "@ngrx/store";
import * as KexCoreActions from '../actions/kex-core.actions';
import {KexCoreState} from "../kex-core.state";
import {KexLoadState} from "../../models/kex-core.models";

const initialState: KexCoreState = {
  currentUser: undefined,
  currentUserLoadState: KexLoadState.NONE,
  favoriteUserList : [],
  favoriteUserListLoadState : KexLoadState.NONE,
  addFavoriteLoadState : KexLoadState.NONE,
  removeFavoriteLoadState : KexLoadState.NONE,
  loadWidgetSettingsLoadState : KexLoadState.NONE,
  savedWidgetSettings : [],
  saveWidgetSettingsLoadState : KexLoadState.NONE
}

const _kexCoreReducer = createReducer(
  initialState,

  //get current user
  on(
    KexCoreActions.GetCurrentUser.do,
    (state, action) => ({
      ...state,
      currentUser: undefined,
      currentUserLoadState: KexLoadState.LOADING
    })
  ),
  on(
    KexCoreActions.GetCurrentUser.success,
    (state, action) => ({
      ...state,
      currentUser: action.user,
      currentUserLoadState: KexLoadState.SUCCESS
    })
  ),
  on(
    KexCoreActions.GetCurrentUser.fail,
    (state, action) => ({
      ...state,
      currentUser: undefined,
      currentUserLoadState: KexLoadState.FAILURE
    })
  ),

  //get favorite user list
  on(
    KexCoreActions.GetFavoriteUserList.do,
    (state, action) => ({
      ...state,
      favoriteUserList : [],
      favoriteUserListLoadState: KexLoadState.LOADING
    })
  ),
  on(
    KexCoreActions.GetFavoriteUserList.success,
    (state, action) => ({
      ...state,
      favoriteUserList : action.users,
      favoriteUserListLoadState: KexLoadState.SUCCESS
    })
  ),
  on(
    KexCoreActions.GetFavoriteUserList.fail,
    (state, action) => ({
      ...state,
      favoriteUserListLoadState: KexLoadState.FAILURE
    })
  ),

  //add favorite user
  on(
    KexCoreActions.AddFavoriteUser.do,
    (state, action) => ({
      ...state,
      addFavoriteLoadState : KexLoadState.LOADING,
    })
  ),
  on(
    KexCoreActions.AddFavoriteUser.success,
    (state, action) => ({
      ...state,
      addFavoriteLoadState : KexLoadState.SUCCESS,
    })
  ),
  on(
    KexCoreActions.AddFavoriteUser.fail,
    (state, action) => ({
      ...state,
      addFavoriteLoadState : KexLoadState.FAILURE
    })
  ),
  on(
    KexCoreActions.AddFavoriteUser.reset,
    (state, action) => ({
      ...state,
      addFavoriteLoadState : KexLoadState.NONE
    })
  ),

  //remove favorite user
  on(
    KexCoreActions.RemoveFavoriteUser.do,
    (state, action) => ({
      ...state,
      removeFavoriteLoadState : KexLoadState.LOADING,
    })
  ),
  on(
    KexCoreActions.RemoveFavoriteUser.success,
    (state, action) => ({
      ...state,
      removeFavoriteLoadState : KexLoadState.SUCCESS,
    })
  ),
  on(
    KexCoreActions.RemoveFavoriteUser.fail,
    (state, action) => ({
      ...state,
      removeFavoriteLoadState : KexLoadState.FAILURE
    })
  ),
  on(
    KexCoreActions.RemoveFavoriteUser.reset,
    (state, action) => ({
      ...state,
      removeFavoriteLoadState : KexLoadState.NONE
    })
  ),

  //load widget setting
  on(
    KexCoreActions.loadWidgetSettings.do,
    (state, action) => ({
      ...state,
      loadWidgetSettingsLoadState : KexLoadState.LOADING,
      savedWidgetSettings: []
    })
  ),
  on(
    KexCoreActions.loadWidgetSettings.success,
    (state, action) => ({
      ...state,
      loadWidgetSettingsLoadState : KexLoadState.SUCCESS,
      savedWidgetSettings: action.widgetSettings
    })
  ),
  on(
    KexCoreActions.loadWidgetSettings.fail,
    (state, action) => ({
      ...state,
      loadWidgetSettingsLoadState : KexLoadState.FAILURE,
    })
  ),
  on(
    KexCoreActions.loadWidgetSettings.reset,
    (state, action) => ({
      ...state,
      loadWidgetSettingsLoadState : KexLoadState.NONE,
      savedWidgetSettings: []
    })
  ),

  //save widget settings
  on(
    KexCoreActions.saveWidgetSettings.do,
    (state, action) => ({
      ...state,
      saveWidgetSettingsLoadState : KexLoadState.LOADING,
      loadWidgetSettingsLoadState : KexLoadState.LOADING,
    })
  ),
  on(
    KexCoreActions.saveWidgetSettings.success,
    (state, action) => ({
      ...state,
      saveWidgetSettingsLoadState : KexLoadState.SUCCESS,
      loadWidgetSettingsLoadState : KexLoadState.NONE
    })
  ),
  on(
    KexCoreActions.saveWidgetSettings.fail,
    (state, action) => ({
      ...state,
      saveWidgetSettingsLoadState : KexLoadState.FAILURE,
      loadWidgetSettingsLoadState : KexLoadState.NONE
    })
  ),
  on(
    KexCoreActions.saveWidgetSettings.reset,
    (state, action) => ({
      ...state,
      saveWidgetSettingsLoadState : KexLoadState.NONE
    })
  ),


);



export function kexCoreReducer(state: KexCoreState, action: Action) {
  return _kexCoreReducer(state, action);
}

export const KEX_CORE_STORE_FEATURE_KEY = 'kex-core-store';




