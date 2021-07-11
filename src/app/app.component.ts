import { Component, OnInit } from '@angular/core';
import { CommonService } from './common.service';
import { switchMap, delay, mergeMap, concatMap } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'demo-rxjs';

  constructor(private commonService: CommonService) {}

  ngOnInit(): void {
    this.getDataMergeMap();
    this.test();
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

  getDataMergeMap(): void {
    this.commonService
      .api1(1)
      .pipe(
        mergeMap((data1) => {
          return this.commonService.api2(data1[0].id);
        }),
        mergeMap((data2) => {
          return this.commonService.api3(data2[0].title);
        }),
        mergeMap((data3) => {
          return this.commonService.api3(data3[1].id);
        })
      )
      .subscribe((res) => {
        console.log(res);
      });
  }

  getDataConcatMap(): void {
    this.commonService
      .api1(1)
      .pipe(
        concatMap((data1) => {
          return this.commonService.api2(data1[0].id);
        }),
        mergeMap((data2) => {
          return this.commonService.api3(data2[0].title);
        }),
        mergeMap((data3) => {
          return this.commonService.api3(data3[1].id);
        })
      )
      .subscribe((res) => {
        console.log(res);
      });
  }

  test(): void {
    // emit delay value
    const source = of(2000, 1000);
    // map value from source into inner observable, when complete emit result and move to next
    const example = source.pipe(
      concatMap((val) => of(`Delayed by: ${val}ms`).pipe(delay(val)))
    );
    // output: With concatMap: Delayed by: 2000ms, With concatMap: Delayed by: 1000ms
    const subscribe = example.subscribe((val) =>
      console.log(`With concatMap: ${val}`)
    );

    // showing the difference between concatMap and mergeMap
    const mergeMapExample = source
      .pipe(
        // just so we can log this after the first example has run
        delay(5000),
        mergeMap((val) => of(`Delayed by: ${val}ms`).pipe(delay(val)))
      )
      .subscribe((val) => console.log(`With mergeMap: ${val}`));
  }
}
