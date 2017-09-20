
function getElementsByClassName(classname){
  return document.getElementsByClassName(classname)
}

//add tooltip

document.body.addEventListener('keydown', (evt)=>{
  if (evt.key == '~'){
    console.log('~'); 
    getElementsByClassName('tree-node__body')
  }
})
