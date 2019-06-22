import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { IconRegistryService } from 'src/app/services/icon-registry.service';

@Component({
  selector: 'app-editable-form',
  templateUrl: './editable-form.component.html',
  styleUrls: ['./editable-form.component.scss']
})
export class EditableFormComponent implements OnInit {
  inputTextValue: string;
  
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
    this.iconRegistry.registerIcon('close-icon');
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
