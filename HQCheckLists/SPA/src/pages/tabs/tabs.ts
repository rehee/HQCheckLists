import { Component } from '@angular/core';

import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';
import { PropertyPage } from '../property/property';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = PropertyPage;
  tab3Root = ContactPage;

  constructor() {

  }
}
