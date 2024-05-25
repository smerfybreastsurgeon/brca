const getSurgery =(s)=>{
if (s==='1'){
    return 'Breast conservative surgery'
}else if (s==='2'){
    return 'Mastectomy'
}else if (s==='3'){
    return 'Skin sparing mastectomy'
}else if (s==='4'){
    return 'Nipple sparing mastectomy'
}return
}

export {getSurgery}