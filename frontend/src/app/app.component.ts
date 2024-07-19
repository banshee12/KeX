import {Component, OnInit} from '@angular/core';
import {KexLoadState} from "./core/models/kex-core.models";
import {HttpClient} from "@angular/common/http";
import {environment} from "../environments/environment";
import {take} from "rxjs";
import {Store} from "@ngrx/store";
import {KexCoreState} from "./core/store/kex-core.state";
import {GetCurrentUser} from "./core/store/actions/kex-core.actions";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  private API_URL = environment.API_URL;
  title = 'frontend';
  loadState = KexLoadState.LOADING;

  constructor(private http: HttpClient, private store : Store<KexCoreState>) {

  }

  ngOnInit() {
    return this.http.get<string>(this.API_URL + '/user/sync', { responseType : 'text' as 'json'}).pipe(take(1)).subscribe(
      {
        next: (data) => {
          this.loadState = KexLoadState.SUCCESS;
          this.store.dispatch(GetCurrentUser.do());
        },
        error: (e) => {
          this.loadState = KexLoadState.FAILURE;
          console.log(e);
        }
      }
    );
  }

  protected readonly KexLoadState = KexLoadState;
}
