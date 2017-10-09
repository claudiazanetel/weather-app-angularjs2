import { Component, OnChanges, Input, SimpleChange } from '@angular/core';
import { HttpClient, HttpParams} from '@angular/common/http';

@Component({
  selector: 'current',
  templateUrl: './current.component.html',
  styleUrls: ['./current.component.css']
})
export class CurrentComponent implements OnChanges {
  @Input() cityName : string;
  currentData: Object;
  constructor(private http: HttpClient) { 
    this.currentData;
  }

  ngOnChanges(changes: {[propKey: string]: SimpleChange}) {
    console.log('changed current');
    console.log(changes.cityName.currentValue);
    if (changes.cityName.currentValue) {
      this.http.get('http://api.openweathermap.org/data/2.5/weather', {
        params: new HttpParams()
          .set('q', changes.cityName.currentValue)
          .set('units', 'metric')
          .set('appid', '4b80da9843e489246022d72d79a1e508')
      }).subscribe(data => {
        console.log(data);
        this.currentData = data;
      });
    }
  }

}
