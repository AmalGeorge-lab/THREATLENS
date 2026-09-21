export const severityCalculator = (alerts)=> {
  const severityMap = { "CRITICAL" : 0 , "HIGH" : 0 , "MEDIUM" : 0 , "LOW" : 0 }
  alerts.forEach((alert) => {
    severityMap[alert.severity] ++;
  });
  return severityMap;
}



export const ruleCalculator = (alerts)=> {
  const ruleMap = { "FW-001" : 0 , "FW-002" : 0 ,"FW-003" : 0 , "FW-004" : 0 }
  alerts.forEach((alert) => {
    ruleMap[alert.rule_id] ++;
  });
  return ruleMap;
}




export const attackCalculator = (alerts)=> {
  const attackMap = {
    "Excessive Blocked Connections" : 0, 
    "Internal Network Access Attempt" : 0, 
    "Port Scanning Detection" : 0 ,
    "SSH Targeting" : 0
  }
  alerts.forEach((alert) => {
    attackMap[alert.alert_type] ++;
  });
  return attackMap;
}





export const alertOrganiser = (alerts)=> {
  const pathDict = {
    "Excessive Blocked Connections" : "/excessive-blocked", 
    "Internal Network Access Attempt" : "/internal-network-access", 
    "Port Scanning Detection" : "/port-scanning" ,
    "SSH Targeting" : "/ssh-targeting"
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