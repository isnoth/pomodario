export const isEmpty = (obj)=>(!!(Object.keys(obj).length===0))
export const isEmptyOrNull = (obj)=>{
  return (!obj)||(!!(Object.keys(obj).length===0))
}

