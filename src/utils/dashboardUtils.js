export const totalLogsCalculator = (files) => {
  let totalLogs = 0;
  files.forEach((fileInfo) => {
    const logsParsed = fileInfo.parsedLogs;
    totalLogs += logsParsed;
  });
  return totalLogs;
}



export const typeLogCalculator = (files) => {
  const log = { "AUTH" : 0 , "WEB" : 0 , "FIREWALL" : 0 };
  files.forEach((file)=>{
    if (file.logType === "auth"){
      log.AUTH ++;
    }else if(file.logType === "web"){
      log.WEB ++;
    }else if(file.logType === "firewall"){
      log.FIREWALL ++;
    }
  })
  return log;
}