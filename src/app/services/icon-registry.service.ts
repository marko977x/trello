import { Injectable } from '@angular/core';
import { MatIconRegistry } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class IconRegistryService {

  constructor(private iconRegistry: MatIconRegistry, private sanitizer: DomSanitizer) {}

  registerIcon(iconName: string) {
    this.iconRegistry.addSvgIcon(
      iconName,
      this.sanitizer.bypassSecurityTrustResourceUrl('../../assets/' + iconName + '.svg'));
  }
}

export const CLOSE_ICON: string = "close-icon";
export const ACCOUNT_ICON: string = "account-icon";
export const CARD_ICON: string = "card-icon";
export const CHECKBOX_ICON: string = "check-box-icon";
export const CHECKED_ICON: string = "checked-icon";
export const DELETE_ICON: string = "delete-icon";
export const DESCRIPTION_ICON: string = "description-icon";
export const HOME_ICON: string = "home-icon";
export const MOVE_ICON: string = "move-icon";
export const PLUS_ICON: string = "plus-icon";
export const UNCHECK_ICON: string = "uncheck-icon";