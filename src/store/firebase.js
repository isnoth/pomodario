var Wilddog = require("wilddog");

var config

if('development' === process.env.NODE_ENV){
  config = {
    syncURL: "https://bn5.wilddogio.com",
    websocketOnly: false,
    authDomain: "bn5.wilddog.com"
  }
}else{
  config = {
    syncURL: "https://bn5s.wilddogio.com",
    websocketOnly: false,
    authDomain: "bn5s.wilddog.com"
  }
}

Wilddog.initializeApp(config);

const root = Wilddog.sync().ref();


const todos = Wilddog.sync().ref('test');

window.wilddog = Wilddog
window.todos = todos
window.rootRef = root

const Fb = {
  Wilddog,
  root,
  todos
};


export { Fb };
