import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'kex-user-profile',
  templateUrl: './kex-user-profile.component.html',
  styleUrl: './kex-user-profile.component.scss'
})
export class KexUserProfileComponent implements OnInit{
  public userId : string = '';
  public showBackToSearchButton = false;
  ngOnInit(): void {
    this.route.url.subscribe(url  => {
      if(url.length === 2){
        this.userId = url[1].path;
      }
    });

    this.route.queryParams.subscribe(queryParams  => {
      let param = queryParams['backToSearch'];
      this.showBackToSearchButton = param === 'true';
    });
  }

  constructor(private route: ActivatedRoute, private router : Router) {
  }

  backToSearch() {
    this.router.navigate(['/search']).then();
  }
}
