import { Injectable, EventEmitter } from '@angular/core';    
import { Subscription } from 'rxjs/internal/Subscription';   

@Injectable({
  providedIn: 'root'
})
export class EventEmmitterService {

  constructor() { }

  countLikesFunction= new EventEmitter();
  subsVar : Subscription;


callCountLikes (likes:any){

this.countLikesFunction.emit(likes);
}





}
