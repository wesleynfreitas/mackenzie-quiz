import { Component, OnInit, Input, Inject } from '@angular/core';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent {

  @Input('title') title = '';
  @Input('text') text = '';

  constructor(

  ) { }
}
