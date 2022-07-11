import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.css']
})
export class SearchbarComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  enteredSearchvalue : string = '';

  @Output()
  searchTextChanged: EventEmitter<string> = new EventEmitter<string>(); 

  onSearchTextChanged(){
    this.searchTextChanged.emit(this.enteredSearchvalue);
  }

}
