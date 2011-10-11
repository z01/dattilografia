#!/bin/bash
FILE=`./statistiche.sh`
if [ ! -z "$FILE" ];then
  ln -sf ${FILE[$SCELTA]} testi.js
  firefox index.html&
fi

