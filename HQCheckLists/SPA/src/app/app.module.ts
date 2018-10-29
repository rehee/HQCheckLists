import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { DataService } from '../services';
import { HttpModule } from '../../node_modules/@angular/http';
import { PropertyPage } from '../pages/property/property';
import { InventoryListPage } from '../pages/inventory/inventory-list/inventory-list';
import { InventoryCreatePage } from '../pages/inventory/inventory-create/inventory-create';

@NgModule({
  declarations: [
    MyApp,
    ContactPage,
    HomePage,
    TabsPage, PropertyPage, InventoryListPage, InventoryCreatePage
  ],
  imports: [
    BrowserModule, HttpModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    ContactPage,
    HomePage,
    TabsPage, PropertyPage, InventoryListPage, InventoryCreatePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    DataService
  ]
})
export class AppModule { }
