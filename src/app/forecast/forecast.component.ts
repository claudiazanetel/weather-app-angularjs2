import { Component, OnChanges, Input, SimpleChange } from '@angular/core';
import { HttpClient, HttpParams} from '@angular/common/http';

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
  isEmpty: boolean;
  city: string;
  constructor(private http: HttpClient) { 
    this.forecastDailyData;
    this.forecastDetailsHourly;
    this.isEmpty = false;
    this.city;
    this.selectedDay;
  }

  ngOnChanges(changes: {[propKey: string]: SimpleChange}) {
    console.log(changes.cityName.currentValue);
    this.city = changes.cityName.currentValue;
    if (changes.cityName.currentValue) {
      this.http.get('http://api.openweathermap.org/data/2.5/forecast/daily', {
        params: new HttpParams()
          .set('q', changes.cityName.currentValue)
          .set('units', 'metric')
          .set('appid', '4b80da9843e489246022d72d79a1e508')
      }).subscribe(
        data => {
        console.log(data['list']);
        this.forecastDailyData = data;
        this.isEmpty = true;
        },
        err => {
          this.isEmpty = false;
        });
    }
  }

  getDayDetails(day){
    this.selectedDay = day;
    let dateFrom = new Date(this.selectedDay * 1000);
    let dateTo = new Date(this.selectedDay * 1000);
    dateFrom.setHours(0, 0, 0, 0);
    dateTo.setHours(23, 59, 59, 999);
    let from = dateFrom.getTime() / 1000;
    let to = dateTo.getTime() / 1000;

    this.http.get('http://api.openweathermap.org/data/2.5/forecast/', {
      params: new HttpParams()
        .set('q', this.city)
        .set('units', 'metric')
        .set('appid', '4b80da9843e489246022d72d79a1e508')
    }).subscribe(
      data => {
      function filterDetails(listData) {
        return listData.filter(function(element) {
            return element.dt >= from && element.dt < to;
        })
      }
      this.forecastDetailsHourly = filterDetails(data['list']);
      console.log(this.forecastDetailsHourly);
      },
      err => {
        console.log('error in details')
      });
  }
}

// ng-repeat call getDaysDetails
/* $scope.getDaysDetails = function () {
  var dateFrom = new Date($scope.selectedDay * 1000);
  var dateTo = new Date($scope.selectedDay * 1000);
  dateFrom.setHours(0, 0, 0, 0);
  dateTo.setHours(23, 59, 59, 999);
  var from = dateFrom.getTime() / 1000;
  var to = dateTo.getTime() / 1000;
  return $scope.detailedWeatherData.filter(function (element) {
    return element.dt >= from && element.dt < to;
  });
}; */