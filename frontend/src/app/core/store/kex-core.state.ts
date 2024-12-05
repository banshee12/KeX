import {KexLoadState, User} from "../models/kex-core.models";
import {KexWidgetSetting} from "../../modules/settings/models/kex-settings.model";


export interface KexCoreState {
  currentUser : User | undefined,
  currentUserLoadState : KexLoadState,
  favoriteUserList : User[],
  favoriteUserListLoadState : KexLoadState,
  addFavoriteLoadState : KexLoadState,
  removeFavoriteLoadState : KexLoadState,
  saveWidgetSettingsLoadState : KexLoadState,
  loadWidgetSettingsLoadState : KexLoadState,
  savedWidgetSettings : string[]
}
