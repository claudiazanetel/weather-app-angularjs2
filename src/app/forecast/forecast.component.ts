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
  isEmpty: boolean;
  constructor(private http: HttpClient) { 
    this.forecastDailyData;
    this.isEmpty = false;
  }

  ngOnChanges(changes: {[propKey: string]: SimpleChange}) {
    console.log(changes.cityName.currentValue);
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
        console.log('forecast: ' + this.forecastDailyData)},
        err => {
          this.isEmpty = false;
        });
      }
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