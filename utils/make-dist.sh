#!/bin/bash -e
if ! grep ^dattilocorso VERSION >/dev/null 2>&1;then
  cd ..
  if ! grep ^dattilocorso VERSION >/dev/null 2>&1;then
    echo "Impossibile trovare dattilocorso"
    exit 1
  fi
fi
CWD=`pwd`
TMP=`mktemp -d`

CONTENT=$CWD/utils/pkgcontent.txt
VERSION=`cat $CWD/VERSION|awk '{print $2}'`
mkdir -p $TMP/dattilocorso-$VERSION

DEST=$TMP/dattilocorso-$VERSION

cat $CONTENT|grep /$|while read P D;do
  echo "creating directory $D"
  mkdir $DEST/$D
  chmod $P $DEST/$D
done

cat $CONTENT|grep -v /$|while read P F;do
  echo "copying file $F"
  cp $CWD/$F $DEST/$F
  chmod $P $DEST/$F
done

echo "copying texts"
cp $CWD/testi/t-*.js $DEST/testi/
cp $CWD/testi/corsi/t-*.js $DEST/testi/corsi/
    
echo "generating file testi.js"
cp $CWD/testi/t-benvenuto.js $DEST/testi.js

cd $TMP
echo "generating package"
tar cvf dattilocorso-$VERSION.tar dattilocorso-$VERSION
echo "compressing package"
gzip -9 dattilocorso-$VERSION.tar
echo "moving to source"
mv dattilocorso-$VERSION.tar.gz $CWD/dattilocorso-$VERSION.tar.gz
echo "removing temporary files"
rm -r $TMP
