import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from "@angular/router";

@Component({
  selector: 'kex-profile',
  templateUrl: './kex-profile.component.html',
  styleUrl: './kex-profile.component.scss'
})
export class KexProfileComponent implements OnInit{

  public selectedTab = 0;

  constructor(private route : ActivatedRoute, private router : Router) {
  }
  changeTab($event: number) {
    const queryParams: Params = { tab: $event };
    this.router.navigate(
      [],
      {
        relativeTo: this.route,
        queryParams,
        queryParamsHandling: 'merge', // remove to replace all query params by provided
      }
    );
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(queryParams  => {
      let param = queryParams['tab'];
      this.selectedTab = param ? param : 0;
    });
  }
}
