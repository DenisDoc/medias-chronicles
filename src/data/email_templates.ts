const templates = {
  create: {
    subject: 'Contribuție nouă',
    template: `
===============================================================

      CONTRIBUȚIE – MEDIAȘ CHRONICLES

===============================================================



Vă rugăm să completați câmpurile de mai jos și să trimiteți acest e-mail pentru a contribui cu date istorice la Arhiva Cronologică Istorică Mediaș.

Vă mulțumim!



---------------------------------------------------------------

1. INFORMAȚII TEMPORALE

---------------------------------------------------------------

Data evenimentului:

(ex.: 1075 / 1267-06-03 / aproximativ)

→ 



Secolul:

(ex.: XI / XIII / XVI)

→ 



---------------------------------------------------------------

2. EVENIMENT

---------------------------------------------------------------

Titlul evenimentului:

→ 



Descrierea evenimentului:

(descriere scurtă și clară a faptului istoric)

→ 



---------------------------------------------------------------

3. SURSE

---------------------------------------------------------------

Completați cel puțin o sursă pentru eveniment. Puteți adăuga mai multe surse.



Sursa 1:

Titlu / autor:

→ 

Link către sursă online (dacă există) (dacă există):

→ 

Informații suplimentare:

→ 



Sursa 2 (opțional):

Titlu / autor:

→ 

Link către sursă online (dacă există):

→ 

Informații suplimentare:

→ 



---------------------------------------------------------------

4. SURSE DE CONTEXT (opțional)

---------------------------------------------------------------

Ex.: imagini, evenimente istorice care au influențat cursul evenimentului



Sursă de context 1:

Titlu:

→ 

Link către sursă online (dacă există):

→ 

Informații suplimentare:

→ 



Sursă de context 2 (opțional):

Titlu:

→ 

Link către sursă online (dacă există):

→ 

Informații suplimentare:

→ 



---------------------------------------------------------------

5. DATE DESPRE CONTRIBUITOR

---------------------------------------------------------------

Nume:

→ 

Domeniu / pregătire:

→ 

Afiliație (dacă există):

→ 

Doriți să fiți menționat public ca autor? (Da / Nu):

→ 



---------------------------------------------------------------

VĂ MULȚUMIM PENTRU CONTRIBUȚIE!

---------------------------------------------------------------
`
  },

  edit: {
    subject: 'Editare eveniment',
    template: `
  ===============================================================
          EDITARE EVENIMENT – MEDIAȘ CHRONICLES
===============================================================

Vă rugăm să completați câmpurile de mai jos pentru a solicita modificarea unui eveniment existent în Arhiva Cronologică Istorică Mediaș.

---------------------------------------------------------------
0. IDENTIFICAREA EVENIMENTULUI EXISTENT
---------------------------------------------------------------
Data evenimentului:
→ 

Secolul:
→ 

Titlul evenimentului:
→ 

Acesta este evenimentul pe care doriți să-l modificați.

---------------------------------------------------------------
1. MOTIVUL EDITĂRII
---------------------------------------------------------------
(ex.: corectare dată, completare sursă, adăugare context, corectare descriere, observație metodologică etc.)
→ 

---------------------------------------------------------------
2. INFORMAȚII TEMPORALE (dacă se modifică)
---------------------------------------------------------------
Data evenimentului:
→ 

Secolul:
→ 

---------------------------------------------------------------
3. EVENIMENT (dacă se modifică)
---------------------------------------------------------------
Titlul evenimentului:
→ 

Descrierea evenimentului:
→ 

---------------------------------------------------------------
4. SURSE (dacă se modifică sau se adaugă)
---------------------------------------------------------------
Sursa 1:
Titlu / autor:
→ 
Link către sursă online (dacă există) (dacă există):
→ 
Informații suplimentare:
→ 

Sursa 2 (dacă este cazul):
Titlu / autor:
→ 
Link către sursă online (dacă există):
→ 
Informații suplimentare:
→ 

---------------------------------------------------------------
5. SURSE DE CONTEXT
---------------------------------------------------------------
Sursă de context 1:
Titlu:
→ 
Link către sursă online (dacă există):
→ 
Informații suplimentare:
→ 

Sursă de context 2:
Titlu:
→ 
Link către sursă online (dacă există):
→ 
Informații suplimentare:
→ 

---------------------------------------------------------------
6. DATE DESPRE CONTRIBUITOR (dacă se modifică sau se adaugă)
---------------------------------------------------------------
Nume:
→ 
Domeniu / pregătire:
→ 
Afiliație (dacă există):
→ 
Doriți să fiți menționat public ca autor? (Da / Nu):
→ 

---------------------------------------------------------------
VĂ MULȚUMIM PENTRU AJUTOR ȘI CONTRIBUȚIE!
---------------------------------------------------------------
`
  },
  bugs_and_suggestions: {
    subject: 'Feedback & Sugestii',
    template: `
===============================================================

      FEEDBACK, BUG-URI & IDEI DE DEZVOLTARE
                 MEDIAȘ CHRONICLES

===============================================================



Acest formular este destinat:
– semnalării de probleme sau bug-uri tehnice
– transmiterii de idei, sugestii și propuneri de îmbunătățire
legate de platforma Mediaș Chronicles, website, funcționalități,
design sau conceptul aplicației.

Feedback-ul dumneavoastră contribuie direct la dezvoltarea și
îmbunătățirea proiectului.

Vă mulțumim!



---------------------------------------------------------------

1. CATEGORIA MESAJULUI

---------------------------------------------------------------

Selectați categoria principală a mesajului:

(ex.: bug / problemă tehnică / sugestie de funcționalitate / idee de dezvoltare / feedback UX/UI / observație conceptuală / altul)

→ 



---------------------------------------------------------------

2. SUBIECT

---------------------------------------------------------------

Titlu scurt și clar:

→ 



---------------------------------------------------------------

3. DESCRIEREA DETALIATĂ

---------------------------------------------------------------

Descrieți problema, ideea sau sugestia:

– pentru bug-uri: pașii de reproducere, ce ar fi trebuit să se întâmple și ce s-a întâmplat efectiv  
– pentru idei: ce propuneți, ce problemă rezolvă, de ce ar fi util

→ 



---------------------------------------------------------------

4. DETALII TEHNICE (doar pentru probleme / bug-uri)

---------------------------------------------------------------

Completați dacă mesajul vizează o problemă tehnică.



Dispozitiv:

(ex.: desktop / mobil / tabletă)

→ 



Sistem de operare:

(ex.: Windows / macOS / Linux / Android / iOS)

→ 



Browser / aplicație:

(ex.: Chrome, Firefox, Safari, Edge / aplicația Mediaș Chronicles)

→ 



Versiune (dacă este cunoscută):

→ 



---------------------------------------------------------------

5. REFERINȚE SAU ATAȘAMENTE (opțional)

---------------------------------------------------------------

(ex.: capturi de ecran, link-uri, pagini afectate, exemple)



Descriere:

→ 

Link (dacă există):

→ 



---------------------------------------------------------------

6. DATE DESPRE AUTOR

---------------------------------------------------------------

Nume:

→ 

Doriți să fiți contactat pentru clarificări sau follow-up? (Da / Nu):

→ 

Adresă de contact (e-mail) (opțional):

→ 



---------------------------------------------------------------

VĂ MULȚUMIM PENTRU FEEDBACK ȘI CONTRIBUȚIE!

---------------------------------------------------------------
`
  }
}

export default templates;