import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray ,Validators} from '@angular/forms';
import { AuthService } from '../../shared/services/auth.service';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';


@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css']
})
export class QuestionsComponent implements OnInit {
 myForm: FormGroup;
 user: firebase.User;

  // Form state
  loading = false;
  success = false;

  constructor(private fb: FormBuilder,public afs: AngularFirestore) { }

  ngOnInit() {
    this.myForm = this.fb.group({
      examname:['', Validators.required],
      Questions: this.fb.array([])
    })

  }

  get QuestionForms() {
    return this.myForm.get('Questions') as FormArray;
  }

  addQuestion() {

    const Question = this.fb.group({ 
      "questionTypeId": 1,
      Question: ['',Validators.required],
      A: ['',Validators.required],
      B: ['',Validators.required],
      C: ['',Validators.required],
      D: ['',Validators.required],
      Answer :['',Validators.required]
    })

    this.QuestionForms.push(Question);
  }

  deleteQuestion(i) {
    this.QuestionForms.removeAt(i)
  }

  async submitHandler() {
    this.loading = true;

     var formValue = this.myForm.value;


    try {

      console.log(formValue)
      await this.afs.collection('users').doc(this.user.uid).collection('questions').add(formValue);
      this.success = true;
    } catch(err) {
      console.error(err)
    }

    this.loading = false;
  }

}


