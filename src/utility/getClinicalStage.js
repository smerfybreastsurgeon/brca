

const getStage = (t,n,m) => {
    if (t?.startsWith('cT1') && n === 'cN0' && m === 'M0') 
      {
return '1A'
 }else if(t?.startsWith('cT1'||'T0')&&n==='cN1mi'&&m==='M0'){
    return '1B'
 }else if((t?.startsWith('cT1'||'T0')&&n==='cN1'&&m==='M0')||(t==='cT2'&&n==='cN0'&&m==='M0')){
    return '2A'
 }else if((t==='cT2'&&n==='cN1'&&m==='M0')||(t==='cT3'&&n==='cN0'&&m==='M0')){
    return '2B'
}else if((t&&n==='cN3'&&m==='M0')||(t&&n==='cN3a'&&m==='M0')||(t&&n==='cN3b'&&m==='M0')||(t&&n==='cN3c'&&m==='M0')){
    return '3c'
}else if((t==='cT4'&&n&&m==='M0')||(t==='cT4a'&&n&&m==='M0')||(t==='cT4b'&&n&&m==='M0')||(t==='cT4c'&&n&&m==='M0')||(t==='cT4d'&&n&&m==='M0')){
    return '3B'
} else if((t==='cT3'&&n==='cN1'&&m==='M0')||(t&&n==='cN2'&&m==='M0')||(t&&n==='cN2a'&&m==='M0')||(t&&n==='cN2b'&&m==='M0')){
    return '3A'
}else if((m==='cM1')){
    return '4'
 }return ' '
}
export {getStage}