'use strict';

import { Component, OnInit } from '@angular/core';
import { coreQuiz, coreAlert } from './shared/constants';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { DialogComponent } from './dialog/dialog.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  questions = coreQuiz;
  pointsAlert = coreAlert;
  formGroup: FormGroup;
  activeTab = [true, false, false, false, false];

  constructor(
    private formBuilder: FormBuilder
  ) {

    for (let i = 0; i < this.questions.length; i++) {
      if (!this.formGroup) {
        this.formGroup = this.formBuilder.group({
          '0': [null, Validators.required]
        });
        continue;
      }
      this.formGroup.addControl(i.toString(), new FormControl(null, Validators.required));
    }
  }

  ngOnInit() {

    window.addEventListener('load', () => {
      Array.from(document.getElementsByClassName('tabs__tab-bar')).forEach((item) => {
        item.className = '';
      });
      Array.from(document.getElementsByClassName('tabs__panel')).forEach((item) => {
        item.className = '';
      });
    });
  }

  tabChange(ev: any) {

    const index = ev.tabTitle.split(' ')[1] - 1;
    this.setActiveTab(index);
  }

  checkItem(index: number, qIndex: number) {

    this.formGroup.get(index.toString()).setValue(qIndex);
    this.setActiveTab(index + 1);
  }

  finishQuiz() {

    let points = 0;

    this.questions.forEach((item, index) => {
      if ((this.formGroup.get(index.toString()).value) === item.correctIndex) {
        points++;
      }
    });
    this.openDialog(points);
  }

  resetQuiz() {
    this.formGroup.reset();
    this.setActiveTab(0);
  }

  private setActiveTab(index: number) {

    if (index < this.questions.length) {
      for (let i = 0; i < this.activeTab.length; i++) {
        this.activeTab[i] = false;
      }
      this.activeTab[index] = true;
    }
  }

  private openDialog(points: number) {

    const alert = this.pointsAlert.find(x => x.point === points);
    document.getElementById('modal-title').innerText = alert.title + ` Você fez ${points} ponto(s)`;
    document.getElementById('modal-body').innerText = alert.text;
  }
}
