/* 添加关注城市模块 */
var selectedCity = [];
var item = 0;
function addAttention(city, province) {
    var li = document.createElement("li");
    li.innerText = city;
    li.setAttribute("data-province", province);
    li.setAttribute("data-city", city);
    selectedCity.push({
        "data-province": province,
        "data-city": city
    });
    selectedCityBox.appendChild(li);
}
//已选中城市列表点击删除
selectedCityBox.onclick = function(event) {
    selectedCityBox.removeChild(event.target);
    selectedCity = selectedCity.filter(item => {
        return item["data-city"] != event.target.getAttribute("data-city");
    });
};
function setAttention(selectedCity) {
    if (selectedCity.length == 0) {
        return;
    }
    tips == "" ? "" : concern_city.removeChild(tips);
    tips = "";
    concern_city.innerHTML = "";
    selectedCity.forEach(item => {
        var li = document.createElement("li");
        li.innerText = item["data-city"];
        li.setAttribute("data-province", item["data-province"]);
        li.setAttribute("data-city", item["data-city"]);

        li.className = "attention";
        concern_city.appendChild(li);
    });
}
