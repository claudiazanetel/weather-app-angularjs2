import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import {  ReactiveFormsModule, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  city = new FormControl('', [Validators.required]);
  @Input() cityName : string;
  @Output("search") currentWeatherEmitter = new EventEmitter();
  noCity: boolean;

  constructor() {
    this.noCity = false;
  }

  searchCity(){
    console.log(this.city.value)
    this.currentWeatherEmitter.emit(this.city.value);
    if (this.city.invalid) {
      this.noCity = true;
    }
  }

  ngOnInit(){
  }

}
