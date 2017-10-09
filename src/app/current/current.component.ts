import { Component, OnChanges, Input, SimpleChange } from '@angular/core';

@Component({
  selector: 'current',
  templateUrl: './current.component.html',
  styleUrls: ['./current.component.css']
})
export class CurrentComponent implements OnChanges {
  @Input() cityName : string;
  constructor() { }

  ngOnChanges(changes: {[propKey: string]: SimpleChange}) {
    console.log('changed current');
    console.log(changes.cityName.currentValue);
  }

}
