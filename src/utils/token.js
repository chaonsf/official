const tokenKey = 'admin-token'

export function setToken(token){
    return sessionStorage.setItem(tokenKey,token)
}
export function getToken(){
     let value=sessionStorage.getItem(tokenKey)
     if(value){
         return value
     }else{
         return ''
     }
}
export function removeToken(){
    return sessionStorage.removeItem(tokenKey)
}