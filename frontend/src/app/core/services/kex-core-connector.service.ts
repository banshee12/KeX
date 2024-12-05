import { Injectable } from '@angular/core';
import {Observable, of} from "rxjs";
import {User} from "../models/kex-core.models";
import { HttpClient } from "@angular/common/http";
import {Store} from "@ngrx/store";
import {environment} from "../../../environments/environment";
import {
  KexWidgetSkillsComponent
} from "../../modules/home/components/widgets/kex-widget-skills/kex-widget-skills.component";
import {
  KexWidgetExperienceComponent
} from "../../modules/home/components/widgets/kex-widget-experience/kex-widget-experience.component";
import {
  KexWidgetContactDataComponent
} from "../../modules/home/components/widgets/kex-widget-contact-data/kex-widget-contact-data.component";
import {
  KexWidgetFeedbackComponent
} from "../../modules/home/components/widgets/kex-widget-feedback/kex-widget-feedback.component";
import {
  KexWidgetFavoriteUserComponent
} from "../../modules/home/components/widgets/kex-widget-favorite-user/kex-widget-favorite-user.component";

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

  loadKexWidgetSettings() : Observable<string[]> {
    //return of(['CONTACT_DATA', 'TOP_SKILLS', 'LAST_EXPERIENCE', 'USER_WATCHLIST', 'FEEDBACK']);
    return this.http.get<string[]>(this.API_URL + '/user/widget/sorting');
  }

  saveKexWidgetSettings(settings : string[]) : Observable<string> {
    return this.http.post<string>(this.API_URL + '/user/widget/sorting', settings);
  }
}
