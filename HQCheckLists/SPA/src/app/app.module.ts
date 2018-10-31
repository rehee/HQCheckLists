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
import { HttpModule } from '@angular/http';
import { PropertyPage } from '../pages/property/property';
import { InventoryListPage } from '../pages/inventory/inventory-list/inventory-list';
import { InventoryCreatePage } from '../pages/inventory/inventory-create/inventory-create';
import { InventoryDetailPage } from '../pages/inventory/inventory-detail/inventory-detail';
import { IonicStorageModule } from '@ionic/storage';
import { UserService } from '../services/user-service';
import { LandingPage } from '../pages/publics/landing/landing';
import { Network } from '@ionic-native/network';
import { PropertyListPage } from '../pages/properties/property-list/property-list';
import { PropertycreatePage } from '../pages/properties/property-create/property-create';
@NgModule({
  declarations: [
    MyApp,
    ContactPage,
    HomePage,
    TabsPage, PropertyPage, InventoryListPage, InventoryCreatePage, InventoryDetailPage, LandingPage, PropertyListPage, PropertycreatePage
  ],
  imports: [
    BrowserModule, HttpModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(
      {
        name: '__hqchecklist_site_db',
        driverOrder: ['indexeddb', 'sqlite', 'websql']
      }
    )
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    ContactPage,
    HomePage,
    TabsPage, PropertyPage, InventoryListPage, InventoryCreatePage, InventoryDetailPage, LandingPage, PropertyListPage, PropertycreatePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    DataService, UserService, Network
  ]
})
export class AppModule { }
