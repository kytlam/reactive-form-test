import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-field-label-ui',
  templateUrl: './field-label-ui.component.html',
  styleUrls: ['./field-label-ui.component.css']
})
export class FieldLabelUiComponent {
  @Input() label:string = "";
  @Input() showReqHint: boolean = false;

}
