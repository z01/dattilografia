<!--

function desencripta(Str_Message)
{
	Len_Str_Message=Str_Message.length;
	Str_Encrypted_Message="";
	for (Position = 0 ; Position<Len_Str_Message ; Position+=3)
	{
		cadena_num = Str_Message.substring(Position, Position+3);
		Ascii_Num_Byte = 999-cadena_num;
	        caracter=String.fromCharCode(Ascii_Num_Byte);
		Str_Encrypted_Message=Str_Encrypted_Message+caracter;
	} 
	return(Str_Encrypted_Message);
}

function nomes_variables(str)
{
	theleft = str.indexOf("?") + 3;
	theright = str.indexOf("&w=");
	newstr=str.substring(theleft,theright);
	return(newstr);
}

function checksum_cadena(str)
{
	theleft = str.indexOf("w=") + 2;
	theright = str.lastIndexOf("&");
	return(str.substring(theleft, theright));
}

function calcula_checksum(Str_Message)
{

	var cadena;
	longitud=Str_Message.length;
	suma=0;
	for (Position = 0 ; Position<longitud ; Position++)
	{
		codi = Str_Message.substring(Position, Position+1); 
		suma = suma+Str_Message.charCodeAt(Position);
	} 
	cadena=""+suma;

	return(cadena);

}

function round (n)
{
	n = Math.round(n * 100) / 100;
	n = (n + 0.001) + '';
	return n.substring(0, n.indexOf('.') + 3);
}

function troba_errors(str)
{
	theleft = str.indexOf("x=") + 2;
	theright = str.indexOf("&l=");
	return(str.substring(theleft, theright));
}

function troba_longitud(str)
{
	theleft = str.indexOf("l=") + 2;
	theright = str.indexOf("&s=");
	return(str.substring(theleft, theright));
}

function troba_segons(str)
{
	theleft = str.indexOf("s=") + 2;
	theright = str.indexOf("&h=");
	return(str.substring(theleft, theright));
}

function troba_hora_server(str)
{
	theleft = str.indexOf("h=") + 2;
	theright = str.lastIndexOf("&");
	return(str.substring(theleft, theright));
}

function troba_testo(str)
{
	theleft = str.indexOf("t=") + 2;
	theright = str.lastIndexOf("&");
	return(str.substring(theleft, theright));
}

var text = document.URL;
var variables=nomes_variables(text);
var variables_no_encriptades=desencripta(variables);

var testi=troba_testo(variables_no_encriptades)

var errors=troba_errors(variables_no_encriptades)
var longitud=troba_longitud(variables_no_encriptades)
var segons=troba_segons(variables_no_encriptades)
var hora_server
var perrors
var ppm
var et_boto1
var et_boto2
var alternativa
var cadena_checksum=0;
var calcul_checksum=0;

hora_server=troba_hora_server(variables_no_encriptades);

perrors=round(errors*100/longitud);
longitud2=longitud;
ppm=longitud*60/segons;
ppm=Math.round(ppm);
cadena_checksum=checksum_cadena(text);
calcul_checksum=calcula_checksum(variables);

var fecha=new Date();
var diames=fecha.getDate();
if (diames<10) diames="0"+diames;

var mes=fecha.getMonth() +1 ;
if (mes<10) mes="0"+mes;
var ano=fecha.getFullYear();

var fecha_test=ano+mes+diames;
-->
