import { Component, OnInit } from '@angular/core';
import { MatIconRegistry } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
    iconRegistry.addSvgIcon('home-icon', sanitizer.bypassSecurityTrustResourceUrl('../../assets/home-icon.svg'));
    iconRegistry.addSvgIcon('account-icon', sanitizer.bypassSecurityTrustResourceUrl('../../assets/account-icon.svg'));
  }

  ngOnInit() {
  }

}
