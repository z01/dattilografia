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
