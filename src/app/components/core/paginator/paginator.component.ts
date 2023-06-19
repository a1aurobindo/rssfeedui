import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {PageEvent} from "@angular/material/paginator";

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss']
})
export class PaginatorComponent implements OnInit {

  @Input() pageSizeOption: number = 20;
  @Input() pageNumber: number = 0;
  @Input() pageSize: number = 1;
  @Input() pageLength: number = 1;
  @Output() pageChanged: EventEmitter<number> = new EventEmitter<number>();
  constructor() { }

  ngOnInit(): void {
  }

  changed(page: PageEvent): void {
    console.log("paginator index")
    console.log(page)
    this.pageChanged.emit(page.pageIndex);
  }

}
