var inputCity = document.getElementById("inputCity");
var addressList = document.getElementById("addressList");
var lshotcity = document.getElementById("ls-hot-city");
var lsdatacity = document.getElementById("ls-data-city");
var dateInfoBoxDate = document.getElementById("dateInfoBoxDate");
var cityt = document.getElementById("city");

var timeoutID = "";
function getNewDate() {
  var date = new Date();

  return (
    date.getFullYear() + "年" + (date.getMonth() + 1) + "月" + date.getDate()
  );
}
dateInfoBoxDate.innerHTML = getNewDate();

inputCity.onfocus = function() {
  addressList.style.display = "block";
  if (this.value == "") {
    lshotcity.style.display == "none" ? (lshotcity.style.display = "flex") : "";
    lsdatacity.style.display = "none";
  } else {
    lsdatacity.style.display = "block";
  }
};

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
          html = template("addrtemp2", { msg: "未搜索到" });
        }
        lshotcity.style.display = "none";
        lsdatacity.style.display = "block";
        lsdatacity.innerHTML = html;
        console.log(html);
      }
    });
  }, 300);
};
var weathers = document.getElementById("weather");

function getData(params) {
  return "星期" + "日一二三四五六".charAt(new Date(params).getDay());
}
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
template.defaults.imports.getWeatherImg = getWeatherImg;
lshotcity.addEventListener("click", function(event) {
  var city = event.target.getAttribute("data-city");
  var province = event.target.getAttribute("data-province");
  myJSONP({
    url: "https://wis.qq.com/weather/common",
    data: {
      weather_type:
        "observe|forecast_1h|forecast_24h|index|alarm|limit|tips|rise",
      province: province,
      city: city,
      county: ""
    },
    successs: function(data) {
      var html = template("forecast_24htemp", {
        forecast_24h: data.data.forecast_24h
      });
      weathers.innerHTML = html;
      cityt.innerHTML = event.target.getAttribute("data-city");
      inputCity.value = "";
    }
  });
});

lsdatacity.addEventListener("click", function(event) {
  var citys = event.target.getAttribute("data-city").split(",");
  var city = "";
  var province = "";
  var county = "";
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
      lshotcity.style.display = "flex";
      lsdatacity.style.display = "none";
    }
  });
});
