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
import { TripPhotosListComponent } from './trip-photos-list/trip-photos-list.component';
import { TripPhotoComponent } from './trip-photo/trip-photo.component';
import { TripPhotoFullViewComponent } from './trip-photo-full-view/trip-photo-full-view.component';

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
    TripPhotosListComponent,
    TripPhotoComponent,
    TripPhotoFullViewComponent,
  ],
  providers: [],
})
export class TripModule {}
