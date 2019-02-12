import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MapComponent } from './map.component';
import { AgmCoreModule } from '@agm/core';
import {CamelizePipe} from 'ngx-pipes';

import { MapService } from './map.service';

@NgModule({
  declarations: [
    MapComponent
  ],
  exports: [
    MapComponent
  ],
  imports: [
    CommonModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDsZMWDbvygHPS5QPxBJEodT6SJafTn4Z8'
    })
  ],
  providers: [MapService, CamelizePipe],
  schemas:  [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class MapModule { }
