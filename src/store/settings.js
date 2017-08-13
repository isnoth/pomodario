import {observable, computed, toJS} from 'mobx';

const { map }  =  observable;

class settings{
  @observable setting = map({vim: true});

  @computed get json() {
    return toJS(this.setting)
  }
}

export {settings}

