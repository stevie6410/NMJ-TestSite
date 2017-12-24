import { Component, OnInit, Input } from '@angular/core';
import { ClientService } from '../../../shared/services/client.service';
import { Client } from '../../../shared/models/app.models';

@Component({
  selector: 'app-watch',
  templateUrl: './watch.component.html',
  styleUrls: ['./watch.component.scss']
})
export class WatchComponent implements OnInit {

  @Input() registration;
  email: string;
  cookieKey: string = 'watch_client_ref';
  watching: boolean;
  errorMsg: string;

  constructor(
    private clientService: ClientService
  ) { }

  async ngOnInit() {
    await this.updateWatching();
  }

  async updateWatching() {
    this.watching = await this.clientService.isWatching(this.registration);
    console.log("Watching: " + this.watching);
  }

  async watch() {
    this.errorMsg = null;
    var client: Client;
    if (this.clientService.isLoggedIn) {
      const clientref: string = localStorage.getItem(this.cookieKey);
      client = await this.clientService.watchWithClientRef(clientref, this.registration).toPromise();
    } else {
      if (this.isValidateEmail(this.email)) {
        console.log("Watch with email: " + this.email);
        client = await this.clientService.watchWithEmail(this.email, this.registration).toPromise();
      } else {
        console.log("Invalid email address");
        this.errorMsg = "Invalid Email Address";
        return;
      }
    }
    if (client == undefined) {
      console.log("Error, no client returned by service");
      return;
    }
    this.setCookie(client.clientRef);
    await this.updateWatching();
    console.log("Watch successful", client);
  }

  async unwatch() {
    var client = await this.clientService.unwatch(localStorage.getItem(this.cookieKey), this.registration).toPromise();
    console.log("Unwatch successful", client);
    await this.updateWatching();
  }

  setCookie(clientRef: string) {
    localStorage.setItem(this.cookieKey, clientRef);
  }

  displayWatchToken() {
    console.log("Watch token: " + localStorage.getItem(this.cookieKey));
  }

  get isLoggedIn() {
    return this.clientService.isLoggedIn;
  }

  isValidateEmail(mail: string): boolean {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.email)) {
      return (true)
    }
    return (false)
  }

}
