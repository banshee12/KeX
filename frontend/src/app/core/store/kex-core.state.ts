import {KexLoadState, User} from "../models/kex-core.models";


export interface KexCoreState {
  currentUser : User | undefined,
  currentUserLoadState : KexLoadState
}
