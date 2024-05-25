import { formatDuration, intervalToDuration } from "date-fns";

const getAge = (datebirth,datediag) => {
 
    const startDate = new Date(datebirth);
    const endDate = new Date(datediag);
    
    const duration = intervalToDuration({ start: startDate, end: endDate });
    
    let age = formatDuration(duration, { format: ["years", "months", "days"] });
    age = age.replace("years", "ปี").replace("year", "ปี").replace("months", "เดือน").replace("month", "เดือน").replace("days", "วัน").replace("day", "วัน");
    
    //const agenew=age.split(" ");
   
    //let years=agenew[0]
    //let month=agenew[2]
    //let agedes=(years==='0'||null?'0':years).concat(" ปี ",month||0," เดือน")
        
  return age
}

export {getAge}
