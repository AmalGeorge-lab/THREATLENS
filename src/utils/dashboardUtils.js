export const totalLogsCalculator = (files) => {
  let totalLogs = 0;
  files.forEach((fileInfo) => {
    const logsParsed = fileInfo.parsedLogs;
    totalLogs += logsParsed;
  });
  return totalLogs;
}



export const totalAlertCalculator = (files) => {
  let totalAlerts = 0;
  files.forEach((fileInfo)=>{
    const lowAlertCount = fileInfo.alertsGenerated.low;
    const mediumAlertCount = fileInfo.alertsGenerated.medium;
    const highAlertCount = fileInfo.alertsGenerated.high;
    const criticalAlertCount = fileInfo.alertsGenerated.critical;
    const alertsCount = lowAlertCount + mediumAlertCount + highAlertCount + criticalAlertCount;
    totalAlerts += alertsCount;
  });
  return totalAlerts;
}