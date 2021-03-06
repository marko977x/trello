import { Component, OnInit, Input } from '@angular/core';
import { IconRegistryService, DESCRIPTION_ICON, CLOSE_ICON } from 'src/app/services/icon-registry.service';
import { Card } from 'src/app/models/card';
import { Store } from '@ngrx/store';
import { RootState } from 'src/app/root-store/root-state';
import { SaveDescription } from 'src/app/root-store/card-store/actions';

@Component({
  selector: 'app-card-description',
  templateUrl: './card-description.component.html',
  styleUrls: ['./card-description.component.scss']
})

export class CardDescriptionComponent implements OnInit {
  isEditableFormVisible: boolean;
  closeIcon: string;
  descriptionIcon: string;
  descriptionValue: string;
  defaultDescriptionValue: string = "Add a more detailed description";

  @Input()
  card: Card;

  constructor(private iconRegistry: IconRegistryService, private store$: Store<RootState>) {
    this.registerIcons();
  }

  registerIcons() {
    this.iconRegistry.registerIcon(DESCRIPTION_ICON);
    this.iconRegistry.registerIcon(CLOSE_ICON);
  }

  ngOnInit() {
    this.isEditableFormVisible = false;
    this.closeIcon = CLOSE_ICON;
    this.descriptionIcon = DESCRIPTION_ICON;
    this.descriptionValue = this.card.description;
  }

  changeFocusToEditableForm() {
    this.isEditableFormVisible = true;
  }

  hideEditableForm() {
    this.isEditableFormVisible = false;
  }

  onDescriptionChange(event) {
    this.descriptionValue = event.target.value;
  }

  onEditableFormClose() {
    this.descriptionValue = this.card.description;
    this.hideEditableForm();
  }

  saveDescription() {
    this.store$.dispatch(new SaveDescription(this.card.id, this.descriptionValue));
    this.hideEditableForm();
  }

  getDescriptionValue() {
    return this.card.description === "" ? 
      this.defaultDescriptionValue : this.card.description;
  }

}
