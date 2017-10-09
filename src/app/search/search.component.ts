import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import {  ReactiveFormsModule, FormControl } from '@angular/forms';

@Component({
  selector: 'search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  city = new FormControl();
  @Input() cityName : string;
  @Output("search") currentWeatherEmitter = new EventEmitter();

  constructor() {}

  searchCity(){
    console.log(this.city.value)
    this.currentWeatherEmitter.emit(this.city.value);
  }

  ngOnInit(){
  }

}
