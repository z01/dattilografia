#!/bin/bash
CWD=`pwd`

if [ ! -z "$1" ];then
  ID="?$1"
fi

firefox index.html$ID &
