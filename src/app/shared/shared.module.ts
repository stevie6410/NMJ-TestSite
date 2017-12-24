import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientService } from './services/client.service';
import { ImportService } from './services/import.service';
import { NotificationService } from './services/notification.service';
import { VehicleService } from './services/vehicle.service';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    RouterModule
  ],
  declarations: [
  ],
  providers: [
    ClientService,
    ImportService,
    NotificationService,
    VehicleService
  ]
})
export class SharedModule { }
