export function fetchAllFromRef(limit=10, ref, tapFn=({length})=>{}){
  let nodes = {}
  return fetch(ref, 0)

  function fetch(ref, key=null){

    return new Promise((resolve, reject)=>{
      if(key){

        ref.orderByKey()
        .startAt(key)
        .limitToFirst(limit)
        .once('value', (snapshot) => {
          let val = snapshot.val()
          resolve(val)
        });
      } else{
        ref.orderByKey()
        .limitToFirst(limit)
        .once('value', (snapshot) => {
          let val = snapshot.val()
          resolve(val)
        });

      }
    })
    .then(val=>{
      nodes = Object.assign(nodes, val)
      tapFn({length: Object.keys(nodes).length})

      if (Object.keys(val).length === limit){
        console.log('fetch once', val)
        let lastKey = Object.keys(val).reverse()[0]
        console.log('lastKey:', lastKey)

        return fetch(ref, lastKey)
      }else{
        return Promise.resolve(nodes)
      }
    })
  }
}
