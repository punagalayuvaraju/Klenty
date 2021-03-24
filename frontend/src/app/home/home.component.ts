import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  userinfo:any;
  disscussionForm: FormGroup;
  replyForm: FormGroup;
  allTopicsList = [];
  allComments = [];
  enableComments = false;
  constructor(private formbuilder: FormBuilder,public userservc:UserService,private spinner:NgxSpinnerService,private router:Router,private toast:ToastrService) { }

  ngOnInit() {
    this.disscussionForm = this.formbuilder.group({
      topicControl:[null,Validators.compose([Validators.required])],
      discussionControl:[null, Validators.compose([Validators.required])]
    })
    this.replyForm = this.formbuilder.group({
      replyControl: [null, Validators.compose([Validators.required])]
    })
    this.getCurrentUser();
    this.getAllTopics();
  }

  get formControls() { return this.disscussionForm.controls; }
  get replyControls() { return this.replyForm.controls; }


  getCurrentUser(){
    this.userinfo = null;
    this.userinfo = JSON.parse(localStorage.getItem('currentUser'));
  }

  getAllTopics(){
    this.allTopicsList = [];
    this.userservc.getAllTopics().subscribe((data: any) => {
      this.allTopicsList = data && data.length ? data : [];
      this.allTopicsList.forEach(element => {
        element.isOpen = false;
      });
      console.log(this.allTopicsList);
    })
  }

  changeisOpen(id, value) {
    for (var i in this.allTopicsList) {
      if (this.allTopicsList[i]._id == id) {
        this.allTopicsList[i].isOpen = value;
      } else {
        this.allTopicsList[i].isOpen = false;
      }
    }
 }

  enableCommentsfxn(event,topic){
    console.log(topic._id)
    event.stopPropagation();
    topic.isOpen = !topic.isOpen
    this.changeisOpen(topic._id,topic.isOpen);
     if(topic.isOpen) {
       this.spinner.show();
      this.allComments = [];
      this.spinner.hide();
      this.userservc.getAllComments(topic._id).subscribe((data: any) => {
        this.allComments = data && data.length ? data : [];
        console.log(this.allComments);
        this.spinner.hide();
      }, err => {
        this.spinner.hide();
      })
     }
  }

  logout(event) {
    event.stopPropagation();
     this.userservc.logout();
     this.userinfo = null;
  }

  createTopic(event){
    event.stopPropagation();
   if(this.disscussionForm.valid){
     this.spinner.show();
    this.userservc.createTopicDesc(this.disscussionForm.value).subscribe((data:any) => {
      console.log(data);
      if (data && data.message) {
        this.toast.success(data.message);
        this.disscussionForm.reset();
      } else {
        this.toast.error('Failed to add Topic and Discussion !!!');
      }
      this.spinner.hide();
    }, err => {
      this.toast.error('Failed to add Topic and Discussion !!!');
      this.spinner.hide();
    })
   }
  }

  replyTopic(event,topicId) {
    event.stopPropagation();
    if(this.replyForm.valid && this.userinfo && this.userinfo.firstname){
      console.log(this.replyForm.value)
      this.userservc.createComment(this.replyForm.value, topicId).subscribe((data: any) => {
        console.log(data);
        if (data && data.message) {
          this.toast.success(data.message);
          this.replyForm.reset();
        } else {
          this.toast.error('Failed to Comment !!!');
        }
        this.spinner.hide();
      }, err => {
        this.spinner.hide();
        this.toast.error('Failed to Comment !!!');
      })
    } else {
      this.toast.warning('Please login to Comment');
    }
  }


  gotoLogin() {
    this.router.navigate(['login'])
  }
}
