import { Injectable } from '@angular/core';
import {ContactData, ContactOption, ContactTime, Experience, Skill} from "../models/kex-profile.model";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable, of} from "rxjs";
import {skill1, skill2, skill3} from "../dummy-data";
import {proj1} from "../dummy-data";
import {proj2} from "../dummy-data";
import {environment} from "../../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class KexProfileConnectorService {
  private API_URL= environment.API_URL;
  constructor(private http : HttpClient) { }

  getSkillsFromCurrentUser() : Observable<Skill[]> {
    //return this.http.get<Skill[]>(this.API_URL + '/user/skill');
    return of([skill1, skill2, skill3]); //testing
  }
  getExperiencesFromCurrentUser() : Observable<Experience[]> {
    //return this.http.get<Experience[]>(this.API_URL + '/user/experience');
    return of([proj1, proj2]);//testing
  }

  getContactDataFromCurrentUser() : Observable<ContactData> {
    return this.http.get<ContactData>(this.API_URL + '/user/contactData');
  }

  addSkill(newSkill : Skill) : Observable<string> {
    return this.http.post<string>(this.API_URL + '/user/skill', newSkill);
  }

  addExperience(experience : Experience) : Observable<string> {
    return this.http.post<string>(this.API_URL + '/user/experience', experience);
  }

  editSkill(skill : Skill) : Observable<string> {
    return this.http.put<string>(this.API_URL + '/user/skill', skill);
  }

  editExperience(experience : Experience) : Observable<string> {
    return this.http.put<string>(this.API_URL + '/user/experience', experience);
  }

  setContactOption(contactOption : ContactOption) : Observable<string> {
    return this.http.put<string>(this.API_URL + '/user/contactOption', contactOption);
  }

  saveContactTime(contactTime : ContactTime) : Observable<string> {
    return this.http.put<string>(this.API_URL + '/user/contactTime', contactTime);
  }

  deleteSkill(skill : Skill) : Observable<string> {
    return this.http.delete<string>(this.API_URL + '/user/skill/' + skill.id);
  }

  deleteExperience(experience : Skill) : Observable<string> {
    return this.http.get<string>(this.API_URL + '/user/experience/' + experience.id);
  }

  getSkillSuggestions(value : string) : Observable<string[]> {
    const params = new HttpParams().set('value', value)
    return this.http.get<string[]>(this.API_URL + '/user/skill/suggestion', {params});
  }

}
