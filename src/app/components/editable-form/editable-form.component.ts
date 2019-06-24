import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { IconRegistryService, CLOSE_ICON } from 'src/app/services/icon-registry.service';

@Component({
  selector: 'app-editable-form',
  templateUrl: './editable-form.component.html',
  styleUrls: ['./editable-form.component.scss']
})
export class EditableFormComponent implements OnInit {
  inputTextValue: string;
  closeIcon: string = CLOSE_ICON;
  
  @Input()
  inputDefaultValue: string;
  @Input()
  placeholderValue: string;
  @Output()
  submitButtonClickedEvent: EventEmitter<string> = new EventEmitter<string>();
  @Output()
  closeButtonClickedEvent: EventEmitter<void> = new EventEmitter<void>();

  constructor(private iconRegistry: IconRegistryService) { }

  ngOnInit() {
    this.iconRegistry.registerIcon(CLOSE_ICON);
  }

  onItemTextChange(event) {
    this.inputTextValue = event.target.value;
  }

  submitButtonClicked() {
    this.submitButtonClickedEvent.emit(this.inputTextValue);
  }

  closeButtonClicked() {
    this.closeButtonClickedEvent.emit();
    this.inputTextValue = "";
  }

}
