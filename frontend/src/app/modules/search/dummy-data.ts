import {User} from "../../core/models/kex-core.models";
import {KexSearchResult} from "./models/kex-search.model";
import {ContactTime, Experience, Skill} from "../profile/models/kex-profile.model";
import {skill1, skill2} from "../profile/dummy-data";

export const user1 : User = {
  userId : 123,
  username : 'username',
  email : 'test@test.com',
  firstname : 'Max',
  lastname : 'Muster',
  contactOptionPhone : true,
  contactOptionMail : true,
  contactOptionAppointment : false,
  userSkills : [skill1, skill2],
  userExperience : [],
  userContactTimes : []
}
export const searchResult : KexSearchResult = {
  userList : [user1, user1, user1, user1, user1],
  count : 5
}

