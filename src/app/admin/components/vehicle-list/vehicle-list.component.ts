import { Component, OnInit } from '@angular/core';
import { VehicleService } from '../../../shared/services/vehicle.service';
import { Vehicle } from '../../../shared/models/app.models';

@Component({
  selector: 'app-vehicle-list',
  templateUrl: './vehicle-list.component.html',
  styleUrls: ['./vehicle-list.component.scss']
})
export class VehicleListComponent implements OnInit {

  vehicles: Vehicle[];
  loading: boolean = true;
  newPrice: number;
  newPriceReg: string;

  constructor(
    private vehicleService: VehicleService
  ) { }

  async ngOnInit() {
    await this.refreshData();
  }

  async refreshData() {
    this.loading = true;
    this.vehicles = await this.vehicleService.getVehicles().toPromise();
    this.loading = false;
  }

  async updatePrice(vehicleReg: string, newPrice: number) {
    await this.vehicleService.updatePrice(vehicleReg, newPrice).toPromise();
    console.log("Price updated");
    await this.refreshData();
  }

}
