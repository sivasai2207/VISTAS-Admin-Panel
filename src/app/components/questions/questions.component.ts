import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray ,Validators} from '@angular/forms';
import { AuthService } from '../../shared/services/auth.service';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { AngularFireAuth } from "@angular/fire/auth";
import { Router } from "@angular/router";


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

  constructor(private fb: FormBuilder,public afs: AngularFirestore,public afAuth: AngularFireAuth,    public router: Router ) { }

  ngOnInit() {
    this.myForm = this.fb.group({
      name:['', Validators.required],
      questions: this.fb.array([])
    })

  }

  get QuestionForms() {
    return this.myForm.get('questions') as FormArray;
  }

  addQuestion() {

    const Question = this.fb.group({ 
      "questionTypeId": 1,
      "id": 1010,
      name: ['',Validators.required],
      options: this.fb.array([
        this.initOptions(),
      ]),
      // a: ['',Validators.required],
      // b: ['',Validators.required],
      // c: ['',Validators.required],
      // d: ['',Validators.required],
      // Answer :['',Validators.required],
      "questionType": {
        "id": 1,
        "name": "Multiple Choice",
        "isActive": true
      }
    })

    this.QuestionForms.push(Question);
  }

  initOptions(){
    return this.fb.group({
      "id": "a",
      A: ['', Validators.required],
      B: ['', Validators.required],
      C: ['', Validators.required],
      D: ['', Validators.required],
    })
  }

  deleteQuestion(i) {
    this.QuestionForms.removeAt(i)
  }

  async submitHandler() {
    this.loading = true;

     var formValue = this.myForm.value;


    try {
      var loggedinUser = JSON.parse(localStorage.getItem('user'));
      var userUid = loggedinUser.uid;

      console.log(formValue)
      await this.afs.collection('users').doc(userUid).collection('questions').add(formValue);
       this.router.navigate(['submission']);
      this.success = true;
      
    } catch(err) {
      console.error(err)
    }

    this.loading = false;
  }
  
  Logout(){
  return this.afAuth.auth.signOut().then(() => {
    localStorage.removeItem('user');
    this.router.navigate(['sign-in']);
  })
 }
}


