import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Camera } from '@ionic-native/camera';
import { DataService } from '../services';
import { HttpModule } from '@angular/http';
import { InventoryListPage } from '../pages/inventory/inventory-list/inventory-list';
import { InventoryCreatePage } from '../pages/inventory/inventory-create/inventory-create';
import { InventoryDetailPage } from '../pages/inventory/inventory-detail/inventory-detail';
import { IonicStorageModule } from '@ionic/storage';
import { UserService } from '../services/user-service';
import { LandingPage } from '../pages/publics/landing/landing';
import { Network } from '@ionic-native/network';
import { PropertyListPage } from '../pages/properties/property-list/property-list';
import { PropertycreatePage } from '../pages/properties/property-create/property-create';
import { SDHCPostCom } from '../components/sdhc-post/sdhc-post';
import { SDHCItemCom } from '../components/sdhc-item/sdhc-item';
import { SDHCInputTextCom } from '../components/sdhc-input/sdhc-input-text/sdhc-input-text';
import { SDHCInputTextAreaCom } from '../components/sdhc-input/sdhc-input-textarea/sdhc-input-textarea';
import { SDHCInputNumberCom } from '../components/sdhc-input/sdhc-input-number/sdhc-input-number';
import { SDHCInputFileCom } from '../components/sdhc-input/sdhc-input-file/sdhc-input-file';
import { SDHCInputDropDownCom } from '../components/sdhc-input/sdhc-input-dropdown/sdhc-input-dropdown';
import { SDHCInputDateTimeCom } from '../components/sdhc-input/sdhc-input-datetime/sdhc-input-datetime';
import { SDHCInputBoolCom } from '../components/sdhc-input/sdhc-input-bool/sdhc-input-bool';
import { ReservationDetailPage, ReservationListPage, ReservationMaintainPage } from '../pages/reservation/index';
import { CleanPictureDetailPage, CleanerJobCheckPicturesPage, CleanerJobCheckPicturePage, CleanerJobCheckRoomPage, CleanerJobUpdatePage, CleanerJobDetailPage, CleanCleanerJobsPage, CleaningDetailPage, CleaningListPage, CleaningMaintainPage, CleanItemListPage, CleanItemMaintainPage, CleanItemDetailPage } from '../pages/cleaning/index';
import { HqSelectCom } from '../components/hq-inputs/hq-select/hq-select';
import { LogOffPage } from '../pages/publics/log-off/log-off';
import { HQImagePipe } from '../pipes/image-pipe';
import { CameraMock } from '../config/mocks/camera-mock';
import { HQCleanerCheck, HQCleanerInventory } from '../components/hq-inputs';
import { ImageService } from '../services/image-service';
import { HQTimeSpendPipe } from '../pipes/time-spend-pipe';
import { CleaningReservePipe } from '../pipes/cleaning-reserve-pipe';
import { IonicImageViewerModule } from 'ionic-img-viewer';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { SocialSharing } from '@ionic-native/social-sharing';
import { PhotoLibrary } from '@ionic-native/photo-library';
import { ReservationSelectPage } from '../pages/reservation/reservation-select/reservation-select';
import { CleaningStatusPipe } from '../pipes/cleaning-status-pipe';
import { HQUserePipe } from '../pipes/hq-user-pipe';
@NgModule({
  declarations: [
    MyApp,
    ContactPage, LogOffPage,
    HomePage,
    TabsPage, InventoryListPage, InventoryCreatePage, InventoryDetailPage, LandingPage, PropertyListPage, PropertycreatePage,
    HQCleanerInventory, HQCleanerCheck, SDHCInputBoolCom, SDHCInputDateTimeCom, SDHCPostCom, SDHCItemCom, SDHCInputTextCom, SDHCInputTextAreaCom, SDHCInputNumberCom, SDHCInputFileCom, SDHCInputDropDownCom,
    ReservationSelectPage, ReservationDetailPage, ReservationListPage, ReservationMaintainPage,
    CleanPictureDetailPage, CleanerJobCheckPicturesPage, CleanerJobCheckPicturePage, CleanerJobCheckRoomPage, CleanerJobUpdatePage, CleanerJobDetailPage, CleanCleanerJobsPage, CleaningDetailPage, CleaningListPage, CleaningMaintainPage, CleanItemListPage, CleanItemMaintainPage, CleanItemDetailPage,
    HqSelectCom,
    HQUserePipe, CleaningStatusPipe, HQImagePipe, HQTimeSpendPipe, CleaningReservePipe
  ],
  imports: [
    BrowserModule, HttpModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(
      {
        name: '__hqchecklist_site_db',
        driverOrder: ['indexeddb', 'sqlite', 'websql']
      }
    ), IonicImageViewerModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    ContactPage, LogOffPage,
    HomePage,
    TabsPage, InventoryListPage, InventoryCreatePage, InventoryDetailPage, LandingPage, PropertyListPage, PropertycreatePage,
    SDHCInputBoolCom, SDHCInputDateTimeCom, SDHCPostCom, SDHCItemCom, SDHCInputTextCom, SDHCInputTextAreaCom, SDHCInputNumberCom, SDHCInputFileCom, SDHCInputDropDownCom,
    ReservationSelectPage, ReservationDetailPage, ReservationListPage, ReservationMaintainPage,
    CleanPictureDetailPage, CleanerJobCheckPicturesPage, CleanerJobCheckPicturePage, CleanerJobCheckRoomPage, CleanerJobUpdatePage, CleanerJobDetailPage, CleanCleanerJobsPage, CleaningDetailPage, CleaningListPage, CleaningMaintainPage, CleanItemListPage, CleanItemMaintainPage, CleanItemDetailPage,
    HqSelectCom,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    DataService, UserService, Network, { provide: Camera, useClass: CameraMock }, ImageService, InAppBrowser, SocialSharing,
    PhotoLibrary
  ]
})
export class AppModule { }
