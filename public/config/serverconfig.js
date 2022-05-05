let newP = window.location.protocol;

if (newP == "http:") {
  // window.domain = 'http://test2.zhukuaikeji.com/'; //线下
  window.domain = "http://zkpd.zzdingyun.com"; //线下
} else {
  window.domain = "http://zkpd.zzdingyun.com"; //线上端口
}
