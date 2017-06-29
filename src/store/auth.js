import {observable } from 'mobx';
import {todoStore} from './store';
import {Fb} from './firebase';

//wilddog.auth().signInWithEmailAndPassword(123, 123)

class auth{
  @observable authState = null;
  @observable userRef = null;

  constructor(){
    Fb.Wilddog.auth().onAuthStateChanged((state)=>{
      console.log('onAuthStateChanged', state)
      this.authState = state
      if(state){
        //update ref
        this.userRef = Fb.root.child('notes/users/'+state.uid)
        todoStore.startListernining()
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
