### Authenticatie
De applicatie maakt gebruik van een gesimuleerd authenticatiesysteem met één vast gebruikersaccount.
Na het invoeren van de juiste inloggegevens wordt Two-Factor Authentication (2FA) toegepast voor extra beveiliging.
De 2FA-code is gesimuleerd en vast ingesteld voor demonstratiedoeleinden.

### State Management
De applicatie maakt gebruik van Vuex voor centraal state management.
Authenticatiegegevens en inspectiedata worden beheerd in aparte Vuex-modules, wat zorgt voor een duidelijke en schaalbare structuur.

### Routing & Beveiliging
De applicatie gebruikt Vue Router in combinatie met route guards.
Pagina’s die beveiligd zijn vereisen een actieve loginstatus, anders wordt de gebruiker automatisch doorgestuurd naar het inlogscherm.

### Dashboard
Het dashboard biedt een overzicht van de applicatie met interactieve tegels.
Deze tegels tonen het aantal openstaande en voltooide inspecties en dienen als navigatie naar de bijbehorende pagina’s.

### Instellingen
Via de instellingenpagina kan de gebruiker zijn accountgegevens aanpassen.
Wijzigingen worden direct opgeslagen in de Vuex state zonder dat de gebruiker opnieuw hoeft in te loggen.

### Data & API
De applicatie maakt gebruik van een externe JSON API (json-server) die inspectiegegevens levert vanuit een db.json-bestand.  
De data wordt asynchroon opgehaald via de Fetch API en opgeslagen in Vuex state.

Om runtime errors te voorkomen is de state defensief ingericht, zodat componenten ook renderen voordat de API-call voltooid is.




-------------



## Verantwoording Security, Usability, Accessibility en Style guides & best practices

### Security
Binnen dit prototype is security op conceptueel en functioneel niveau toegepast. De applicatie maakt gebruik van een gesimuleerd authenticatiesysteem met vaste inloggegevens en een extra Two-Factor Authentication (2FA)-stap. Hierdoor wordt het principe van meerlagige beveiliging aangetoond.

Toegang tot beveiligde pagina’s wordt afgedwongen via Vue Router route guards (`meta.requiresAuth`). Niet-geauthenticeerde gebruikers worden automatisch doorgestuurd naar de loginpagina. Gevoelige acties zoals uitloggen en het aanpassen van accountgegevens zijn centraal afgehandeld via Vuex.


---

### Usability (volgens de 10 heuristieken van Nielsen)
Bij het ontwerpen van de interface is rekening gehouden met meerdere usability-heuristieken van Jakob Nielsen:

- **Visibility of system status:** De gebruiker ziet duidelijke feedback bij inloggen, foutieve invoer en 2FA-validatie.
- **Match between system and real world:** Terminologie zoals “Inspecties”, “Instellingen” en “Logout” sluit aan bij de doelgroep.
- **User control and freedom:** Gebruikers kunnen altijd terug naar het dashboard via de home-knop of uitloggen.
- **Consistency and standards:** Navigatie, kleuren en componentgebruik zijn consistent binnen de gehele applicatie.
- **Error prevention & recovery:** Foutmeldingen bij onjuiste login of 2FA worden duidelijk gecommuniceerd.
- **Recognition rather than recall:** Dashboard-tegels en iconen helpen gebruikers bij het herkennen van functies.

Niet alle heuristieken zijn volledig uitgewerkt. Zo ontbreken geavanceerde undo-functies en uitgebreide foutafhandeling, wat acceptabel is binnen de scope van een prototype.

---

### Accessibility
De applicatie houdt deels rekening met accessibility:

- Gebruik van semantische Ionic componenten (`IonButton`, `IonInput`, `IonLabel`)
- Voldoende kleurcontrast door gebruik van het Ionic themasysteem
- Duidelijke labels bij invoervelden
- Logische focusvolgorde binnen formulieren

De applicatie voldoet gedeeltelijk aan de WCAG 2.1-richtlijnen (niveau A / deels AA).  
Wat nog ontbreekt of verbeterd kan worden:

- Volledige toetsenbordnavigatie is niet expliciet getest
- Geen expliciete ARIA-attributen toegevoegd

Deze punten zijn bewust buiten scope gehouden, maar vormen duidelijke verbeterpunten voor verdere doorontwikkeling.

---

### Style guides & best practices
Bij de ontwikkeling is gebruikgemaakt van de best practices van Vue 3 en Ionic:

- Component-based architectuur
- Gebruik van Vuex voor centrale state management
- Scheiding van verantwoordelijkheden (views, store, router)
- Herbruikbare layoutpatronen (header met home + logout)
- Consistent gebruik van Ionic UI componenten
- Gebruik van Composition API waar passend

De code is leesbaar, gestructureerd en onderhoudbaar opgezet, passend bij een professioneel front-end prototype.

---

### Conclusie
Mijn demo-applicatie laat een bewuste en onderbouwde toepassing zien van security, usability, accessibility en framework-best practices. Hoewel niet alle aspecten volledig zijn geïmplementeerd, zijn de belangrijkste principes aantoonbaar aanwezig en correct toegepast binnen de scope van dit project.
