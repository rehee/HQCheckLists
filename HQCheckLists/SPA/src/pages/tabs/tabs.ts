import { Component } from '@angular/core';

import { ContactPage } from '../contact/contact';
import { PropertyListPage } from '../properties/property-list/property-list';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = PropertyListPage;
  tab3Root = ContactPage;

  constructor() {

  }
}
