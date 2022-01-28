// DoH SSID黑名单脚本 AutoDoH = type=event,event-name=network-changed,timeout=7,script-path=https://raw.githubusercontent.com/unknowntokyo/surge-list/master/Surge/AutoDoH.js,script-update-interval=86400

const Banedssid1 = "qL";
const Banedssid2 = "Linksys";
const Banedssid3 = "Linksys_5G";
const Banedssid4 = "BanedSSID4";
const Banedssid5 = "BanedSSID5";
const name = "DNS over HTTPS";
//SSID黑名单
let IncludeArea = ($network.wifi.ssid === Banedssid1) || ($network.wifi.ssid === Banedssid2) || ($network.wifi.ssid === Banedssid3) || ($network.wifi.ssid === Banedssid4) || ($network.wifi.ssid === Banedssid5);

const getModuleStatus = new Promise((resolve) => {
  $httpAPI("GET", "v1/modules", null, (data) =>
	  resolve(data.enabled.includes(name))
  );
});

getModuleStatus.then((enabled) => {
  if (IncludeArea && !enabled) {
    //在黑名单网络环境下,开启DoH
	enableModule(true);
  } else if (!IncludeArea && enabled) {
    //在白名单网络环境下,关闭DoH
	enableModule(false);
  } else {
	//其他情況 => 重复触发 => 结束
	$done();
  }
});

function enableModule(status) {
  $httpAPI("POST", "v1/modules", { [name]: status }, () => $done());
}