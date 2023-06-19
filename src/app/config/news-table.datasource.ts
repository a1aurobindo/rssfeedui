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

  get noNewsFound(): boolean {
    return !this.news || this.news.length === 0;
  }

  get paginationData(): { totalItems: number, itemsPerPage: number, currentPage: number, totalPages: number, pageSize: number } {
    return {
      totalItems: this.newsData ? this.newsData.totalElements : 0,
      itemsPerPage: this.newsData ? this.newsData.numberOfElements : 0,
      currentPage: this.newsData ? this.newsData.number : 0,
      totalPages: this.newsData ? this.newsData.totalPages : 0,
      pageSize: this.newsData ? this.newsData.size : 0
    };
  }

  connect(): Observable<News[]> {
    return this.newsList$;
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this._newsList.complete();
  }

  loadNewsData(newsData?: NewsSearchResponse): void {
    this.newsData = newsData;
    if (this.newsData) {
      // @ts-ignore
      this._newsList.next(newsData.content);
    } else {
      this._newsList.next([]);
    }

  }

  trackBy(_index: number, news: News): string {
    return news.newsId;
  }

  clear(): void {
    this._newsList.next([]);
  }
}
