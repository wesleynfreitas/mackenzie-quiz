import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { NgModule, enableProdMode } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Providers
import { HttpClientService } from './shared/http-client.service';

// Module
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';
import { TabModule } from 'angular-tabs-component';

// Component
import { AppComponent } from './app.component';
import { DialogComponent } from './dialog/dialog.component';

enableProdMode();

@NgModule({
  declarations: [
    AppComponent,
    DialogComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    SharedModule,
    TabModule,
  ],
  providers: [
    HttpClientService
  ],
  entryComponents: [
    DialogComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
