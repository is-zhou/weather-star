function ajax(options) {
  var script = document.createElement("script");
  var params = "";
  for (const attar in options.data) {
    params += "source=pc&" + attar + "=" + options.data[attar] + "&";
  }
  var callbackName =
    "weatherStar" +
    Math.random()
      .toString()
      .replace(".", "");
  window[callbackName] = options.successs;
  script.src = options.url + params + "callback=" + callbackName;
  document.body.appendChild(script);
}
