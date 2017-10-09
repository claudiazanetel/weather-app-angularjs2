import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import {  ReactiveFormsModule, FormControl } from '@angular/forms';
import { HttpClient, HttpParams} from '@angular/common/http';

@Component({
  selector: 'search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  city = new FormControl();
  @Input() cityName : string;
  @Output("search") currentWeatherEmitter = new EventEmitter();

  constructor(private http: HttpClient) {}

  searchCity(){
    console.log(this.city.value)
    this.currentWeatherEmitter.emit(this.city.value);
/*     this.http.get('http://api.openweathermap.org/data/2.5/weather', {
      params: new HttpParams()
        .set('q', this.city.value)
        .set('units', 'metric')
        .set('appid', '4b80da9843e489246022d72d79a1e508')
    }).subscribe(data => {
      console.log(data);
      this.currentWeatherEmitter.emit(data);
    }); */
  }

  ngOnInit(){
  }

}
