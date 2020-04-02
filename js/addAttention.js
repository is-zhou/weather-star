var selectedCity = [];
function addAttention(city_text, province) {
    var li = document.createElement("li");
    li.innerText = city_text;
    li.setAttribute("data-province", province);
    li.setAttribute("data-city", city_text);
    selectedCity.push({ "data-province": province, "data-city": city_text });
    selectedCityBox.appendChild(li);
}
selectedCityBox.onclick = function(event) {
    selectedCityBox.removeChild(event.target);
    selectedCity.splice(selectedCity.indexOf(event.target.innerText), 1);
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
