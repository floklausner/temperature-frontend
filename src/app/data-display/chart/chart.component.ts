import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {ITemperature} from "../../../shared/temperature.service";
import {ChartConfiguration, ChartType} from "chart.js";

@Component({
  selector: 'app-data-display-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnChanges {

  @Input()
  public data!: ITemperature[] | null;
  public readonly lineChartType: ChartType;
  public lineChartData: ChartConfiguration['data'];
  public lineChartOptions: ChartConfiguration['options'];

  constructor() {
    this.data = null;
    this.lineChartType = 'line';
    this.lineChartData = this.getChartData();
    this.lineChartOptions = {
      elements: {
        line: {
          tension: 0.5
        }
      }
    };
  }

  public ngOnChanges(changes: SimpleChanges): void {
    this.lineChartData = this.getChartData();
  }

  private getChartData(): ChartConfiguration['data'] {
    const [dataPoints, labels] = ChartComponent.aggregateDecades(this.data === null ? [] : this.data);
    return {
      datasets: [
        {
          data: dataPoints,
          label: '°C',
          backgroundColor: 'rgba(148,159,177,0.2)',
          borderColor: 'red',
          pointBackgroundColor: 'rgba(148,159,177,1)',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: 'rgba(148,159,177,0.8)'
        }
      ],
      labels: labels
    };
  }

  private static aggregateDecades(data: ITemperature[]): [dataPoints: number[], decades: string[]]{
    const dataPoints: number[] = [];
    const decades: string[] = [];
    const decade = 10;
    let cnt = 0;
    let sum = 0;
    let start: number | null = null;
    let end: number | null = null;
    for (const temp of data){
      sum += temp.temperature;
      if (cnt++ < decade){
        if (start === null){
          start = temp.year;
        }
        end = temp.year;
        continue;
      }
      const avg = sum / decade;
      dataPoints.push(avg);
      decades.push(`${start}-${temp.year}`);
      cnt = sum = 0;
      start = null;
    }
    if (sum > 0){
      const avg = sum / cnt;
      dataPoints.push(avg);
      decades.push(`${start}-${end}`);
    }
    return [dataPoints, decades];
  }

}
