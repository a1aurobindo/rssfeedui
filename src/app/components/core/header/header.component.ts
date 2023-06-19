import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Output() loggedOut: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() refreshed: EventEmitter<boolean> = new EventEmitter<boolean>();
  constructor() { }

  ngOnInit(): void {
  }

  refreshFeed(): void {
    this.refreshed.emit(true);
  }
  logout(): void {
    this.loggedOut.emit(true);
  }

}
