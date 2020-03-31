var inputCity=document.getElementById("inputCity");
var addressList=document.getElementById("addressList");
var lshotcity=document.getElementById("ls-hot-city");
var lsdatacity=document.getElementById("ls-data-city");

var timeoutID="";
inputCity.onfocus=function(){
  addressList.style.display="block";
  if(this.value==""){
    lshotcity.style.display=="none"?lshotcity.style.display="flex":""
    lsdatacity.style.display="none";
  }else{
    lsdatacity.style.display="block";
  }
  
}
inputCity.onblur=function(){
  addressList.style.display="none";
}
inputCity.oninput=function(){
  clearTimeout(timeoutID);
  var cityName=this.value;
  if(cityName==""){
    lshotcity.style.display="flex";
      lsdatacity.style.display="none";
      return;
  }
  timeoutID=setTimeout(()=>{
    ajax({url:"https://wis.qq.com/city/like?",
    data:{city:cityName},
    successs:function(address){
      var html="";
      if(JSON.stringify(address.data)!="{}"){
        html=template('addrtemp',{address:address});
        
      }else{
        html=template('addrtemp2',{msg:"未搜索到"});
      }
      lshotcity.style.display="none";
      lsdatacity.style.display="block";
      lsdatacity.innerHTML=html
      console.log(html);
      
    }
  })
  },300);
};

