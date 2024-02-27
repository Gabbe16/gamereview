## Vad har jag gjort?

# Read

Jag har skapat en databas med tabeller och sedan fyllt det med data. För att hämta datan gjorde jag en SQL fråga och testade den i TablePlus. Sedan för att använda detta i mitt projekt skapades följande:

* En server.js fil
* En .env fil
* En .gitignore (.env och node_modules)
* En databas.js (db.js) som kopierades ifrån ett annat projekt

När detta var gjort testade jag att allt fungerade som det skulle och därefter kunde jag böra göra olika routes för att börja hämta datan till webbsidan. Det är alltid bra med att börja testa om man får datan med json och ifall det fungerar så kan man fortsätta vidare. Nu laddar jag in själva databas.js (db.js) i routes för att sedan kunna göra queries för att hämta ut all data. Eftersom detta är ett promise måste man använda sig utav async/await och själva datan sparas som en variabel (const [data]). När detta var gjort skickar man tillbaka det till webbsidan med antingen res.json för att se informationen eller res.render för att få en webbsida med text som syns. Det går däremot inte att använda sig av båda. Sista delen blir att kolla att detta fungerar och sedan skapa en view i views mappen. Här med hjälp av njk kan vi visa datan för användaren med hjälp utav res.render.

# Create

När det kommer till create gjorde jag en route för att visa ett formulär och sedan i views skapade en template för att visa datan som kommer att skickas. Själva formuläret innehåller en action som leder vart datan skickas och method som är POST för att kunna skicka datan. formuläret innehåller även inputs där användaren själv skriver in data som skickas och sedan ska kunna visas upp. Därefter behövs det en route för att kunna ta emot datan (POST).