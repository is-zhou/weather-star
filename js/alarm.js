/* 天气预警模块 */
var alarmBox = document.getElementById("alarmBox");
template.defaults.imports.setAlarmColor = setAlarmColor;
function setAlarm(data) {
    alarmBox.innerHTML = template("alarmtemp", { alarm: data.data.alarm });
}
function setAlarmColor(alarmText) {
    console.log(alarmText);

    switch (alarmText) {
        case "红色":
            return "rgb(233, 36, 36)";
            break;
        case "橙色":
            return "orangered";
            break;
        case "蓝色":
            return "cornflowerblue";
            break;
        default:
            break;
    }
}
