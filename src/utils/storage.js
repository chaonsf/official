export function setStore(key,value){
    if(typeof value =="object"){
        sessionStorage.setItem(key,JSON.stringify(value))
    }else{
        sessionStorage.setItem(key,value)
    }
 }
export function  getStore(key){
    let  store=sessionStorage.getItem(key)
    try {
        store=JSON.parse(store)
    } catch (error) {
         return store
    }
    return store
}

export function removeStore(key){
     sessionStorage.removeItem(key)
}