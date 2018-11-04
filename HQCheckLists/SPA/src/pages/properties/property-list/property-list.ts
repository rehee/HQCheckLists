import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { DataService } from '../../../services';
import { Property } from '../../../models';
import { PropertycreatePage } from '../property-create/property-create';
import { InventoryListPage } from '../../inventory/inventory-list/inventory-list';
import { ReservationListPage } from '../../reservation';
import { CleaningListPage } from '../../cleaning';

@Component({
  selector: 'page-property-list',
  templateUrl: 'property-list.html'
})
export class PropertyListPage {
  Properties: Property[] = [];
  constructor(public navCtrl: NavController, private ds: DataService) {

  }
  async Init() {
    let result = await this.ds.PropertyGetAll();
    if (result == null || result.Success == false) {
      return;
    }
    this.Properties = result.Data.map(b => b);
  }
  Create() {
    this.navCtrl.push(PropertycreatePage);
  }

  Edit(p: Property) {
    this.navCtrl.push(PropertycreatePage, { PropertyId: p.Id });
  }
  ionViewWillEnter() {
    this.Init();
  }
  GoToInventory(propertyId: string) {
    this.navCtrl.push(InventoryListPage, { propertyId: propertyId });
  }
  GoToReservation(propertyId: string) {
    this.navCtrl.push(ReservationListPage, { propertyId: propertyId });
  }
  GoToCleaning(propertyId: string) {
    this.navCtrl.push(CleaningListPage, { propertyId: propertyId });
  }
}
