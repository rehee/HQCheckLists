import { Component } from '@angular/core';

import { ContactPage } from '../contact/contact';
import { PropertyListPage } from '../properties/property-list/property-list';
import { LandingPage } from '../publics/landing/landing';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = PropertyListPage;
  tab2Root = ContactPage;
  tab3Root = LandingPage;

  constructor() {

  }
}
