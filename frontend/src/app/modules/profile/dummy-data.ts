import {Skill} from "./models/kex-profile.model";
import {Experience} from "./models/kex-profile.model";

export const skill1 : Skill = {
  id : 1,
  visible : true,
  title : 'Java',
  level : 3
}

export const skill2 : Skill = {
  id : 2,
  visible : false,
  title : 'Angular',
  level : 2
}

export const proj1 : Experience={
  id : 1,
  title : 'TIA Safety',
  visible : true,
  description : 'Totally Integrated Automation providing engineering system for SIMATIC Failsafe Hardware',
  linkedSkills : [skill1]
}

export const proj2 : Experience={
  id :2,
  title:'OHM Kex',
  visible:false,
  description : 'Projekt zum Master SWE',
  linkedSkills: [skill1,skill2]
}
