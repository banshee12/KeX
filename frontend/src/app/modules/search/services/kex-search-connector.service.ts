import { Injectable } from '@angular/core';
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable, of} from "rxjs";
import {Experience, Skill} from "../../profile/models/kex-profile.model";
import {skill1, skill2} from "../../profile/dummy-data";
import {searchResult} from "../dummy-data";
import {KexSearchResult} from "../models/kex-search.model";
import {User} from "../../../core/models/kex-core.models";

@Injectable({
  providedIn: 'root'
})
export class KexSearchConnectorService {

  private API_URL= environment.API_URL;
  constructor(private http : HttpClient) { }

  searchUsers(value : string) : Observable<KexSearchResult> {
    //return this.http.get<KexSearchResult>(this.API_URL + '/user/search');
    return of(searchResult); //testing
  }
  getDetailsOfUser(pk : number) : Observable<User> {
    return this.http.get<User>(this.API_URL + '/user/');
  }
}
