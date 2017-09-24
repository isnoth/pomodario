import {observable, action} from 'mobx';
import {todoStore, noteStore, uiStore} from './store';
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

  @action.bound
  login(usr, pwd){
    Fb.Wilddog.auth().signInWithEmailAndPassword(usr, pwd)
    .then(res=>{
      console.log('auth!!')
      uiStore.closeLoginModal()
    })
    .catch(err=>{
      console.log(err)
    })
  }

  @action.bound
  logout(){
    Fb.Wilddog.auth().signOut()
  }
}

export {auth}
