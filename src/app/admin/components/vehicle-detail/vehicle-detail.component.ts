import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { Vehicle } from '../../../shared/models/app.models';
import { VehicleService } from '../../../shared/services/vehicle.service';

@Component({
  selector: 'app-vehicle-detail',
  templateUrl: './vehicle-detail.component.html',
  styleUrls: ['./vehicle-detail.component.scss']
})
export class VehicleDetailComponent implements OnInit {

  vehicle: Vehicle;
  registration: string;
  loading: boolean = true;
  newPrice: number;
  newPriceReg: string;

  constructor(
    private route: ActivatedRoute,
    private vehicleService: VehicleService
  ) {
    this.registration = route.snapshot.params['registration'];
  }

  async ngOnInit() {
    await this.refreshData();
  }

  async refreshData() {
    this.vehicle = await this.vehicleService.getVehicle(this.registration).toPromise();
  }

  async updatePrice(vehicleReg: string, newPrice: number) {
    await this.vehicleService.updatePrice(vehicleReg, newPrice).toPromise();
    console.log("Price updated");
    await this.refreshData();
  }

}
