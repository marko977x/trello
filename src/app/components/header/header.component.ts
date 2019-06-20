import { Component, OnInit } from '@angular/core';
import { IconRegistryService } from 'src/app/services/icon-registry.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private iconRegistry: IconRegistryService) {
    this.registerIcons();
  }

  registerIcons() {
    this.iconRegistry.registerIcon('account-icon');
    this.iconRegistry.registerIcon('home-icon');
  }

  ngOnInit() {
  }

}