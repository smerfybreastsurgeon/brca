const getSubtype =(er,ernum,pgr,pgrnum,her2,fish,ki67,ki67num)=>{
if(er==='negative'&&pgr==='negative'&&(her2==='0'||her2==='1+'||fish==='negative')){
return 'Triple Negative'
}else if(er==='negative'&&pgr==='negative'&&(her2==='3+'||fish==='positive')){
return 'Her2-enriched'
}else if((((er==='positive'&&ernum<20)||(pgr==='positive'&&pgrnum<20)||(er==='negative'&&pgr==='positive')||(er==='positive'&&pgr==='negative'))||(ki67num>20))&&(her2==='0'||her2==='1+'||fish==='negative')){
    return 'Luminal B negative'
}else if((((er==='positive')||(pgr==='positive'))||(ki67num>20))&&(her2==='3+'||fish==='positive')){
    return 'Luminal B positive'
}else if((er==='positive'&&ernum>19)&&(pgr==='positive'&&pgrnum>19)&&(ki67num<21)&&(her2==='0'||her2==='1+'||fish==='negative')){
       return 'Luminal A'
}return 'Her2:2+ should confirm by FISH/DISH'
}
export {getSubtype}