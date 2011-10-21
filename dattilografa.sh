#!/bin/bash
CWD=`pwd`
TESTO=$CWD/testi.js

if [ ! -e "$TESTO" ];then
  ./seleziona-testo.sh
  exit
fi
if [ ! -e "$TESTO" ];then
  echo "Nessun testo disponibile. Operazione annullata."
  exit
fi

if [ ! -z "$1" ];then
  ID="?$1"
fi

firefox index.html$ID &
