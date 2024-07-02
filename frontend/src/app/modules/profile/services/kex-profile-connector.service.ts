import { Injectable } from '@angular/core';
import {
  ContactData,
  ContactOption,
  ContactTime,
  ContactTimeSlot,
  Experience,
  KexSkill,
  KexUserSkill
} from "../models/kex-profile.model";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable, of} from "rxjs";
import {kexUserSkill1, kexUserSkill2, kexUserSkill3} from "../dummy-data";
import {proj1} from "../dummy-data";
import {proj2} from "../dummy-data";
import {environment} from "../../../../environments/environment";
import {KexSortData, User} from "../../../core/models/kex-core.models";

@Injectable({
  providedIn: 'root'
})
export class KexProfileConnectorService {
  private API_URL= environment.API_URL;

  private httpOptions = { responseType : 'text' as 'json'};
  constructor(private http : HttpClient) { }

  getSkillsFromCurrentUser(sortData : KexSortData) : Observable<KexUserSkill[]> {
    return this.http.put<KexUserSkill[]>(this.API_URL + '/user/userSkill/sorted', sortData);
    //return of([skill1, skill2, skill3]); //testing
  }
  getExperiencesFromCurrentUser(sortData : KexSortData) : Observable<Experience[]> {
    return this.http.put<Experience[]>(this.API_URL + '/user/experience/sorted', sortData);
    //return of([proj1, proj2]);//testing
  }

  addSkill(newSkill : KexUserSkill) : Observable<string> {
    return this.http.post<string>(this.API_URL + '/user/userSkill', newSkill, this.httpOptions);
  }

  addExperience(experience : Experience) : Observable<string> {
    return this.http.post<string>(this.API_URL + '/user/experience', experience, this.httpOptions);
  }

  editSkill(skill : KexUserSkill) : Observable<string> {
    return this.http.put<string>(this.API_URL + '/user/userSkill', skill, this.httpOptions);
  }

  editExperience(experience : Experience) : Observable<string> {
    return this.http.put<string>(this.API_URL + '/user/experience', experience);
  }

  setContactOption(user : User) : Observable<string> {
    return this.http.put<string>(this.API_URL + '/user/contactOption', user);
  }

  saveContactTime(contactTimeSlotList : ContactTimeSlot[]) : Observable<string> {
    return this.http.put<string>(this.API_URL + '/user/contactTime', contactTimeSlotList, this.httpOptions);
  }

  deleteSkill(skill : KexUserSkill) : Observable<string> {
    return this.http.delete<string>(this.API_URL + '/user/userSkill/' + skill.id, this.httpOptions);
  }

  deleteExperience(experience : Experience) : Observable<string> {
    return this.http.delete<string>(this.API_URL + '/user/experience/' +  experience.id, this.httpOptions);
  }

  getSkillSuggestions(value : string) : Observable<KexSkill[]> {
    const params = new HttpParams().set('skillToFind', value)
    return this.http.get<KexSkill[]>(this.API_URL + '/user/skill/suggestion', {params});
  }

}
