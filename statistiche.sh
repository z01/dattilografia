#!/bin/bash
CWD=`pwd`
for TEST in $(find testi/ -name t-\*.js);do
  ID=$(head -1 $TEST|cut -f2 -d:|cut -f1 -d,)
  DESC[$ID]=$(head -1 $TEST|cut -f14 -d\")
  TIPO[$ID]=$(head -1 $TEST|cut -f6 -d\")
  FILE[$ID]=$TEST
  TNUM[$ID]=$(grep "^testo.a++.=" $TEST|wc -l)
done
if [ -e testi.js ];then
  IDTE=$(head -1 testi.js |cut -f2 -d:|cut -f1 -d,)
else
  IDTE=999
fi
COOKIES=$(ls -l --full-time ~/.mozilla/firefox/*/cookies.sqlite 2>/dev/null |sort -k6 |awk '{print $NF}'|tail -1)
for COOKIE in $(echo -e $(sqlite3 $COOKIES 'select value from moz_cookies where name="dattilocorso"' 2>/dev/null|sed -r 's/%([A-F0-9]{2})/\\x\1/g')|sed -r -e 's/:\{/:{\n  /' -e 's/\},/},\n  /g'|grep ,);do
  if [ -z "$TERMINATI" ];then
    TERMINATI=$(echo $COOKIE|cut -f2 -d:|cut -f1 -d,)
    CARATTERI=$(echo $COOKIE|cut -f3 -d:|cut -f1 -d,)
    TEMPO=$(echo $COOKIE|cut -f4 -d:|cut -f1 -d,)
    ERRORI=$(echo $COOKIE|cut -f5 -d:|cut -f1 -d,)
    CPM=$[$CARATTERI*60/$TEMPO]
    PERR=$(echo "scale=2;$ERRORI*100/$CARATTERI"|bc)
#    echo "Totali: terminati=$TERMINATI ($CPM CPM, $PERR% errori)"
  else
    ID=$(echo $COOKIE|cut -f2 -d\")
    TTEMPO[$ID]=$(echo $COOKIE|cut -f5 -d:|cut -f1 -d,)
    TTERMINATI[$ID]=$(echo $COOKIE|cut -f3 -d:|cut -f1 -d,)
    TCARATTERI[$ID]=$(echo $COOKIE|cut -f4 -d:|cut -f1 -d,)
    TERRORI[$ID]=$(echo $COOKIE|cut -f6 -d:|cut -f1 -d,)
    TULTIMO[$ID]=$(echo $COOKIE|cut -f7 -d:|cut -f1 -d,|cut -f2 -d\"|cut -f1 -d\})
    if [ ${TTEMPO[$ID]} -eq 0 ];then 
      TCPM[$ID]=0
      TPERR[$ID]=0
    else
      TCPM[$ID]=$[${TCARATTERI[$ID]}*60/${TTEMPO[$ID]}]
      TPERR[$ID]=$(echo "scale=2;${TERRORI[$ID]}*100/${TCARATTERI[$ID]}"|bc)
    fi
    if [ ${TIPO[$ID]} != "vari" ];then
      LEZ[$ID]=" - fatti ${TULTIMO[$ID]}/${TNUM[$ID]}"
    else
      LEZ[$ID]=" - fatti ${TTERMINATI[$ID]}/${TNUM[$ID]}"
    fi
    #echo "$ID - ${TIPO[$ID]} - ${DESC[$ID]} - ${TTERMINATI[$ID]} (${TCPM[$ID]} CPM, ${TPERR[$ID]}% errori)${LEZ[$ID]}" 
  fi
done
if [ -z "$TERMINATI" ];then
  TITOLO="Statistiche non disponibili - Scegli un Set"
else
  TITOLO="Totali: terminati=$TERMINATI ($CPM CPM,  $PERR% errori) - Scegli un nuovo Set"
fi
# {"terminati":12,"caratteri":791,"tempo":326,"errori":27,"test":{
#   "13":{"terminati":9,"caratteri":27,"tempo":10,"errori":1,"ultimo":"1"},
#   "5":{"terminati":3,"caratteri":764,"tempo":316,"errori":26,"ultimo":"3"}},
#   "lastinsert":"6938"}

TESTS=${#FILE[*]}
SCELTA=$(echo kdialog --radiolist \"$TITOLO\" $(for ID in `seq 0 $[$TESTS-1]`;do 
	  echo $ID 
	  echo -n \"
	  echo -n ${TIPO[$ID]} - ${DESC[$ID]}
	  if [ ! -z "${TTERMINATI[$ID]}" ];then
	    echo -n " - term: ${TTERMINATI[$ID]} (${TCPM[$ID]} CPM, ${TPERR[$ID]}% errori)${LEZ[$ID]}"
	  else
	    echo -n " - (${TNUM[$ID]} test)"
	  fi

	  echo \"
	  if [ $ID -eq $IDTE ];then echo on;else echo off;fi
	done)|sh)
if [ ! -z "$SCELTA" ];then
  echo ${FILE[$SCELTA]}
fi
