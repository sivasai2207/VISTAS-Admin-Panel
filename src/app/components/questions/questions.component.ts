import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css']
})
export class QuestionsComponent implements OnInit {
 myForm: FormGroup;
  

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.myForm = this.fb.group({

      Questions: this.fb.array([])
    })

  }

  get QuestionForms() {
    return this.myForm.get('Questions') as FormArray;
  }

  addQuestion() {

    const Question = this.fb.group({ 
      Question: [],
      A: [],
      B: [],
      C: [],
      D: [],
      Answer :[]
    })

    this.QuestionForms.push(Question);
  }

  deleteQuestion(i) {
    this.QuestionForms.removeAt(i)
  }


}


