import {observable, action} from 'mobx';

class ui{
  @observable showLoginModal = false;

  @action.bound
  openLoginModal(){
    this.showLoginModal = true
  }

  @action.bound
  closeLoginModal(){
    this.showLoginModal = false
  }
}

export {ui}
