const getHospital = (h) => {
    
   
    if(h==='NMR'){
        return 'รพ.นมะรักษ์'
    }else if(h==='PTC'){
        return 'รพ.พุทธชินราช'
    }else if(h==='NRS'){
        return 'โรงพยาบาลมหาราชนครราชสีมา'
    }else if(h==='RAC'){
        return 'โรงพยาบาลราชบุรี'
    }else if(h==='VCP'){
        return 'โรงพยาบาลวชิระภูเก็ต'
    }else if(h==='VC'){
        return 'โรงพยาบาลวชิระ'
    }else if(h==='CU'){
        return 'โรงพยาบาลจุฬาลงกรณ์'
    }else if(h==='NCI'){
        return 'สถาบันมะเร็งแห่งชาติ'
    }else if(h==='SURIN'){
        return 'โรงพยาบาลสุรินทร์'
    }else if(h==='SURANARI'){
        return 'โรงพยาบาลค่ายสุรนารี'
    }else if(h==='BUMRUNG'){
        return 'โรงพยาบาลบำรุงราษฎร์'
    }return   
}

export {getHospital}
