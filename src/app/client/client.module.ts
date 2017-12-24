import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from "@angular/forms";
import { SharedModule } from '../shared/shared.module';
import { WatchComponent } from './components/watch/watch.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    FormsModule
  ],
  exports: [
    WatchComponent
  ],
  declarations: [
    WatchComponent
  ]
})
export class ClientModule { }
