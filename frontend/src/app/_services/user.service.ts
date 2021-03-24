import { Injectable, EventEmitter} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FrontEndConfig } from '../frontendConfig';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { io } from 'socket.io-client';
import { Observable } from 'rxjs';
import { Socket } from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  serverurl = this.frontendconfig.getserverurl();
  observer: any;
  socketio:Socket;

  constructor(
    public http: HttpClient,
    public frontendconfig: FrontEndConfig,
    public router: Router,
    public toast: ToastrService
    ) { 
      // this.socketio = io(this.serverurl);
    }

    public isAuthenticated() {
      const token = JSON.parse(localStorage.getItem('currentUser'));
      // Check whether the token is expired and return
      // true or false
      return token;
    }

    userLogin(loginData) { return this.http.post(this.serverurl + '/auth/local', loginData); }

    logout() {
        localStorage.removeItem('currentUser');
        this.router.navigate(['']);
    }

    createUser(user) {
    return this.http.post(this.serverurl + '/api/users/', user);
    }


    createTopicDesc(content) {
      const obj = {
        topic:content.topicControl,
        description:content.discussionControl
      }
      return this.http.post(this.serverurl + '/api/topics/', obj)
    }

    getAllTopics(){
      return this.http.get(this.serverurl + '/api/topics/');
    }
    
    createComment(comment,topicID){
      const obj = {
        topicId:topicID,
        comment:comment.replyControl
      }
      return this.http.post(this.serverurl + '/api/comments/', obj)
    }

    getAllComments(topicID){
      return this.http.get(this.serverurl + '/api/comments/' + topicID);
    }

    // socket configuration //////////////////////////////////////
taskAnyNew() {
  const observable = new Observable<any>(observer => {
    this.socketio.on('urlProcess:save', (data) => {
      console.log(data);
      observer.next(data);
    });
  });
  return observable;
}

emitfxn(id){
 this.socketio.emit('urlChk',id)
}


// create an observerable
createObservable(): Observable<number> {
  return new Observable<number>(observer => {
    this.observer = observer;
  });
}
}