var info=new Array();
var testo=new Array();
var a=0;
var cookie=new Array();
var tests=new Array();
var curtest=new Array();

document.write('<script src="res/common.inc.js"></script>');
document.write('<script src="res/utils.inc.js"></script>');
document.write('<script src="testi/elenco-testi.js"></script>');

function showStats(){
  print("Terminati per "+info["descrizione"]+": "+curtest['terminati']);
  if(curtest['terminati'] > 0) {
    print(" ("+(Math.round(curtest['caratteri']*60/curtest['tempo']))+" CPM - "+(Math.round(curtest['errori']*10000/curtest['caratteri'])/100)+"% errori)");
    print(' <a href="index.html" onclick="javascript:clearCurStat();">Azzera</a><br>');
  }else{
    print('<br>');
  }
  print("Totali testi terminati: "+cookie['terminati']);
  print(" ("+(Math.round(cookie['caratteri']*60/cookie['tempo']))+" CPM - "+(Math.round(cookie['errori']*10000/cookie['caratteri'])/100)+"% errori)");
  print(' <a href="index.html" onclick="javascript:setCookie({});">Azzera tutto</a>');
  print("<br><br>");
}
