import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {firstValueFrom} from "rxjs";

const BASE_URL = 'http://localhost:8080';

@Injectable({
  providedIn: 'root'
})
export class TemperatureService {

  private monthlyData: Map<Month, ITemperature[]> | null;

  constructor(private readonly http: HttpClient) {
    this.monthlyData = null;
  }

  public async getMonthlyTempData(month: Month): Promise<ITemperature[]> {
    if (this.monthlyData === null) {
      this.monthlyData = await this.loadData();
    }
    if (!this.monthlyData.has(month)) {
      return [];
    }
    return this.monthlyData.get(month)!;
  }

  private async loadData(): Promise<Map<Month, ITemperature[]>> {
    const url = `${BASE_URL}/api/temperature`;
    const request = this.http.get<IServerData[]>(url);
    const response = await firstValueFrom(request);

    const map = new Map<Month, ITemperature[]>();
    for (let t of response){
      const data = TemperatureService.convert(t);
      const month = data.month;
      if (!map.has(month)){
        map.set(month, []);
      }
      map.get(month)!.push(data);
    }
    return map;
  }

  private static convert(serverData: IServerData): ITemperature {
    let month: Month;
    switch (serverData.month) {
      case 'JANUARY': {
        month = Month.January;
      }
        break;
      case 'FEBRUARY': {
        month = Month.February;
      }
        break;
      case 'MARCH': {
        month = Month.March;
      }
        break;
      case 'APRIL': {
        month = Month.April;
      }
        break;
      case 'MAY': {
        month = Month.May;
      }
        break;
      case 'JUNE': {
        month = Month.June;
      }
        break;
      case 'JULY': {
        month = Month.July;
      }
        break;
      case 'AUGUST': {
        month = Month.August;
      }
        break;
      case 'SEPTEMBER': {
        month = Month.September;
      }
        break;
      case 'OCTOBER': {
        month = Month.October;
      }
        break;
      case 'NOVEMBER': {
        month = Month.November;
      }
        break;
      case 'DECEMBER': {
        month = Month.December;
      }
        break;
      default: {
        throw new Error(`Unknown month ${serverData.month}`);
      }
    }
    return {
      year: serverData.year,
      month: month,
      temperature: serverData.temperature
    }
  }
}

export enum Month {
  January,
  February,
  March,
  April,
  May,
  June,
  July,
  August,
  September,
  October,
  November,
  December
}

export interface ITemperature {
  year: number,
  month: Month,
  temperature: number
}

interface IServerData {
  year: number,
  month: string,
  temperature: number
}
