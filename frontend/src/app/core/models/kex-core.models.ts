import {ContactTime, ContactTimeSlot, Experience, KexUserSkill} from "../../modules/profile/models/kex-profile.model";

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
  userId? : number,
  userSub? : string,
  username? : string,
  email? : string,
  firstname? : string,
  lastname? : string,
  contactOptionPhone? : boolean,
  contactOptionMail? : boolean,
  contactOptionAppointment? : boolean,
  userSkills? : KexUserSkill[],
  userExperience? : Experience[],
  userContactTimes? : ContactTimeSlot[]
}

export interface KexDialogData {
  labelAction?: string,
  labelHeadline: string,
  labelDescription: string,
}

export interface KexSortData {
  sortBy? : string,
  asc? : boolean,
  size? : number
}
