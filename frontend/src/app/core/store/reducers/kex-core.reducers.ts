import {Action, createReducer, on} from "@ngrx/store";
import * as KexCoreActions from '../actions/kex-core.actions';
import {KexCoreState} from "../kex-core.state";
import {KexLoadState} from "../../models/kex-core.models";

const initialState: KexCoreState = {
  currentUser: undefined,
  currentUserLoadState: KexLoadState.NONE,
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
);

export function kexCoreReducer(state: KexCoreState, action: Action) {
  return _kexCoreReducer(state, action);
}

export const KEX_CORE_STORE_FEATURE_KEY = 'kex-core-store';




