import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Month} from "../../shared/temperature.service";
import {MatSelectChange} from "@angular/material/select";

@Component({
  selector: 'app-month-selection',
  templateUrl: './month-selection.component.html',
  styleUrls: ['./month-selection.component.scss']
})
export class MonthSelectionComponent implements OnInit {

  public options: string[] | null;
  public selectedMonth: string | null;
  @Output()
  public selMonthChanged: EventEmitter<Month>;

  constructor() {
    this.options = null;
    this.selectedMonth = null;
    this.selMonthChanged = new EventEmitter<Month>();
  }

  public ngOnInit(): void {
    const o = [];
    for (let m in Month){
      if (isNaN(Number(m))) {
        o.push(m);
      }
    }
    this.options = o;
    const defaultMonth = o[0];
    this.setMonth(defaultMonth);
  }

  public monthSelectionChanged(selMonth: MatSelectChange): void {
    this.setMonth(selMonth.value);
  }

  private setMonth(selMonth: string): void{
    this.selectedMonth = selMonth;
    const month: Month = Month[selMonth as keyof typeof Month];
    this.selMonthChanged.emit(month);
  }
}
