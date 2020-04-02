var inputCity = document.getElementById("inputCity");
var addressList = document.getElementById("addressList");
var lshotcity = document.getElementById("ls-hot-city");
var lsdatacity = document.getElementById("ls-data-city");
var dateInfoBoxDate = document.getElementById("dateInfoBoxDate");
var current = document.getElementById("current");
var cc = document.getElementById("cc");
var weathers = document.getElementById("weather");
var cityt = document.getElementById("city");
var life_index = document.getElementById("life_index");
var more = document.getElementById("more");
var concern_city = document.getElementById("concern_city");
var tips = document.getElementById("tips");
var tweatherInfoBoxips = document.getElementById("weatherInfoBox");
var choose = document.getElementById("choose");

var isAddAttention = false;
var timeoutID = "";
var city = "";
var province = "";
var county = "";

// 搜索框获得焦点面板显示判断
inputCity.onfocus = function() {
    addressList.style.display = "block";
    if (this.value == "") {
        lshotcity.style.display == "none"
            ? (lshotcity.style.display = "flex")
            : "";
        lsdatacity.style.display = "none";
    } else {
        lsdatacity.style.display = "block";
    }
    life_index.style.display = "none";
};

more.onclick = function() {
    isAddAttention ? (isAddAttention = false) : (isAddAttention = true);
    if (isAddAttention) {
        more.innerText = "我选好了";
        weathers.style.opacity = "0.1";
        current.style.opacity = "0.1";
        choose.className = "choose choose1";
        tweatherInfoBoxips.className = "weatherInfoBox weatherInfoBox1";
        inputCity.focus();
    } else {
        more.innerText = "添加城市";
        choose.className = "choose";
        tweatherInfoBoxips.className = "weatherInfoBox";
        weathers.style.opacity = "1";
        current.style.opacity = "1";
        lshotcity.style.display = "none";
        lsdatacity.style.display = "none";
        life_index.style.display = "flex";
    }
};
inputCity.onblur = function(params) {};
// 获取城市信息
inputCity.oninput = function() {
    clearTimeout(timeoutID);
    var cityName = this.value;
    if (cityName == "") {
        lshotcity.style.display = "flex";
        lsdatacity.style.display = "none";
        return;
    }
    timeoutID = setTimeout(() => {
        myJSONP({
            url: "https://wis.qq.com/city/like",
            data: { city: cityName },
            successs: function(address) {
                var html = "";
                if (JSON.stringify(address.data) != "{}") {
                    html = template("addrtemp", { address: address });
                } else {
                    html = template("addrtemp2", {
                        msg: "未搜索到,请重新输入！"
                    });
                }
                lshotcity.style.display = "none";
                lsdatacity.style.display = "block";
                lsdatacity.innerHTML = html;
            }
        });
    }, 300);
};

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
lshotcity.addEventListener("click", function(event) {
    city = event.target.getAttribute("data-city");
    province = event.target.getAttribute("data-province");
    if (isAddAttention) {
        addAttention(city);
        return;
    }

    myJSONP({
        url: "https://wis.qq.com/weather/common",
        data: {
            weather_type:
                "observe|forecast_1h|forecast_24h|index|alarm|limit|tips|rise",
            province: province,
            city: city,
            county: county
        },
        successs: function(data) {
            var html = template("forecast_24htemp", {
                forecast_24h: data.data.forecast_24h
            });
            weathers.innerHTML = html;
            cityt.innerHTML = event.target.getAttribute("data-city");
            inputCity.value = "";
            cc.innerText = city;
            setCurrent(data);
            setIndexTemp(data);
        }
    });
});
/**
 * 搜索到的城市列表点击事件监听
 * 点击后发送该地址的天气请求
 */
lsdatacity.addEventListener("click", function(event) {
    var citys = event.target.getAttribute("data-city").split(",");
    console.log(citys);
    switch (citys.length) {
        case 1:
            city = citys[0];
            break;
        case 2:
            province = citys[0];
            city = citys[1];
            break;
        case 3:
            province = citys[0];
            city = citys[1];
            county = citys[2];
            break;
        default:
            break;
    }
    if (isAddAttention) {
        addAttention(city);
        return;
    }
    myJSONP({
        url: "https://wis.qq.com/weather/common",
        data: {
            weather_type:
                "observe|forecast_1h|forecast_24h|index|alarm|limit|tips|rise",
            province: province,
            city: city,
            county: county
        },
        successs: function(data) {
            var html = template("forecast_24htemp", {
                forecast_24h: data.data.forecast_24h
            });
            weathers.innerHTML = html;
            inputCity.value = "";
            cityt.innerHTML = event.target.getAttribute("data-city");
            //lshotcity.style.display = "flex";
            lsdatacity.style.display = "none";
            lshotcity.style.display = "none";

            life_index.style.display = "flex";
            cc.innerText = city;
            setCurrent(data);
            setIndexTemp(data);
        }
    });
});

/**
 * 页面初次加载请求天气信息
 */
myJSONP({
    url: "https://wis.qq.com/weather/common",
    data: {
        weather_type:
            "observe|forecast_1h|forecast_24h|index|alarm|limit|tips|rise",
        province: "北京",
        city: "北京",
        county: ""
    },
    successs: function(data) {
        var html = template("forecast_24htemp", {
            forecast_24h: data.data.forecast_24h
        });
        weathers.innerHTML = html;
        inputCity.value = "";
        cityt.innerHTML = "北京 北京";
        cc.innerText = "北京";
        setCurrent(data);
        setIndexTemp(data);
    }
});

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
        case "晾晒":
            return "indexImg9";
            break;

        default:
            break;
    }
}
function addAttention(city_text) {
    var li = document.createElement("li");
    console.log(tips);

    tips ? concern_city.removeChild(tips) : "";
    tips = "";
    li.innerText = city_text;
    concern_city.appendChild(li);
}
