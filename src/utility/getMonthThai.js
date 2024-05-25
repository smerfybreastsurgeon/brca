

const getMonthThai = (d) => {
    const date=new Date(d)
   
    if(date.getMonth()===0){
        return 'มกราคม'
    }else if(date.getMonth()===1){
        return 'กุมภาพันธ์'
    }else if(date.getMonth()===2){
        return 'มีนาคม'
    }else if(date.getMonth()===3){
        return 'เมษายน'
    }else if(date.getMonth()===4){
        return 'พฤษภาคม'
    }else if(date.getMonth()===5){
        return 'มิถุนายน'
    }else if(date.getMonth()===6){
        return 'กรกฎาคม'
    }else if(date.getMonth()===7){
        return 'สิงหาคม'
    }else if(date.getMonth()===8){
        return 'กันยายน'
    }else if(date.getMonth()===9){
        return 'ตุลาคม'
    }else if(date.getMonth()===10){
        return 'พฤศจิกายน'
    }else if(date.getMonth()===11){
        return 'ธันวาคม'
    }  
}

export {getMonthThai}