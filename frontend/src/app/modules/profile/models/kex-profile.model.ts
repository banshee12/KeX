

export type KexUserSkill = {
  id : number,
  skill : KexSkill,
  visible : boolean,
  level : number,
}

export type KexSkill = {
  id: number,
  title : string,
}

export type Experience = {
  id : number,
  title : string,
  visible : boolean,
  description : string,
  skill? : KexSkill[]
}

export type ContactData = {
  contactTime : ContactTime,
  contactOptions : ContactOption[],
}

export type ContactTime = {
  timeSlots : ContactTimeSlot[]
}

export type ContactTimeSlot = {
  id? : number,
  day : string,
  fromTime : Date,
  toTime : Date,
}

export type ContactOption = {
  type : string,
  checked : boolean,
}
