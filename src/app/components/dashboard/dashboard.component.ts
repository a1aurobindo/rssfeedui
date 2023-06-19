import {Component, OnInit, ViewChild} from '@angular/core';
import {CognitoUserPool} from "amazon-cognito-identity-js";
import {environment} from "../../../environments/environment";
import {Router} from "@angular/router";
import {AuthService} from "../../auth/auth.service";
import {NewsFeedService} from "../../services/news-feed.service";
import {Subscription} from "rxjs";
import {NewsListComponent} from "../news-list/news-list.component";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {

  reloadFlag: boolean = false;
  // @ts-ignore
  @ViewChild(NewsListComponent) newsListComponent:NewsListComponent;
  constructor(private router:Router, private authService: AuthService,
              private newsService: NewsFeedService) { }

  ngOnInit(): void {

    if(!this.authService.isLoggedIn()) {
      this.router.navigate([""]);
    }

    // this.refreshFeed();
  }

  onLogout(): void {
    let poolData = {
      UserPoolId: environment.cognitoUserPoolId,
      ClientId: environment.cognitoAppClientId
    };
    let userPool = new CognitoUserPool(poolData);
    let cognitoUser = userPool.getCurrentUser();
    cognitoUser?.signOut();
    this.router.navigate([""])
  }

  refreshFeed(): void {
    this.newsListComponent.refreshFeed();
    this.reloadFlag =  true;
  }
}
