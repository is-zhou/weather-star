/**
 * 当前天气信息模板渲染函数
 * @param {Object} data模板渲染的数据
 */
function setCurrent(data) {
    current.innerHTML = template("current_temp", {
        observe: data.data.observe,
        tips: data.data.tips,
        limit: data.data.limit
    });
}
function setForecast_24htemp(data) {
    var html = template("forecast_24htemp", {
        forecast_24h: data.data.forecast_24h
    });
    weathers.innerHTML = html;
    inputCity.value = "";
    cc.innerText = city;
}
/**
 *日期格式转换函数
 * @param {String} date日期字符串 202004021330
 * @returns 2020-04-02 13:30
 */
function dateFormt(date) {
    return (
        date.substr(0, 4) +
        "-" +
        date.substr(4, 2) +
        "-" +
        date.substr(6, 2) +
        " " +
        date.substr(8, 2) +
        ":" +
        date.substr(10, 2)
    );
}
function setIndexTemp(data) {
    var {
        clothes,
        cold,
        comfort,
        carwash,
        drying,
        sports,
        sunscreen,
        tourism,
        umbrella
    } = data.data.index;
    var html = template("indextemp", {
        index: {
            clothes,
            cold,
            comfort,
            carwash,
            drying,
            sports,
            sunscreen,
            tourism,
            umbrella
        }
    });
    lshotcity.style.display = "none";
    lsdatacity.style.display = "none";
    life_index.style.display = "flex";
    life_index.innerHTML = html;
}
function setIndexImg(name) {
    switch (name) {
        case "穿衣":
            return "indexImg1";
            break;
        case "雨伞":
            return "indexImg2";
            break;
        case "感冒":
            return "indexImg3";
            break;
        case "洗车":
            return "indexImg3";
            break;
        case "运动":
            return "indexImg5";
            break;
        case "防晒":
            return "indexImg6";
            break;
        case "旅游":
            return "indexImg7";
            break;
        case "舒适度":
            return "indexImg8";
            break;
        case "晾晒":
            return "indexImg9";
            break;
        default:
            break;
    }
}
//星期装换
function getData(params) {
    return "星期" + "日一二三四五六".charAt(new Date(params).getDay());
}
//根据天气类型选择对应的图片
function getWeatherImg(params) {
    switch (params) {
        case "01":
            return "./img/w1.png";
            break;
        case "02":
            return "./img/w2.png";
            break;
        case "03":
            return "./img/w3.png";
            break;
        case "04":
            return "./img/w4.png";
            break;
        case "07":
            return "./img/w7.png";
            break;
        case "08":
            return "./img/w8.png";
            break;
        case "09":
            return "./img/w9.png";
            break;
        default:
            return "./img/w0.png";
            break;
    }
    return "星期" + "日一二三四五六".charAt(new Date(params).getDay());
}
template.defaults.imports.getData = getData;
template.defaults.imports.dateFormt = dateFormt;
template.defaults.imports.getWeatherImg = getWeatherImg;
template.defaults.imports.setIndexImg = setIndexImg;
