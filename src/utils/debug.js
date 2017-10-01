import { authStore } from  '../store/store'

window.debug_stat = function(){
  authStore.userRef.child('STAT').once('value', snap=>{
    console.log(snap.val())
  })
}

