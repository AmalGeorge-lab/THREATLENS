export const severityCalculator = (alerts)=> {
  const severityMap = { "CRITICAL" : 0 , "HIGH" : 0 , "MEDIUM" : 0 , "LOW" : 0 }
  alerts.forEach((alert) => {
    severityMap[alert.severity] ++;
  });
  return severityMap;
}


export const ruleCalculator = (alerts)=> {
  const ruleMap = { "AUTH-001" : 0 , "AUTH-002" : 0 ,"AUTH-003" : 0 , "AUTH-004" : 0 }
  alerts.forEach((alert) => {
    ruleMap[alert.rule_id] ++;
  });
  return ruleMap;
}


export const attackCalculator = (alerts)=> {
  const attackMap = {
    "Classical Brute Force Attack" : 0, 
    "Root Account Brute Force Attack" : 0, 
    "Brute Force Account Success" : 0 ,
    "Root Brute Force Account Success" : 0 ,
    "Distributed Brute Force Attack" : 0 ,
    "Root Account Distributed Brute Force Attack" : 0 ,
    "Distributed Brute Force Attack Success" : 0,
    "Root Account Distributed Brute Force Attack Success" : 0,
    "Password Spraying Attack" : 0,
    "Username Enumeration Attack" : 0
  }
  alerts.forEach((alert) => {
    attackMap[alert.alert_type] ++;
  });
  return attackMap;
}



export const alertOrganiser = (alerts)=> {
  const pathDict = {
    "Classical Brute Force Attack" : "/brute-attack" ,
    "Distributed Brute Force Attack" : "/distributed-attack",
    "Password Spraying Attack" : "/password-spraying",
    "Root Account Brute Force Attack" : "/brute-attack",
    "Root Account Distributed Brute Force Attack" : "/distributed-attack",
    "Brute Force Account Success" : "/brute-attack",
    "Distributed Brute Force Attack Success" : "/distributed-attack",
    "Root Brute Force Account Success" : "/brute-attack",
    "Root Account Distributed Brute Force Attack Success" : "/distributed-attack",
    "Username Enumeration Attack" : "/username-enumeration"
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
    })
  });
  return draftedAlerts;
}