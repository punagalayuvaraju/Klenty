import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  userinfo:any;
  disscussionForm: FormGroup;
  constructor(private formbuilder: FormBuilder,public userservc:UserService,private spinner:NgxSpinnerService,private router:Router) { }

  ngOnInit() {
    this.disscussionForm = this.formbuilder.group({
      topicControl:[null,Validators.compose([Validators.required])],
      discussionControl:[null, Validators.compose([Validators.required])]
    })
    this.userinfo = null;
    this.userinfo = JSON.parse(localStorage.getItem('currentUser'));
  }

  get formControls() { return this.disscussionForm.controls; }


  logout(event) {
    event.stopPropagation();
     this.userservc.logout();
     this.userinfo = null;
  }

  createTopic(event){
    event.stopPropagation();
   if(this.disscussionForm.valid){
    console.log(this.disscussionForm.value);
   }
  }


  gotoLogin() {
    this.router.navigate(['login'])
  }
}
