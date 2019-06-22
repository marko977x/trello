import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-simple-modal',
  templateUrl: './simple-modal.component.html',
  styleUrls: ['./simple-modal.component.scss']
})
export class SimpleModalComponent implements OnInit {
  inputValue: string;
  
  @Input()
  placeholder: string;
  @Output()
  OnCancel: EventEmitter<void> = new EventEmitter<void>();
  @Output()
  OnSubmit: EventEmitter<string> = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {
  }

  onCancelClicked() {
    this.OnCancel.emit();
  }

  onSubmitClicked() {
    this.OnSubmit.emit(this.inputValue);
  }

  onInputChange(event) {
    this.inputValue = event.target.value;
  }

}
