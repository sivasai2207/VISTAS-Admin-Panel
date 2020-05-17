import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray ,Validators} from '@angular/forms';
import { AuthService } from '../../shared/services/auth.service';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { AngularFireAuth } from "@angular/fire/auth";
import { Router } from "@angular/router";


@Component({
  selector: 'app-submission',
  templateUrl: './submission.component.html',
  styleUrls: ['./submission.component.css']
})
export class SubmissionComponent implements OnInit {

  constructor(  private router: Router, private auth:AuthService ) { }

  ngOnInit(): void {
  }
  
  Logout(){
    this.auth.SignOut();
  
  }

}
