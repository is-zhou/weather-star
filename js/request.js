/* JSONP数据请求 */
function myJSONP(options) {
    var script = document.createElement("script");
    var params = "";
    for (const attar in options.data) {
        params += attar + "=" + options.data[attar] + "&";
    }
    params = "?source=pc&" + params;
    var callbackName =
        "weatherStar" +
        Math.random()
            .toString()
            .replace(".", "");
    window[callbackName] = options.successs;
    script.src = options.url + params + "callback=" + callbackName;
    document.body.appendChild(script);
}
