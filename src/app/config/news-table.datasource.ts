import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { BehaviorSubject, Observable } from 'rxjs';
import { News, NewsSearchResponse } from '../model/news.model';

export class NewsTableDatasource extends DataSource<News> {
  private newsData: NewsSearchResponse | undefined;
  private readonly _newsList: BehaviorSubject<News[]> = new BehaviorSubject<News[]>([]);
  readonly newsList$: Observable<News[]> = this._newsList.asObservable();

  constructor() {
    super();
  }

  get news(): News[] {
    return this._newsList.value;
  }

  get noUsersFound(): boolean {
    return !this.news || this.news.length === 0;
  }

  get paginationData(): any {
    return {
      totalItems: this.newsData ? this.newsData.totalElements : 0,
      itemsPerPage: this.newsData ? this.newsData.numberOfElements : 0,
      currentPage: this.newsData ? this.newsData.number : 0,
      totalPages: this.newsData ? this.newsData.totalPages : 0
    };
  }

  connect(): Observable<News[]> {
    return this.newsList$;
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this._newsList.complete();
  }

  loadUsersData(newsData?: NewsSearchResponse): void {
    this.newsData = newsData;
    if (this.newsData) {
      this._newsList.next(newsData.content);
    } else {
      this._newsList.next([]);
    }

  }

  trackBy(_index: number, news: News): string {
    return news.newsId;
  }
  /**
   *
   * @param updatedUser
   * @param userId
   */
  updateUser(news: News, newsId): void {
    const userList: News[] = this._newsList.value;
    const userIndex = userList.findIndex((user , i ) => news.newsId === newsId);
    userList[userIndex] = news;
    this.newsData.content = userList;
    this.loadUsersData(this.newsData);

  }
}
