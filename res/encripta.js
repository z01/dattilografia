<!--

function encripta(Str_Message)
{
	Len_Str_Message=Str_Message.length;
	Str_Encrypted_Message="";
	for (Position = 0 ; Position<Len_Str_Message ; Position++)
	{
		Byte_To_Be_Encrypted = Str_Message.substring(Position, Position+1); 
		Ascii_Num_Byte = 999-Str_Message.charCodeAt(Position);
		Str_Encrypted_Message=Str_Encrypted_Message+Ascii_Num_Byte;

	} 
	return(Str_Encrypted_Message);
}

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

-->
