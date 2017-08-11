import {observable } from 'mobx';
import {todoStore, noteStore} from './store';
import {Fb} from './firebase';

class auth{
  @observable authState = null;
  @observable userRef = null;

  constructor(){
    this.listerningAuthState()
  }

  listerningAuthState(){
    Fb.Wilddog.auth().onAuthStateChanged((state)=>{
      console.log('onAuthStateChanged', state)
      this.authState = state
      if(state){
        //update profile/ref
        this.userRef = Fb.root.child('notes/users/'+state.uid)
        //todoStore.startListernining()
        todoStore.fetchAllPomodarios()
        noteStore.fetchAllPomodarios()
      }
    })
  }

  login(usr, pwd){
    Fb.Wilddog.auth().signInWithEmailAndPassword(usr, pwd)
    .then(res=>{
      console.log('auth!!')
    })
    .catch(err=>{
      console.log(err)
    })
  }

  logout(){
    Fb.Wilddog.auth().signOut()
  }
}

export {auth}
