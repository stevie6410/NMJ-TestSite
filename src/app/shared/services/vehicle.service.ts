import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { map, tap, catchError } from "rxjs/operators";

import { Vehicle, PriceChange } from "../models/app.models";
import { handleError, httpOptions } from '../helpers/http.helpers';

@Injectable()
export class VehicleService {

  baseUrl: string;

  constructor(
    private http: HttpClient
  ) {
    this.baseUrl = "https://nmj-notifications.azurewebsites.net/api/vehicles";
    //this.baseUrl = "http://localhost:5000/api/vehicles";
  }

  public getVehicle(registration: string): Observable<Vehicle> {
    return this.http
      .get<Vehicle>(`${this.baseUrl}/${registration}`)
      .pipe(catchError(handleError('Get Vehicle', null)));
  }

  public getVehicles(): Observable<Vehicle[]> {
    return this.http
      .get<Vehicle[]>(this.baseUrl)
      .pipe(catchError(handleError('Get Vehicles', null)));
  }

  public createUpdateVehicle(vehicle: Vehicle): Observable<Vehicle> {
    return this.http
      .post<Vehicle>(this.baseUrl, JSON.stringify(vehicle))
      .pipe(catchError(handleError('Update Vehicle', null)));
  }

  public deleteVehicle(registration: string): Observable<void> {
    return this.http
      .delete(`${this.baseUrl}/${registration}`)
      .pipe(catchError(handleError('Delete Vehicle', null)));
  }

  public updatePrice(
    registration: string,
    newPrice: number,
    sendNotifications: boolean = true
  ): Observable<Vehicle> {

    const url = `${this.baseUrl}/${registration}/updateprice`;
    const priceChange: PriceChange = {
      newPrice: newPrice,
      sendNotifications: sendNotifications
    };
    const body = JSON.stringify(priceChange);

    console.log(url);
    console.log(body);

    return this.http
      .post<Vehicle>(url, body, httpOptions)
      .pipe(catchError(handleError('Change Price', null)));
  }

}
