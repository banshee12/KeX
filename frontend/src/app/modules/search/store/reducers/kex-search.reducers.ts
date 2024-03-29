import {KexLoadState} from "../../../../core/models/kex-core.models";
import {Action, createReducer, on} from "@ngrx/store";
import * as KexSearchActions from '../actions/kex-search.actions';
import {KexSearchState} from "../kex-search.state";
import {unwrapConstructorDependencies} from "@angular/compiler-cli/src/ngtsc/annotations/common";

const initialState : KexSearchState = {
  searchResults : {
    data : undefined,
    loadState : KexLoadState.NONE
  },
  userProfile : {
    data : undefined,
    loadState : KexLoadState.NONE
  },
}

const _kexSearchReducer = createReducer(
  initialState,

  //search user
  on(
    KexSearchActions.SearchUserActions.do,
    (state, action) => ({
      ...state,
      searchResults: {
        ...state,
        loadState : KexLoadState.LOADING,
        data : undefined
      }
    })
  ),

  on(
    KexSearchActions.SearchUserActions.success,
    (state, action) => ({
      ...state,
      searchResults: {
        ...state,
        loadState : KexLoadState.SUCCESS,
        data : action
      }
    })
  ),

  on(
    KexSearchActions.SearchUserActions.fail,
    (state, action) => ({
      ...state,
      searchResults: {
        ...state,
        loadState : KexLoadState.FAILURE,
        data : undefined
      }
    })
  ),

  // get user profile
  on(
    KexSearchActions.GetUserProfileActions.do,
    (state, action) => ({
      ...state,
      userProfile: {
        ...state,
        loadState : KexLoadState.LOADING,
        data : undefined
      }
    })
  ),

  on(
    KexSearchActions.GetUserProfileActions.success,
    (state, action) => ({
      ...state,
      userProfile: {
        ...state,
        loadState : KexLoadState.SUCCESS,
        data : action
      }
    })
  ),

  on(
    KexSearchActions.GetUserProfileActions.fail,
    (state, action) => ({
      ...state,
      userProfile: {
        ...state,
        loadState : KexLoadState.FAILURE,
        data : undefined
      }
    })
  ),


);

export function kexSearchReducer(state: KexSearchState, action: Action) {
  return _kexSearchReducer(state, action);
}

export const KEX_SEARCH_STORE_FEATURE_KEY = 'kex-search-store';




