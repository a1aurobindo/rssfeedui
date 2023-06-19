export interface News {
    newsId: string;
    newsTitle: string;
    newsDescription: string;
    newsPublishDateTime: string;
    newsLink: string;
    clickCount: string;
    categoryId: number;
    agencyId: number;
}

export interface NewsSearchResponse {
  content: News[];
  size: number;
  number: number;
  totalPages: number;
  numberOfElements: number;
  totalElements: number;
  firstPage: boolean;
  lastPage: boolean;
}
