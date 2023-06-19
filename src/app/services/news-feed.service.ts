import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {NewsSearchResponse} from "../model/news.model";
import {Sort} from "@angular/material/sort";
import {AuthService} from "../auth/auth.service";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class NewsFeedService {

  serverUrl: string = environment.protocol + environment.hostIP + ":" + environment.port
  constructor(private httpClient: HttpClient,
              private authService: AuthService) { }

  getFeeds(page: number, category: string = '', pubdate: string = ''): Observable<NewsSearchResponse> {

    let sort: Sort = {active: 'newsPublishDateTime', direction: 'desc'};
    let params: {} = {page : page, size: 8, sort: `${sort.active + ',' +sort.direction}`};
    if(category) {
      // @ts-ignore
      params['category'] = category;
    }
    if(pubdate) {
      // @ts-ignore
      params['pubdate'] = pubdate;
    }
    // @ts-ignore
    const options = {
      params : new HttpParams({
        fromObject: params
      }),
      headers: new HttpHeaders({
        'Content-type': 'application/x-www-form-urlencoded; charset=utf-8',
        'Authorization': 'Bearer ' + this.authService.getSession()
      })
    };
    console.log(params)

    return this.httpClient.get<NewsSearchResponse>(this.serverUrl + "/getfeed", options);
  }

  refreshFeeds(): Observable<string> {
    const options = {
      headers: new HttpHeaders({
        'Content-type': 'application/x-www-form-urlencoded; charset=utf-8',
        'Authorization': 'Bearer ' + this.authService.getSession()
      })
    };

    return this.httpClient.get<string>(this.serverUrl + "/refresh", options);
  }

  countFeed(newsId: string, categoryId: number, username: string): Observable<void> {

    const options = {
      params : new HttpParams({
        fromObject: {newsid: newsId, categoryid: categoryId, username: username}
      }),
      headers: new HttpHeaders({
        'Content-type': 'application/x-www-form-urlencoded; charset=utf-8',
        'Authorization': 'Bearer ' + this.authService.getSession()
      })
    };
    return this.httpClient.put<void>(this.serverUrl + "/count", {}, options);
  }
}
