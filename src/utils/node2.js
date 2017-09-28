export function getChildren(key, obj){
}

export function getParent( key, obj ){
  let fnd = Object.keys(obj).filter(i=>{
    let children = obj[i].children
    return children&&children.indexOf(key)>-1
  })

  return fnd?fnd[0]:null
}

export function getRootPath(key, obj){
  let paths = []

  let path = key
  //paths.push(path)
  if (!getParent(path, obj)){
    return []
  }

  while (path && path!=="root"){
    path = getParent(path, obj)
    paths.push(path)
  }
  return paths.reverse()
}

export function getRootPathAndContent(key, obj){
  const rootPath = getRootPath(key, obj)
  if (rootPath.length){
    return getRootPath(key, obj)
      .map(i=>({id:i, content:i==='root'?'Home':obj[i].content}))
      .concat([{id: key, content:obj[key].content}])
  }else{
    return [ {id: 'root', content: 'Home'} ]
  }
}

export function nodeGetAllChildrenId(key, obj){
  let children = obj[key].children

  if (children){
    obj[key].children.forEach(i=>{
      children = children.concat(nodeGetAllChildrenId(i, obj))
    })
    return children
  }else{
    return []
  }
}

export function nodeSibling(key, obj){
  const parent = getParent(key, obj)
  const parentChildren = obj[parent].children
  let index = parentChildren.indexOf(key);
  if (index <parentChildren.length-1)
    return parentChildren[index+1]
  else
    return null
}

export function nodePrevSibling(key, obj){
  const parent = getParent(key, obj)
  const parentChildren = obj[parent].children
  let index = parentChildren.indexOf(key);
  if (index >0)
    return parentChildren[index-1]
  else
    return null
}

export function nodeGetFirstChild(key, obj){
  const children = obj[key].children
  return children?children[0]:null
}



export function getUniqueId() {
  function randomString(length, chars) {
    var result = '';
    for (var i = length; i > 0; --i) result += chars[Math.round(Math.random() * (chars.length - 1))];
    return result;
  }
  // TODO: Replace with Firebase.ServerValue.TIMESTAMP.
  // Add BN here to prevent the css selector error.
  return "BN-" + new Date().getTime().toString() + "-" + randomString(5, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ');
}



export function initLayout(content, cNodeKey){
  if (content[cNodeKey].children){
    let lg = content[cNodeKey].children.map((i, index)=>{
      return {i: i, x: 5*index, y:5, w:5, h:5}
    })


    let xs = content[cNodeKey].children.map((i, index)=>{
      return {i: i, x: 5*index, y:5, w:5, h:5}
    }) 
    return {lg: lg, xs:xs}
  }
}
