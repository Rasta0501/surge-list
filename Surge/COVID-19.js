var list = ["中国","江苏","安徽"];
const url = "https://view.inews.qq.com/g2/getOnsInfo?name=disease_h5";
var ala="";
var num1="";
var num2="";
var num11="";
var num22="";
function num(location, result) {
  var loc = location;
  var resu = result;
  var loc_new = new RegExp(loc + "[\\s\\S]*?confirm[\\s\\S]{3}(\\d+)");
  var loc_now = new RegExp(loc + "[\\s\\S]*?nowConfirm[\\s\\S]{3}(\\d+)");
  let loc_new_res = loc_new.exec(resu);
  let loc_now_res = loc_now.exec(resu);
  if (loc_new_res) {
    //console.log("已获取" + loc + "的信息");
    num1=loc_new_res[1].padStart(5,"\u0020");
    num2=loc_now_res[1].padStart(5,"\u0020");
    num11=num1.replace(/\s/g, "");
    num22=num2.replace(/\s/g, "");
    ala = ala +loc +"           " +num11.padStart(5,"\u0020")+"         "+num22.padStart(5,"\u0020")+ "\n";
  } else {
    //console.log("获取" + loc + "的信息失败");
    ala = ala + loc + "         查无数据\n";
  }
};
$httpClient.get(url, function(error, response, data){
  let res = data;
  for (var i = 0; i < list.length; i++) {
    num(list[i], res);
    if (i == list.length - 1) {
     $done({
       title: "COVID-19：   新增   |   现存",
       icon:"filemenu.and.cursorarrow",
       "icon-color":"#0089A7",
       content: ala.replace(/\n$/, "")
     });
    }
  }
});