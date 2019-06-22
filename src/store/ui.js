import {observable, action} from 'mobx';

class ui{
  @observable showLoginModal = false;
  @observable showSideBar = false;

  @action.bound
  openLoginModal(){
    this.showLoginModal = true
  }

  @action.bound
  closeLoginModal(){
    this.showLoginModal = false
  }

  @action.bound
  toggleSideBar() {
      this.showSideBar = !this.showSideBar
  }
}

export {ui}
