import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {User} from "../models/kex-core.models";
import {HttpClient} from "@angular/common/http";
import {Store} from "@ngrx/store";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class KexCoreConnectorService {
  private API_URL= environment.API_URL;
  private httpOptions = { responseType : 'text' as 'json'};

  constructor(private http : HttpClient) { }

  getCurrentUser() : Observable<User> {
    return this.http.get<User>(this.API_URL + '/user');
  }

  getFavoriteUserList() : Observable<User[]> {
    return this.http.get<User[]>(this.API_URL + '/user/favorite');
    //return of(dummyFavoriteData);
  }

  editFavoriteUser(userSub : string, remove : boolean) : Observable<string> {
    return this.http.put<string>(this.API_URL + '/user/favorite/' + userSub + '/' + remove, {}, this.httpOptions);
  }
}
