Hej hej här lägger vi in instrukioner och FYIs //Dani
Hejhej, vi ska också lägga in en beskrivning av projektet här så att de som går in på Github och kollar
ser vad vi har gjort och varför typ. Så en beskrivning av vad det är och hur det funkar helt enkelt //Hanne

I app.js skapas två sidor länkade till localhost.
startar man bara localhost 3000 kommer man till
index.html vars css ges av style.css och js av script.js
localhost:3000/homepage
får sin html från homepage.html sin css från homepagestyle.css och js av homepagescript.js

Vill vi skapa fler sidor till localhosten görs det på motsvarande sätt:
1. lägg till app.get i app.js
2. skapa html fil i views och länka i den till dens css och js fil i respektive folder. Detta kan göras genom att i head lägga in:
<link rel="stylesheet" type="text/css" href="\css\DinNyaSidasCSS.css">
<script type="text/javascript" src="js/DinNyaSidasScript.js"> </script>

--
paket att installera:

npm install express@4

Att göra för att få paketen att fungera:
npm install express --save
npm install body-parser --save
npm install mongoose --save
