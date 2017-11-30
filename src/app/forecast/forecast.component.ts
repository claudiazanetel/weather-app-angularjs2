import { Component, OnChanges, Input, SimpleChange } from '@angular/core';
import { HttpClient, HttpParams} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'forecast',
  templateUrl: './forecast.component.html',
  styleUrls: ['./forecast.component.css']
})
export class ForecastComponent implements OnChanges{
  @Input() cityName : string;
  forecastDailyData: Object;
  forecastDetailsHourly: Object;
  selectedDay: number;
  isEmpty: boolean = true;
  city: string;

  constructor(private http: HttpClient) { 
  }

  ngOnChanges(changes: {[propKey: string]: SimpleChange}) {
    console.log(changes.cityName.currentValue);
    this.city = changes.cityName.currentValue;
    if (changes.cityName.currentValue) {
      this.fetchData(changes.cityName.currentValue, "daily")
      .subscribe(
        data => {
          console.log(data['list']);
          this.forecastDailyData = data;
          this.fetchData(changes.cityName.currentValue, "")
          .subscribe(
            data => {
              this.forecastDetailsHourly = data;
              console.log(this.forecastDetailsHourly);
              this.setSelectedDay(this.forecastDailyData['list'][0]['dt']);
              this.isEmpty = false;
            },
            err => console.log('error in details')
          );
        },
        err => {
          this.isEmpty = true;
        }
      );
    }
  }

  private fetchData(city :string, type :string) :Observable<Object> {
    return this.http.get('http://api.openweathermap.org/data/2.5/forecast/'+type, {
      params: new HttpParams()
        .set('q', city)
        .set('units', 'metric')
        .set('appid', '4b80da9843e489246022d72d79a1e508')
    })
  }

  setSelectedDay(day :number) :void {
    this.selectedDay = day;
  }

  getDayDetails() :Array<Object> {
    let dateFrom = new Date(this.selectedDay * 1000);
    let dateTo = new Date(this.selectedDay * 1000);
    dateFrom.setHours(0, 0, 0, 0);
    dateTo.setHours(23, 59, 59, 999);
    let from = dateFrom.getTime() / 1000;
    let to = dateTo.getTime() / 1000;

    return this.forecastDetailsHourly['list'].filter(
      (element) => { return element.dt >= from && element.dt < to }
    )
  }
}

