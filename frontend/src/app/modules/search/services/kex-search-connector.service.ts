import {Injectable} from '@angular/core';
import {environment} from "../../../../environments/environment";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable, of} from "rxjs";
import {Experience, KexUserSkill} from "../../profile/models/kex-profile.model";
import {kexUserSkill1, kexUserSkill2} from "../../profile/dummy-data";
import {searchResult} from "../dummy-data";
import {KexSearchRequest, KexSearchResult} from "../models/kex-search.model";
import {KexUserDetails, User} from "../../../core/models/kex-core.models";

@Injectable({
  providedIn: 'root'
})
export class KexSearchConnectorService {

  private API_URL = environment.API_URL;

  constructor(private http: HttpClient) {
  }

  searchUsers(searchData: KexSearchRequest): Observable<User[]> {
    return this.http.post<User[]>(this.API_URL + '/user/search', searchData);
    //return of(searchResult); //testing
  }

  getDetailsOfUser(userId: string): Observable<KexUserDetails> {
    return this.http.get<KexUserDetails>(this.API_URL + '/user/' + userId);
  }
}
