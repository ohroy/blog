let Filter={
    date_format(utc){
        let pad_left=(t)=>{
            return ('0'+t).slice(-2);
        }
        let date2 = new Date(utc);     //这步是关键
        let year = date2.getFullYear();
        let mon = date2.getMonth()+1;
        let day = date2.getDate();
        let hour = date2.getHours();
        let min = date2.getMinutes();
        let dateStr = year+'-'+pad_left(mon)+'-'+pad_left(day)+' '+pad_left(hour)+':'+pad_left(min);
        return dateStr;
    }
}

export default Filter