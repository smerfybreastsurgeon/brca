import { getMonthThai } from "./getMonthThai";

const getThai = (d) => {
 
    const date = new Date(d);
    const day=date.getDate();
    const yearthai=date.getFullYear()+543;
   const monththai=getMonthThai(date)

    
    const stringdate=day.toString().concat(" ",monththai," ","พ.ศ.",yearthai)
    
   
    
    
    
        
  return stringdate
}

export {getThai}
