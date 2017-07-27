
var Wilddog = require("wilddog"); 
var config = {
  //syncURL: "https://modemcu.wilddogio.com",
  syncURL: "https://bn5.wilddogio.com",
  websocketOnly: false,
  //authDomain: "modemcu.wilddog.com"
  authDomain: "bn5.wilddog.com"
};
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
