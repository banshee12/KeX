import {Time} from "@angular/common";

export type Skill = {
  id : number,
  title : string,
  visible : boolean,
  level : number,
}

export type Experience = {
  id : number,
  title : string,
  visible : boolean,
  description : string,
  linkedSkills : Skill[] //noch nicht relevant
}

export type ContactData = {
  contactTime : ContactTime,
  contactOptions : ContactOption[],
}

export type ContactTime = {
  timeSlots : ContactTimeSlot[]
}

export type ContactTimeSlot = {
  day : string, //type enum, number?
  fromTime : Time,
  toTime : Time,
}

export type ContactOption = {
  type : string,
  checked : boolean,
}
