import { Component, OnInit } from '@angular/core';
import { coreQuiz } from './shared/constants';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { DialogComponent } from './dialog/dialog.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  questions = coreQuiz;
  formGroup: FormGroup;
  activeTab = [true, false, false, false, false];

  constructor(
    private formBuilder: FormBuilder,
    private dialog: MatDialog
  ) {

    this.formGroup = this.formBuilder.group({
      '0': [null, Validators.required],
      '1': [null, Validators.required],
      '2': [null, Validators.required],
      '3': [null, Validators.required],
      '4': [null, Validators.required]
    });
  }

  ngOnInit(){
    window.addEventListener('load', () => {
      // Array.from(document.getElementsByClassName('tabs__tab')).forEach((item) => {
      //   item.className = '';
      // });
      Array.from(document.getElementsByClassName('tabs__panel')).forEach((item) => {
        item.className = '';
      });
    });
  }

  tabChange(ev: any) {
    const index = ev.tabTitle.split(' ')[1] - 1;
    this.setActiveTab(index);
  }

  checkItem(index: number, item: any) {
    this.formGroup.get(index.toString()).setValue(item);
    this.setActiveTab(index + 1);
  }

  finishQuiz() {
    let points = 0;

    this.questions.forEach((item, index) => {
      if ((this.formGroup.get(index.toString()).value + 1) === item.correct) {
        points++;
      }
    });
    this.openDialog(points);
  }

  resetQuiz() {
    this.formGroup.reset();
    this.openDialog(4);
  }

  private setActiveTab(index) {
    if (index < 5) {
      for (let i = 0; i < this.activeTab.length; i++) {
        this.activeTab[i] = false;
      }
      this.activeTab[index] = true;
    }
  }

  private openDialog(points: number) {
    let title = '';
    let text = '';

    if (points === 5) {
      title = 'Você conseguiu!';
      text = 'Parabéns! Você é ótimo nesse tema, acertou todas as questões!';
    }
    if (points === 4) {
      title = 'Por pouco!';
      text = 'Legal! Você quase acertou todas as questões!';
    }
    if (points === 3) {
      title = 'Mais um pouco..';
      text = 'Quase... Mais duas e você acertava todas...';
    }
    if (points === 2) {
      title = 'Hmm...';
      text = 'Você acertou menos da metade... Mas não desista!';
    }
    if (points === 1) {
      title = 'Poxa...';
      text = 'Alguém precisa estudar mais o tema... Mas não desista!';
    }
    if (points === 0) {
      title = 'Eita...';
      text = 'Poxa, nenhuma? Vamos lá, tenta novamente...';
    }

    this.dialog.open(DialogComponent,{
      hasBackdrop: false,
      width: '250px',
      height: '300px',
      data: {title: title, text: text}
    });
  }
}
