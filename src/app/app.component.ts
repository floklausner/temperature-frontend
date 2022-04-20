import { Component } from '@angular/core';
import {Month} from "../shared/temperature.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  public selectedMonth: Month | null;

  constructor() {
    this.selectedMonth = null;
  }

  public handleSelMonthChanged(selectedMonth: Month): void {
    this.selectedMonth = selectedMonth;
  }
}
