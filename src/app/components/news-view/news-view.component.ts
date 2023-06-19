import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-news-view',
  templateUrl: './news-view.component.html',
  styleUrls: ['./news-view.component.scss']
})
export class NewsViewComponent implements OnInit {

  @Input() url: string = '';
  constructor() { }

  ngOnInit(): void {
  }

}



