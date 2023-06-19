import {Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import {NewsTableDatasource} from "../../config/news-table.datasource";
import {NewsFeedService} from "../../services/news-feed.service";
import {Subscription} from "rxjs";
import {News} from "../../model/news.model";
import {AuthService} from "../../auth/auth.service";

@Component({
  selector: 'app-news-list',
  templateUrl: 'news-list.component.html',
  styleUrls: ['news-list.component.scss']
})
export class NewsListComponent implements OnInit, OnDestroy {

  pubdate:string ='';
  category:string = '';
  subscription: Subscription = new Subscription();
  // @Output()clickEvent: EventEmitter<string> = new EventEmitter<string>();
  dataSource: NewsTableDatasource = new NewsTableDatasource();
  constructor(private newsService: NewsFeedService, private authService: AuthService) { }

  ngOnInit(): void {
    this.getNewsFeeds(0);
  }

  clickNews(news: News): void {
    this.subscription.add(
      this.newsService.countFeed(news.newsId, news.categoryId, this.authService.getLoggedinUserName())
        .subscribe(
          () => window.open(news.newsLink, "_blank"),
          (err) => console.log(err)
        ));
    // this.clickEvent.emit(encodeURI(url));
  }

  getFeedOfThisDate(dateMs: number): void {
    this.pubdate = new Date(dateMs).toISOString().split('T')[0]
    console.log('this.pubdate')
    console.log(this.pubdate)
    this.getNewsFeeds(0)
  }

  savePage(url: string): void {

  }

  pageChanged(page: number): void {
    console.log("List index")
    console.log(page)
    this.getNewsFeeds(page);
  }

  getNewsFeeds(page: number): void {
    this.subscription.add(
      this.newsService.getFeeds(page, this.category, this.pubdate).subscribe(news => {
        this.dataSource = new NewsTableDatasource();
        this.dataSource.loadNewsData(news);
        console.log(this.dataSource.paginationData.pageSize);
        console.log(this.dataSource.paginationData.totalItems);
      })
    );
  }

  refreshFeed(): void {
    this.category = '';
    this.pubdate = '';
    this.subscription.add(
      this.newsService.refreshFeeds().subscribe(
        (resp) => {
          console.log(resp)
          this.getNewsFeeds(0);
        }, (err) => {
          console.log(err);
          this.getNewsFeeds(0);
        }
      )
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  // ngOnChanges(changes: SimpleChanges): void {
  //   console.log(changes);
  //   if(changes['reloadFlag'].currentValue === true) {
  //     this.refreshFeed();
  //   }
  // }
}
