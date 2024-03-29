import {ContactTime, Experience, Skill} from "../../profile/models/kex-profile.model";
import {User} from "../../../core/models/kex-core.models";

export type KexSearchResult = {
  userList : User[],
  count : number
}
