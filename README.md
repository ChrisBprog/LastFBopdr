### Inleiding
Mijn project gaat over RealEstateCare. Dit is voor inspecteurs die inspecties bij bedrijven of woningen doen. Door middel van deze website kunnen zij nieuwe inspecties toevoegen, editten en voltooien. Het project is gemaakt in Vue + Ionic + Vuex. Er wordt ook gebruikt gemaakt van een "neppe" back-end door middel van een json server.  

### Login
Het project bevat een simpele inlog. Met gebruikersnaam en wachtwoord. (Voor de opdracht is er 1 account aangemaakt.) Als deze zijn ingevoerd komt er een Two-Factor Authentication. Ook deze is voor de opdracht een vast gegeven maar zou uitgebreid kunnen worden naar een volledig functionerende 2FA. 

### Dashboard
Het dashboard is het begin scherm na de inlog. Deze bevat 4 tegels: Openstaande inspecties, Uitgevoerde inspecties, Instellingen en Knowledge base. 
Door op een van de tegels te drukken word je genavigeerd naar de desbetreffende pagina. 

### Openstaande inspecties
Op deze pagina kan de inspecteur een nieuwe inspectie aanmaken of een openstaande inspectie aanpassen. Alle informatie is gedaan aan de hand van de beschrijving van de RealEstateCare. 
Wanneer men op een open inspectie klikt kan men deze: bewerken, voltooien en verwijderen. 
Bij het voltooien wordt deze naar de Uitgevoerde inspecties tegel gestuurd. Bij het bewerken kan men alle informatie aanpassen naar wat nodig is of na eventuele veranderingen binnen de inspectie. 

### Uitgevoerde inspecties
Op deze pagina kan men alle voltooide inspecties in zien. Mocht het nodig zijn kan men deze inspectie ook weer terug zetten naar Open Inspectie.

### Instellingen
Hier kan de gebruiker zijn account gegevens bekijken en aanpassen. 

### Knowledge base
Hier kan de inspecteur kijken naar FAQ. 

### State Management / Routing / Data & API
Door gebruik te maken van Vuex zorg ik voor een overzichtelijk en schaalbaar project. Het is nu makkelijker om nieuwe pagina's toe te voegen. 
Ook is er een routing bestand die er voor zorgt dat alles naar de juiste pagina gaat. Dit wederom voor een overzichtelijk project die goed te managen is. 
De data gaat via het bestand inspections.json en word middels een API (json server) opgehaald. 
Alles wordt voor de opdracht lokaal opgeslagen maar mocht dit een echte site worden of moeten zijn dan is dit aan te passen zodat alles juist aangepast en live is.
De site is live via netlify. Dit is een makkelijk te gebruiken applicatie om de site te hosten. 

### Usability
Bij het maken van de applicatie heb ik geprobeerd het simpel te houden met een professionele uitstraling. Dit geldt ook voor de navigatie. Alle knoppen die nodig zijn, zijn duidelijk te vinden en functioneren. Bijvoorbeeld de logout en home button. Bij elke pagina hetzelfde dus daarom makkelijk en overzichtelijk wat het doet voor de gebruiker.

### Accessibility / styling
Dit sluit een beetje aan bij usability maar om beide goed en duidelijk te krijgen heb ik middels de huisstijlen van de opdracht de pagina gemaakt. Hier is gebruik gemaakt van primary en secondary colors. Om het makkelijk te maken in elke pagina. Hetzelfde geldt voor de toolbar, deze is overal gelijk en dus makkelijk en overzichtelijk mocht de stijl van het bedrijf veranderen. 
De inlog pagina is rustig en heeft een strakke uitstraling zonder allemaal poespas.

### Security
Ik heb voor dit project een eenvoudige vorm van authenticatie gebruikt. De route guards zorgen ervoor dat de pagina's alleen bereikbaar zijn voor gebruikers die zijn ingelogd. Omdat het om een opdracht gaat word alles lokaal opgeslagen en niet in een back-end. 

