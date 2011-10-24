Per chi usa linux può usare il comando './dattilografa.sh' per avviare il programma.
Questo aprirà la index.html in firefox.



Per chi usa Windows può aprire index.html con il doppio click.


Nella directory 'testi' e sottodirectory sono disponibili un set di definizione testi.
E' possibile crearne di nuovi (vedi t-template.js per la sintassi).

Tra i testi già presenti ci sono alcuni corsi di dattilografia, base e avanzato e
la versione italiana del 'fortune' (quei messaggi che vi compaiono ogni volta che 
aprite una shell) più qualcos'altro.



Sulle pagine ho inserito la barra di navigazione in modo che si possa saltare avanti e indietro 
al testo corrente (utile specialmente se si tratta di un corso).
Puntando a index.html diretto verrà scelto un testo. A seconda della tipologia di testi verrà scelto:
1) a caso se il set di testi è di tipo vario (tipo 'fortune')
2) il primo testo (o lezione) non ancora scritto (si, il programma si memorizza il progresso delle lezioni,
   quindi quelle già fatte o no). Se si forza ad andare a saltare i test, poi comunque in automatico
   vengono ripresentati quelli che erano stati saltati.

All'url si può aggiungere il numero di testo a cui si vuole andare.
index.html?23
va al 23° testo nel file.

Inoltre il programma si salva:
1) i progressi totali (numero di prove, media cpm ed errori)
2) i progressi per i singoli test (numero di prove, media cpm ed errori, ultima lezione)


La pagina conclusiva del test (con i risultati e tutto) presenta i pulsanti
"Vai a nuovo" o "Ripeti il test" mettendo come predefinito l'uno o l'altro a seconda che si
sia superato o meno il 3% di errori nel test stesso.
Per usare il pulsante predefinito non è necessario usare il mouse ma basta premere invio (stiamo imparando
ad usare la tastiera... usiamola per tutto ;-)

BUON ALLENAMENTO!
