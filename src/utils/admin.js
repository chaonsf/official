
export const  getScreen=()=>{
    var width = document.body.clientWidth;
    if (width >= 1200) {
        return 2; //pc
    }else{
        return 1  //mobile
    }
}