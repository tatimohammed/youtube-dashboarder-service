import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboarderComponent } from './dashboarder/dashboarder.component';
import { DashboarderService } from './dashboarder/dashboarder.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { NgChartsModule } from 'ng2-charts'; 

@NgModule({
  declarations: [
    AppComponent, DashboarderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule, 
    FormsModule,
    NgChartsModule
  ],
  providers: [DashboarderService],
  bootstrap: [AppComponent]
})
export class AppModule { }
