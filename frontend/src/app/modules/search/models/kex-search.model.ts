import {KexSortData, User} from "../../../core/models/kex-core.models";

export type KexSearchResult = {
  userList : User[],
  count : number
}

export type KexSearchRequest = {
  searchSkill : string,
  minLevel? : number,
  sortData : KexSortData
}
