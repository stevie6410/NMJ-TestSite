import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Client } from '../models/app.models';
import { catchError } from 'rxjs/operators';
import { handleError, httpOptions } from '../helpers/http.helpers';

@Injectable()
export class ClientService {

  baseUrl: string;
  cookieKey: string = 'watch_client_ref';

  constructor(
    private http: HttpClient
  ) {
    this.baseUrl = "https://nmj-notifications.azurewebsites.net/api/clients";
    //this.baseUrl = "http://localhost:5000/api/clients";
  }

  public watchWithClientRef(clientRef: string, registration: string): Observable<Client> {
    return this.http
      .post<Client>(`${this.baseUrl}/${clientRef}/watch/${registration}`, null, httpOptions)
      .pipe(catchError(handleError('Watch car', null)));
  }

  public unwatch(clientRef: string, registration: string): Observable<Client> {
    return this.http
      .post<Client>(`${this.baseUrl}/${clientRef}/unwatch/${registration}`, null, httpOptions)
      .pipe(catchError(handleError('Watch car', null)));
  }

  public watchWithEmail(email: string, registration: string): Observable<Client> {
    const body: string = JSON.stringify({
      email: email,
      vehicleRegistration: registration
    });
    return this.http
      .post<Client>(`${this.baseUrl}`, body, httpOptions)
      .pipe(catchError(handleError('Watch car', null)));
  }

  public getClient(clientRef: string): Observable<Client> {
    return this.http
      .get<Client>(`${this.baseUrl}/${clientRef}`)
      .pipe(catchError(handleError('Get Client', null)));
  }

  async isWatching(registration: string): Promise<boolean> {
    if (this.isLoggedIn) {
      var clientRef = localStorage.getItem(this.cookieKey);
      var client = await this.getClient(clientRef).toPromise();
      console.log("Client", client);
      if (
        client &&
        client.linkedVehicles &&
        client.linkedVehicles.filter(x => x.vehicleRegistration == registration && x.watching)[0] != undefined) {
        return true;
      }
    }
    return false;
  }

  get isLoggedIn(): boolean {
    return localStorage.getItem(this.cookieKey) != undefined;
  }
}
