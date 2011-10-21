function escrit_inicial() {
  if (document.all) document.all.clock.innerHTML=texte_colors;
  else if (document.getElementById) document.getElementById("clock").innerHTML=texte_colors;  
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
function calcula_checksum(Str_Message) {
  longitud=Str_Message.length;
  suma=0;
  for (Position = 0 ; Position<longitud ; Position++) {
    codi = Str_Message.substring(Position, Position+1); 
    suma = suma+Str_Message.charCodeAt(Position);
  } 
  cadena=""+suma;
  return(cadena);
}
function analitza_resultat(errors) {
  var perrors=round(errors*100/longitud);
  var segons=hora_fi-hora_inici;
  var canvi_de_dia=0;
  if (errors<0) errors=0;
  if (segons<1) { segons=segons+86400; canvi_de_dia=1; }
  if (paste_utilitzat==1) segons=10000;
  variables_a_encriptar="x="+errors+"&l="+longitud+"&s="+segons+"&h="+hora_servidor+"&t="+testi+"&a="+encripta(serialize(allerrors))+"&";
  variables_encriptades=encripta(variables_a_encriptar);
  checksum=calcula_checksum(variables_encriptades);
  location="fi_test.html?v="+variables_encriptades+"&w="+checksum+"&";
}
function CheckKey(event) {
  if (navigator.appName != 'Netscape') {
    tecla_marcada=window.event.keyCode;
    if (window.event.shiftKey) vigila=1;
  } else {
    tecla_marcada=event.which;
    if (tecla_marcada==16) vigila=1;
  }
  tecla_anterior=tecla_marcada;
}
function Comprova_ok(a,event) {
  var tecla;
  var valor_tecla_event;
  var tmperrors=errors;
  jaheaixecat=1;
  if (navigator.appName != 'Netscape') {
    if (window.event.keyCode==20) { a=a.substr(0,contador_real); return(a); }
    if (window.event.keyCode==8) { a=valor_anterior.substr(0,contador_real+1); return(a); }
    tecla=a.substr(contador_real,1);
    valor_tecla_event=window.event.keyCode;
  } else {
    if (event.which==20) {a=a.substr(0,contador_real); return(a);}
    if (event.which==8) { a=valor_anterior.substr(0,contador_real+1); return(a);}
    if (event.which==13) tecla=String.fromCharCode(event.which);
    else tecla=a.substr(contador_real,1);
    valor_tecla_event=event.which;
  }
  if (punter==0) hora_inici=CalculaHora(hora_inici);
  if (texte.substr(punter,4)=="<br>") {
    if (valor_tecla_event != 13) {
      if (vigila!=1) errors++;
      a=a.substr(0,contador_real);
      vigila=0;
    } else {
      hores[linia]=CalculaHora(hores[linia]);
      linia=linia+1;
      punter=punter+4;
      if (navigator.appName=='Netscape') contador_real=contador_real+1;
      else {
        var Browser = {
          Version: function() {
            var version = 999; // we assume a sane browser
            if (navigator.appVersion.indexOf("MSIE") != -1) version = parseFloat(navigator.appVersion.split("MSIE")[1]);
            return version;
          }
        }
        if (Browser.Version()==9) contador_real=contador_real+1;
        else contador_real=contador_real+2;
      }
      if(texte.substring(cursor_pos_color+num_salt_ini,cursor_pos_color+num_salt_ini+4)=='<br>')  num_salt=num_salt_ini+3; 
      else {
        if(num_salt>num_salt_ini) num_salt--;
        final_linea=0;
        num_salt=num_salt_ini;
      }
      cursor_pos_color=punter;
      inici_text_no_marcat=texte.substring(0,cursor_pos_color);
      text_marcat=texte.substring(cursor_pos_color, cursor_pos_color+num_salt);
      fi_text_no_marcat=texte.substring(cursor_pos_color+num_salt,longitud);
      texte_colors=colortext(inici_text_no_marcat,text_marcat,fi_text_no_marcat);

      if (document.all) document.all.clock.innerHTML=texte_colors;
      else if (document.getElementById) document.getElementById("clock").innerHTML=texte_colors;
    }
  } else {
    if (tecla!=texte.substr(punter,1)) {
      if (plataforma=="mac") {
        if(nav=="Safari") {
          if (vigila!=1) errors++;
          a=a.substr(0,contador_real);
          vigila=0;
        } else {
          if(nav=="Firefox") {
            if (!((event.keyCode==0) || (event.keyCode==192) || (event.keyCode==16))) {
              if (vigila!=1) errors++;
              a=a.substr(0,contador_real);
              vigila=0;
            }
          } else {
            if(nav=="Netscape") {
              if (!((event.keyCode==0) || (event.keyCode==192))) {
                if (vigila!=1) errors++;
                a=a.substr(0,contador_real);
                vigila=0;
              }
            } else { // qualsevol altre navegador (ie, opera, ...) - no provat
              if (!((event.keyCode==0) || (event.keyCode==192))) {
                if (vigila!=1) errors++;
                a=a.substr(0,contador_real);
                vigila=0;
              }
            }
          }
        }
      } else { // no mac
        if (vigila!=1) {
          if (navigator.appName != 'Netscape') errors++;
          else { 
            if ( (navigator.platform == 'Win32') || (navigator.platform == 'Win64') || (navigator.platform == 'Windows') ) errors++;
            else if (tecla!=0) errors++;
          }        
        }
        a=a.substr(0,contador_real);
        vigila=0;
      }
      if(tmperrors!=errors) {
	if(lastposerror==punter) errors--;
	else {
	  lastposerror=punter;
	  allerrors[tmperrors]=punter;
	  document.getElementById("errs").innerHTML=errors+" ("+(round(errors*100/longitud))+"%)";
	}
      }
    } else {
      punter++;
      contador_real++;
      if(texte.substring(cursor_pos_color+num_salt_ini,cursor_pos_color+num_salt_ini+4)=='<br>') {  
        num_salt=num_salt_ini+3;
        final_linea=1;
      } else {
        if (final_linea==1) if(num_salt>4) num_salt--;
        else if(num_salt>num_salt_ini) num_salt--;
      }
      cursor_pos_color=punter;
      inici_text_no_marcat=texte.substring(0,cursor_pos_color);
      text_marcat=texte.substring(cursor_pos_color, cursor_pos_color+num_salt);
      fi_text_no_marcat=texte.substring(cursor_pos_color+num_salt,longitud);
      texte_colors=colortext(inici_text_no_marcat,text_marcat,fi_text_no_marcat);

      if (document.all) document.all.clock.innerHTML=texte_colors;
      else if (document.getElementById) document.getElementById("clock").innerHTML=texte_colors; 
    }
  }
  document.getElementById("cpm").innerHTML=Math.round(punter*60/(CalculaHora(hora_fi)-hora_inici+0.01));
  if (longitud==punter) {
    hora_fi=CalculaHora(hora_fi);
    analitza_resultat(errors)  ;
  }
  valor_anterior=a;
  return(a)
}

function round (n) {
  n = Math.round(n * 100) / 100;
  n = (n + 0.001) + '';
  return n.substring(0, n.indexOf('.') + 3);
}

function CalculaHora(a) {
  var d = new Date();
  a=d.getHours()*3600+d.getMinutes()*60+d.getSeconds();
  return(a);
}


function Calcula(Operacion) { 
  var Formu = Operacion.form ;
  var Expresion = total + UltimaOperacion + Formu.display.value ;
  UltimaOperacion = Operacion.value ;
  total = eval(Expresion) ;
  Formu.display.value = total ;
  NuevoNumero = true;
}

function colortext(inici_text_no_marcat,text_marcat,fi_text_no_marcat){
  if(allerrors.length==0){
    inici_text=inici_text_no_marcat;
  } else {
    inici_text='';
    var lasterr=0;
    for(var errid=0;errid<allerrors.length;errid++){
      if(allerrors[errid]>=lasterr){
	inici_text+=inici_text_no_marcat.substring(lasterr,allerrors[errid]);
	lasterr=allerrors[errid]+1;
	inici_text+='<font color="#bfbf00">'+inici_text_no_marcat.substring(allerrors[errid],allerrors[errid]+1)+'</font color>';
      }
    }
    inici_text+=inici_text_no_marcat.substring(allerrors[errid-1]+1);
  }
  txtcol = '<FONT FACE="courier new,courier">';
  txtcol+= '<FONT SIZE='+tamano+'>'+inici_text+'<FONT COLOR="red">';
  txtcol+= '<U>'+text_marcat+'</FONT COLOR></U>';
  txtcol+= fi_text_no_marcat+'</FONT SIZE></FONT FACE>';
  return txtcol;
}
var allerrors=new Array();
var lastposerror=0;
var valor_anterior="";
var total = 0;
var UltimaOperacion = "+" ;
var NuevoNumero = true;
var punter=0;
var contador_real=0;
var num_salt_ini=1;
var num_salt=num_salt_ini;
var errors=0;
var perrors=0;
var longitud=0;
var vigila=0;
var hora_inici;
var hora_fi;
var posicio_cursor=0;
var text_marcat;
var cursor_pos_color=0;
var texte_colors;
var tamano=3;
var jaheaixecat=1;
var tecla_anterior;
var final_linea=0;

var linia=0;
var hores=new Array(0,0,0,0,0,0,0,0,0);

var platform = window.navigator.platform.toLowerCase();
var plataforma="";
var navegador=window.navigator.userAgent.toLowerCase();
var nav="";

if (platform.indexOf('mac') != -1) plataforma='mac';

if (navegador.indexOf('safari') != -1) nav='Safari';
else if (navegador.indexOf('firefox') != -1) nav='Firefox';
else if (navegador.indexOf('netscape') != -1) nav='Netscape';
else if (navegador.indexOf('opera') != -1) nav='Opera';
else if (navegador.indexOf('explorer') != -1) nav='Explorer';

if (screen.width > 800) tamano=4; else { if (screen.width > 640) tamano=3; else tamano=2; }


longitud=texte.length;

inici_text_no_marcat=texte.substring(0,cursor_pos_color-1);
text_marcat=texte.substring(cursor_pos_color, cursor_pos_color+num_salt);
fi_text_no_marcat=texte.substring(cursor_pos_color+num_salt,longitud);
texte_colors=colortext(inici_text_no_marcat,text_marcat,fi_text_no_marcat);

