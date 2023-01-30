import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import {
  TripPageComponent,
  TripSidebarComponent,
  TripToDoComponent,
  tripRoutes,
  TripSidebarOptionComponent,
  TripPhotosComponent,
} from '.';
import { FileSizePipe } from '../shared';
import { SharedModule } from '../shared/module/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(tripRoutes),
    SharedModule,
  ],
  declarations: [
    TripPageComponent,
    TripSidebarComponent,
    TripToDoComponent,
    TripPhotosComponent,
    TripSidebarOptionComponent,
    FileSizePipe,
  ],
  providers: [],
})
export class TripModule {}
