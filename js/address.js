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
var selectedCityBox = document.getElementById("selectedCityBox");
var addresstitle1 = document.getElementById("addresstitle1");

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
//添加关注城市
more.onclick = function() {
    isAddAttention ? (isAddAttention = false) : (isAddAttention = true);
    if (isAddAttention) {
        more.innerText = "完成关注";
        addresstitle1.innerText = "已选择城市(点击删除)";
        weathers.style.opacity = "0.1";
        current.style.opacity = "0.1";
        cityt.style.display = "none";
        selectedCityBox.style.display = "flex";
        choose.className = "choose choose1";
        tweatherInfoBoxips.className = "weatherInfoBox weatherInfoBox1";
        inputCity.focus();
    } else {
        more.innerText = "管理关注";
        addresstitle1.innerText = "当前城市";
        choose.className = "choose";
        tweatherInfoBoxips.className = "weatherInfoBox";
        weathers.style.opacity = "1";
        current.style.opacity = "1";
        selectedCityBox.style.display = "none";
        cityt.style.display = "block";
        lshotcity.style.display = "none";
        lsdatacity.style.display = "none";
        life_index.style.display = "flex";
        setAttention(selectedCity);
    }
};
inputCity.onblur = function(params) {};
// 获取城市信息（输入搜索城市信息）
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
//热门城市列表点击事件（发送对应天气的请求）
lshotcity.addEventListener("click", function(event) {
    county = "";
    city = event.target.getAttribute("data-city");
    province = event.target.getAttribute("data-province");
    if (isAddAttention) {
        addAttention(city, province);
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
            cityt.innerHTML = event.target.getAttribute("data-city");
            renderData(data);
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
    province = "";
    county = "";
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
        addAttention(city, province);
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
            cityt.innerHTML = event.target.getAttribute("data-city");
            lsdatacity.style.display = "none";
            lshotcity.style.display = "none";
            life_index.style.display = "flex";
            renderData(data);
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
        city = "北京 ";
        cityt.innerHTML = "北京 北京";
        renderData(data);
        //渲染当前天气数据
        setCurrent(data);
        //渲染生活指数数据
        setIndexTemp(data);
    }
});
function renderData(data) {
    var html = template("forecast_24htemp", {
        forecast_24h: data.data.forecast_24h
    });
    weathers.innerHTML = html;
    inputCity.value = "";
    cc.innerText = city;
}
//我的关注城市列表的点击事件点击后发送天气请求
concern_city.onclick = function(event) {
    city = event.target.getAttribute("data-city");
    province = event.target.getAttribute("data-province");
    county = "";
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
            cityt.innerHTML = event.target.getAttribute("data-city");
            renderData(data);
            setCurrent(data);
            setIndexTemp(data);
        }
    });
};
