const getPStage = (t,n,m) => {
    if((t==='pTis(DCIS)'||t==='pT0')&&n==='pN0'&&m==='M0'){
   return '0'
    }else if((t==='pT1'||t==='pT1mi'||t==='pT1a'||t==='pT1b'||t==='pT1c')&&n==='pN0'&&m==='M0'){
        return '1A'
     }else if((t==='pT1'||t==='pT1mi'||t==='pT1a'||t==='pT1b'||t==='pT1c'||t==='pTis(DCIS)')&&n==='pN1mi'&&m==='M0'){
        return '1B'
     }else if(((t==='pT1'||t==='pT1mi'||t==='pT1a'||t==='pT1b'||t==='pT1c'||t==='pTis(DCIS)')&&(n==='pN1'||n==='pN1a'||n==='pN1b'||n==='pN1c')&&m==='M0')||(t==='pT2'&&n==='pN0'&&m==='M0')){
       return '2A'
    }else if((t==='pT2'&&(n==='pN1'||n==='pN1mi'||n==='pN1a'||n==='pN1b'||n==='pN1c')&&m==='M0')||(t==='pT3'&&n==='pN0'&&m==='M0')){
       return '2B'
   }else if((t&&n==='pN3'&&m==='M0')||(t&&n==='pN3a'&&m==='M0')||(t&&n==='pN3b'&&m==='M0')||(t&&n==='pN3c'&&m==='M0')){
       return '3C'
   }else if((t==='pT4'&&n&&m==='M0')||(t==='pT4a'&&n&&m==='M0')||(t==='pT4b'&&n&&m==='M0')||(t==='pT4c'&&n&&m==='M0')||(t==='pT4d'&&n&&m==='M0')){
       return '3B'
   } else if((t==='pT3'&&(n==='pN1'||n==='pN1mi'||n==='pN1a'||n==='pN1b'||n==='pN1c')&&m==='M0')||(t&&n==='pN2'&&m==='M0')||(t&&n==='pN2a'&&m==='M0')||(t&&n==='pN2b'&&m==='M0')){
       return '3A'
   }else if((t&&n&&m==='pM1')){
       return '4'
    }return ' '
   }
   export {getPStage}