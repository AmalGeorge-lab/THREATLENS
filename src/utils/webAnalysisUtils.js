export const severityCalculator = (alerts)=> {
  const severityMap = { "CRITICAL" : 0 , "HIGH" : 0 , "MEDIUM" : 0 , "LOW" : 0 }
  alerts.forEach((alert) => {
    severityMap[alert.severity] ++;
  });
  return severityMap;
}




export const ruleCalculator = (alerts)=> {
  const ruleMap = { "WEB-001" : 0 , "WEB-002" : 0 ,"WEB-003" : 0 , "WEB-004" : 0 }
  alerts.forEach((alert) => {
    ruleMap[alert.rule_id] ++;
  });
  return ruleMap;
}



export const attackCalculator = (alerts)=> {
  const attackMap = {
    "Directory Enumeration" : 0, 
    "Sensitive File Access" : 0, 
    "SQL Injection Attempt" : 0 ,
    "Web Shell Access Detection" : 0
  }
  alerts.forEach((alert) => {
    attackMap[alert.alert_type] ++;
  });
  return attackMap;
}



export const alertOrganiser = (alerts)=> {
  const pathDict = {
    "Directory Enumeration" : "/directory-enumeration", 
    "Sensitive File Access" : "/sensitive-file-access", 
    "SQL Injection Attempt" : "/sql-injection" ,
    "Web Shell Access Detection" : "/web-shell-access"
  }
  const draftedAlerts = [];
  alerts.forEach((alert) => {
    draftedAlerts.push({
      _id : alert._id ,
      alert_id : alert.alert_id ,
      timestamp : alert.created_at ,
      severity : alert.severity ,
      rule_id : alert.rule_id ,
      rule_name : alert.rule_name ,
      alert_type : alert.alert_type ,
      status : alert.status ,
      path : pathDict[alert.alert_type]
    });
  });
  return draftedAlerts;
}