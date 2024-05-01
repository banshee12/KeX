import {KexSkill, KexUserSkill} from "./models/kex-profile.model";
import {Experience} from "./models/kex-profile.model";

export const skill1 : KexSkill = {
  id : 1,
  title : 'Java',
}
export const skill2 : KexSkill = {
  id : 2,
  title : 'Angular',
}

export const skill3 : KexSkill = {
  id : 3,
  title : 'C#',
}
export const kexUserSkill1 : KexUserSkill = {
  id : 1,
  visible : true,
  skill : skill1,
  level : 3
}

export const kexUserSkill2 : KexUserSkill = {
  id : 2,
  visible : false,
  skill : skill2,
  level : 2
}

export const kexUserSkill3 : KexUserSkill = {
  id : 3,
  visible : true,
  skill : skill3,
  level : 4
}

export const proj1 : Experience={
  id : 1,
  title : 'TIA Safety',
  visible : true,
  description : 'Totally Integrated Automation providing engineering system for SIMATIC Failsafe Hardware',
}

export const proj2 : Experience={
  id :2,
  title:'OHM Kex',
  visible:false,
  description : 'Projekt zum Master SWE',
}
