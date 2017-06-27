var Wilddog = require("wilddog"); 
var config = {
  syncURL: "https://modemcu.wilddogio.com",
  websocketOnly: false,
  authDomain: "modemcu.wilddog.com"
};
Wilddog.initializeApp(config);

const root = Wilddog.sync().ref();
const todos = Wilddog.sync().ref('test');

const Fb = {
  root,
  todos
};

export { Fb };
