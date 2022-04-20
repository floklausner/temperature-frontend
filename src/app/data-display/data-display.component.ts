import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {ITemperature, Month, TemperatureService} from "../../shared/temperature.service";

@Component({
  selector: 'app-data-display',
  templateUrl: './data-display.component.html',
  styleUrls: ['./data-display.component.scss']
})
export class DataDisplayComponent implements OnChanges {

  @Input()
  public selectedMonth!: Month;
  public data: ITemperature[];
  public displayedColumns: string[] = ['year', 'temperature'];

  constructor(private readonly temperature: TemperatureService) {
    this.data = [];
  }

  public async ngOnChanges(changes: SimpleChanges): Promise<void> {
    this.data = await this.temperature.getMonthlyTempData(this.selectedMonth);
  }

}
