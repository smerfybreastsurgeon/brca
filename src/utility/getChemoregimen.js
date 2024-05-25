const getChemoregimen = (h) => {
    
   
    if(h==='0'){
        return `ACx4q3wks→weekly paclitaxel x12`
    }else if(h==='1'){
        return 'ACx4q3wks→paclitaxel q 3wks x4'
    }else if(h==='2'){
        return 'ACx4dd→weekly paclitaxel x12'
    }else if(h==='3'){
        return 'dd ACx4→dd paclitaxel q 2 wks x4'
    }else if(h==='4'){
        return 'ACx4'
    }else if(h==='5'){
        return 'TCx4'
    }else if(h==='6'){
        return 'CMFx6'
    }else if(h==='7'){
        return 'FACx6'
    }else if(h==='8'){
        return 'Capecitabine'
    }else if(h==='9'){
        return 'Other'
    }return   
}

export {getChemoregimen}



 

 

 