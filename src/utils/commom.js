//表单序列化
export const serialize = data => {
    let list = [];
    Object.keys(data).forEach(ele => {
        list.push(`${ele}=${data[ele]}`)
    })
    return list.join('&');
};
export const padDate=(value)=>{
    return value < 10 ? '0' + value : value;
}
export const today=()=>{
    var date = new Date();
    var year = padDate(date.getFullYear());
    var month = padDate(date.getMonth()+1);
   var day = padDate(date.getDate());
   var todayTime = year + '-' + month + '-' + day
   var oldyear
   if(month!=12){
       month=padDate(date.getMonth()+2)
        oldyear=year-1+'-'+month+'-01'
   }else{
        oldyear=year+'-01-01'
   }
  return {todayTime,oldyear}
}