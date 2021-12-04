import { FormGroup } from '@angular/forms';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-textbox',
  templateUrl: './textbox.component.html',
  styleUrls: ['./textbox.component.css']
})
export class TextboxComponent implements OnInit {
  @Input() fieldConfig: any;
  form:FormGroup

  constructor() { }

  ngOnInit() { }

  isValid( name: string ): boolean {
    let control = null;
    if (this.form) {
      control = this.form.get(name);
    }
    if (control) {
      return control.valid || !control.touched;
    } else {
      return true;
    }
  }
}
