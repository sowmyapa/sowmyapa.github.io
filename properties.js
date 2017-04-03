$(document).ready(function(){
    console.log("pathname"+document.location.pathname);
    if (document.location.pathname == "filters.html") {
      $('#userId').innerHTML="Hello "+localStorage.getItem("userName");
       console.log(localStorage.getItem("userName"));
    }
});


function onSignIn(googleUser) {
  var profile = googleUser.getBasicProfile();
  console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
  console.log('Name: ' + profile.getName());
  console.log('Image URL: ' + profile.getImageUrl());
  console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
  window.location.href="filters.html";
 if(typeof(Storage) !== "undefined") {
   console.log("storing");
    // Store
    localStorage.setItem("userName", profile.getName());
  }  
}


function UserAction() {
//window.location.href="propertyList.html";
document.getElementById("input1").style.display="none";
document.getElementById("output1").style.display="block";

var page = getParameterByName('page');
var uri="https://192.168.0.16:8443/properties"
var symbol="?"
if(document.getElementById('propertyNameId').value!=""){
   uri=uri+symbol+"propertyName="+(document.getElementById('propertyNameId').value)
   symbol="&"
}
if(document.getElementById('propertyPriceId').value!=""){
   uri=uri+symbol+"propertyPrice="+(document.getElementById('propertyPriceId').value)
   symbol="&"
}
if(document.getElementById('propertySizeId').value!=""){
   uri=uri+symbol+"propertySize="+(document.getElementById('propertySizeId').value)
   symbol="&"
}
if(document.getElementById('propertyTypeId').value!=""){
   uri=uri+symbol+"propertyType="+(document.getElementById('propertyTypeId').value)
   symbol="&"
}
if(document.getElementById('propertyAreaId').value!=""){
   uri=uri+symbol+"propertyArea="+(document.getElementById('propertyAreaId').value)
}

//var uri="http://localhost:8080/properties?propertyName="+(document.getElementById('propertyNameId').value)+"&propertyPrice="+(document.getElementById('propertyPriceId').value)+"&propertySize="+(document.getElementById('propertySizeId').value)+"&isApartment="+(document.getElementById('isApartmentId').value)+"&propertyArea="+(document.getElementById('propertyAreaId').value)
console.log(uri);
$('#table1').dynatable({
  dataset: {
    ajax: true,
    ajaxUrl: uri,
    ajaxOnLoad: true,
    records: []
  },
params: {
dynatable: 'dynatable',
queries: 'queries',
sorts: 'sorts',
page: 'page',
perPage: 'perPage',
offset: 'offset',
records: 'records',
record: null,
queryRecordCount: 'queryRecordCount',
totalRecordCount: 'totalRecordCount'
}
});
}

function goBack(){
     window.location = "filters.html"+'?eraseCache=true';
    document.getElementById("input1").style.display="block";
    document.getElementById("output1").style.display="none"; 
}

function queryParams() {
    return {
        type: 'owner',
        sort: 'updated',
        direction: 'desc',
        per_page: 10,
        page: 1
    };
}

function getParameterByName(name, url) {
    if (!url) {
      url = window.location.href;
    }
    console.log(url);
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

function myFunction(){
    document.getElementById("myDropdown").classList.toggle("show");
}
