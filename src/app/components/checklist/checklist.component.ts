import { Component, OnInit } from '@angular/core';
import { IconRegistryService } from 'src/app/services/icon-registry.service';

@Component({
  selector: 'app-checklist',
  templateUrl: './checklist.component.html',
  styleUrls: ['./checklist.component.scss']
})
export class ChecklistComponent implements OnInit {

  constructor(private iconRegistry: IconRegistryService) {
    this.registerIcons();
  }

  registerIcons() {
    this.iconRegistry.registerIcon('check-box-icon');
  }

  ngOnInit() {
  }

}
