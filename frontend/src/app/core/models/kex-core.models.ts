import {ContactTime, Experience, Skill} from "../../modules/profile/models/kex-profile.model";

export enum KexLoadState {
  NONE = 'NONE',
  LOADING= 'LOADING',
  SUCCESS = 'SUCCESS',
  FAILURE = 'FAILURE'
}

export enum KexNotificationType {
  INFO = 'INFO',
  WARNING = 'WARNING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR'
}

export interface KexNotificationData {
  message : string,
  type : KexNotificationType
}

export type User = {
  userId : number,
  userSub? : string,
  username : string,
  email : string,
  firstname? : string,
  lastname? : string,
  contactOptionPhone : boolean,
  contactOptionMail : boolean,
  contactOptionAppointment : boolean,
  userSkills : Skill[],
  userExperience : Experience[],
  userContactTimes : ContactTime[]
}
