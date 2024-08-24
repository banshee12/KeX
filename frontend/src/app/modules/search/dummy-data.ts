import {User} from "../../core/models/kex-core.models";
import {KexSearchResult} from "./models/kex-search.model";
import {ContactTime, Experience, KexUserSkill} from "../profile/models/kex-profile.model";
import {kexUserSkill1, kexUserSkill2} from "../profile/dummy-data";

export const user1 : User = {
  userId : 123,
  userSub : '123',
  username : 'username',
  email : 'test@test.com',
  firstname : 'Max',
  lastname : 'Muster',
  contactOptionPhone : true,
  contactOptionMail : true,
  contactOptionAppointment : false,
  userSkills : [kexUserSkill1, kexUserSkill2],
  userExperience : [],
  userContactTimes : []
}
export const searchResult : KexSearchResult = {
  userList : [user1, user1, user1, user1, user1],
  count : 5
}

