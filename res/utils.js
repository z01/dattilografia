function serialize(obj) {
  var t = typeof (obj);
  if (t != "object" || obj === null) { if (t == "string") obj = '"'+obj+'"'; return String(obj); }
  else {
    var n, v, json = [], arr = (obj && obj.constructor == Array);
    for (n in obj) {
      v = obj[n]; t = typeof(v);
      if (t == "string") v = '"'+v+'"'; else if (t == "object" && v !== null) v = serialize(v);
      json.push((arr ? "" : '"' + n + '":') + String(v));
    }
    return (arr ? "[" : "{") + String(json) + (arr ? "]" : "}");
  }
}
function unserialize(str) { 
  if (str === "") str = '""'; 
  eval("var p=" + str + ";"); 
  return p; 
};
function getCookie() {
  c_name='dattilocorso';
  var i,x,y,ARRcookies=document.cookie.split(";");
  for (i=0;i<ARRcookies.length;i++) {
    x=ARRcookies[i].substr(0,ARRcookies[i].indexOf("="));
    y=ARRcookies[i].substr(ARRcookies[i].indexOf("=")+1);
    x=x.replace(/^\s+|\s+$/g,"");
    if (x==c_name) { return unserialize(unescape(y)); }
  }
}
function setCookie(value) {
  c_name='dattilocorso';
  exdays=3650;
  var exdate=new Date();
  exdate.setDate(exdate.getDate() + exdays);
  var c_value=escape(serialize(value)) + ((exdays==null) ? "" : "; expires="+exdate.toUTCString());
  document.cookie=c_name + "=" + c_value;
}
function selectTesti(id){
  cookie["curtest"]=id;
  setCookie(cookie);
}
function encripta(Str_Message) {
  Len_Str_Message=Str_Message.length;
  Str_Encrypted_Message="";
  for (Position = 0 ; Position<Len_Str_Message ; Position++) {
    Byte_To_Be_Encrypted = Str_Message.substring(Position, Position+1); 
    Ascii_Num_Byte = 999-Str_Message.charCodeAt(Position);
    Str_Encrypted_Message=Str_Encrypted_Message+Ascii_Num_Byte;
  } 
  return(Str_Encrypted_Message);
}
function desencripta(Str_Message) {
  Len_Str_Message=Str_Message.length;
  Str_Encrypted_Message="";
  for (Position = 0 ; Position<Len_Str_Message ; Position+=3) {
    cadena_num = Str_Message.substring(Position, Position+3);
    Ascii_Num_Byte = 999-cadena_num;
    caracter=String.fromCharCode(Ascii_Num_Byte);
    Str_Encrypted_Message=Str_Encrypted_Message+caracter;
  } 
  return(Str_Encrypted_Message);
}
function print(str){
  document.write(str);
}
function initializeCookies(){
  cookie=getCookie();
  if(!cookie)cookie={};
  cookie['curtest']=cookie['curtest']||0;
  cookie['terminati']=cookie['terminati']||0;
  cookie['caratteri']=cookie['caratteri']||0;
  cookie['tempo']=cookie['tempo']||0;
  cookie['errori']=cookie['errori']||0;
  tests=cookie['test']; 
  if(!tests) { tests={}; cookie['test']=tests; }
  info=elencotesti[cookie['curtest']];
  curtest=tests[info["id"]]||{};
  curtest['terminati']=curtest['terminati']||0;
  curtest['caratteri']=curtest['caratteri']||0;
  curtest['tempo']=curtest['tempo']||0;
  curtest['errori']=curtest['errori']||0;
  curtest['ultimo']=curtest['ultimo']||0;
  cookie['test'][info["id"]]=curtest;                                                                                                                 
  setCookie(cookie);                                                                                                                                  
}   
function clearCurStat(){
  cookie['test'][info["id"]]={};
  setCookie(cookie);
}
function clearStat(id){
  cookie['test'][id]={};
  setCookie(cookie);
}
function getTexts(){
  document.write('<script src="testi/'+info['file']+'"></script>');
}
function round (n) {
  n = Math.round(n * 100) / 100;
  n = (n + 0.001) + '';
  return n.substring(0, n.indexOf('.') + 3);
}
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
