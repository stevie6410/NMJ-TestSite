import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VehicleListComponent } from '../admin/components/vehicle-list/vehicle-list.component';
import { HomeComponent } from './components/home/home.component';
import { AppComponent } from './app.component';
import { VehicleDetailComponent } from '../admin/components/vehicle-detail/vehicle-detail.component';

const routes: Routes = [
  {
    path: '', children: [
      { path: 'home', component: HomeComponent },
      { path: 'vehicles', component: VehicleListComponent },
      { path: 'vehicles/:registration', component: VehicleDetailComponent }
    ]
  },
];

@NgModule({
  exports: [
    RouterModule
  ],
  imports: [
    RouterModule.forRoot(routes)
  ]
})
export class AppRoutingModule {

}
