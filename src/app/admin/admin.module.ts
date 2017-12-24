import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from "@angular/forms";
import { RouterModule } from '@angular/router';

import { SharedModule } from '../shared/shared.module';
import { VehicleListComponent } from './components/vehicle-list/vehicle-list.component';
import { VehicleDetailComponent } from './components/vehicle-detail/vehicle-detail.component';
import { ClientModule } from '../client/client.module';

@NgModule({
  imports: [
    RouterModule,
    CommonModule,
    SharedModule,
    FormsModule,
    ClientModule
  ],
  exports: [
    VehicleListComponent,
    VehicleDetailComponent
  ],
  declarations: [
    VehicleListComponent,
    VehicleDetailComponent
  ],
  providers: [
  ]
})
export class AdminModule { }
