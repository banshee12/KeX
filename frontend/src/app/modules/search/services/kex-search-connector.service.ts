import { Injectable } from '@angular/core';
import {environment} from "../../../../environments/environment";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable, of} from "rxjs";
import {Experience, KexUserSkill} from "../../profile/models/kex-profile.model";
import {kexUserSkill1, kexUserSkill2} from "../../profile/dummy-data";
import {searchResult} from "../dummy-data";
import {KexSearchResult} from "../models/kex-search.model";
import {User} from "../../../core/models/kex-core.models";

@Injectable({
  providedIn: 'root'
})
export class KexSearchConnectorService {

  private API_URL= environment.API_URL;
  constructor(private http : HttpClient) { }

  searchUsers(value : string) : Observable<User[]> {
    const params = new HttpParams().set('searchStr', value);
    return this.http.get<User[]>(this.API_URL + '/user/search', {params});
    //return of(searchResult); //testing
  }
  getDetailsOfUser(userId : string) : Observable<User> {
    return this.http.get<User>(this.API_URL + '/user/' + userId);
  }
}
