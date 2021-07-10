import { Component, OnInit } from '@angular/core';
import { CommonService } from './common.service';
import { switchMap, delay } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'demo-rxjs';

  constructor(private commonService: CommonService) {}

  ngOnInit(): void {
    this.getData();
  }

  getData(): void {
    this.commonService
      .api1(1)
      .pipe(
        switchMap((data) => {
          return this.commonService.api2(data[0].id);
        })
      )
      .subscribe((res) => {
        console.log(res);
      });
  }

  getData2(): void {
    this.commonService
      .api1(1)
      .pipe(
        switchMap((data) => {
          return this.commonService.api2(data[0].id);
        })
      )
      .subscribe((res) => {
        console.log(res);
      });
  }
}
