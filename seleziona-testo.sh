#!/bin/bash
FILE=`./statistiche.sh`
if [ -f "$FILE" ];then
  ln -sf ${FILE[$SCELTA]} testi.js
  firefox index.html&
fi

