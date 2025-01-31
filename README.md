# Projekt-Dokumentation

## Software-Architektur
Hier ist eine Übersicht der Architektur der Anwendung:

![Software-Architektur](images/software_architektur.jpg)


---

## Demo-Video
Hier ist ein kurzes Demo-Video zur Anwendung:

![Demo](images/Demo.mp4)


---

## Frontend

### LoginForm.js
Die `LoginForm`-Komponente erhält verschiedene Eigenschaften wie:  
`login`, `password`, `onChange`, `onSubmit`, `emailError`, `loginError` und `switchToRegister`.  
Diese Eigenschaften helfen dabei, das Formular zu steuern und Fehler anzuzeigen.  

Im Formular gibt es zwei Eingabefelder für E-Mail und Passwort sowie zwei Buttons:  
- **Anmelden-Button**  
- **Wechsel-Button** zur Registrierungsseite  

Fehlermeldungen werden angezeigt, wenn es welche gibt.  
Das Styling wird mit **Tailwind CSS** gemacht, und die Komponente verwendet `PropTypes`,  
um sicherzustellen, dass die richtigen Daten übergeben werden.  

Am Ende wird die `LoginForm`-Komponente exportiert, damit sie in anderen Teilen der Anwendung genutzt werden kann.  

---

### LoginPage.js
Die Datei `LoginPage.js` ist für das **Umschalten zwischen Login und Register** zuständig.  
Außerdem validiert sie die **Benutzereingabe** mit **Ajv** und leitet die eingegebenen Werte weiter.  

---

### RegisterForm.js
Die `RegisterForm`-Komponente erstellt ein Registrierungsformular mit **Tailwind CSS** für ein konsistentes Design.  

Sie nutzt folgende Eigenschaften:  
- `firstName`, `lastName`, `login`, `password`, `onChange`, `onSubmit`, `emailError` und `switchToLogin`  

Das Formular enthält:  
- Eingabefelder für **Vorname, Nachname, E-Mail und Passwort**  
- Zwei Buttons:  
  - **Registrierung**
  - **Wechsel zur Login-Seite**

---

### BackButton.js
Die Datei `BackButton.js` ist für die **Navigation und das Ausloggen** zuständig.  
- Je nach aktueller Komponente erscheint entweder das Icon **„CircleArrowLeft“** (zurück)  
- oder das Icon **„LogOut“** (abmelden)  

---

### HistoryButton.js
Die `HistoryButton`-Komponente zeigt die zuletzt geänderten oder erstellten **Datensätze** des Benutzers an.  
- Die beim Login eingegebene **E-Mail wird kodiert** und zur URL hinzugefügt  
- Ein **Authentifizierungstoken** wird aus dem **Local Storage** geholt und der **GET-Anfrage** mitgegeben  
- Die empfangenen Datensätze werden in `historyData` als **JSON-Format** gespeichert  

---

### Modal.js
Die Datei `Modal.js` wird verwendet, um die über den **History-Button** abgerufenen Daten in einem **Pop-up** anzuzeigen.  
Der `Modal` enthält zwei Funktionen:  
1. **`hData`** → ruft die Daten ab  
2. **`onClose`** → schließt das Pop-up  

---

### WelcomePage.js
Die `WelcomePage`-Komponente zeigt eine **Begrüßungsnachricht** an und verwendet den `useEffect`-Hook:  
- Eine Funktion **`onAnimationEnd`** wird nach **1200 ms** aufgerufen  
- Der **Timer wird bei der Demontage gelöscht**, um **Speicherlecks** zu vermeiden  

Die Komponente zeigt den Text **„LIEBHERR“** mit einer **CSS-Animation (`slide-in-top`)** in der Mitte des Bildschirms an.  

---

### DataInputForm.js
Die `DataInputForm`-Komponente bietet ein **Formular zur Eingabe und Anzeige von Projektdaten**.  
- Zeigt das **Profilbild und den Namen des angemeldeten Benutzers**  
- Enthält ein **Eingabefeld für die Projektnummer**  
- Eine **Auswahlkomponente (`NumberToSelect`) für die Version**  

---

### DataInputPage.js
Die Datei `InputDataPage.js` verwaltet **Benutzereingaben** und ruft damit **Maschinendaten** ab.  
- **Verwaltet den aktuellen Zustand** der Anwendung  
- **Sendet GET-Anfragen** basierend auf den Eingaben  
- **Gibt die empfangenen Daten weiter**  
- **Integriert Funktionen wie Scanner-Unterstützung & Versionsverwaltung**  

---

### DataSelectPage.js
Die Komponente `DataSelectPage.js` zeigt eine Liste von **Maschinendaten** an.  
- Benutzer kann ein **Element auswählen**  
- Verarbeitet die **Daten** und zeigt sie in einer **Tabelle**  
- Auswahl erfolgt über ein **Checkbox-System**  
- Bestätigung über einen **„Submit“-Button**  

---

### DataSelectTable.js
Die `DataSelectTable`-Komponente stellt eine **Tabelle** zur Auswahl von Daten bereit.  
- Nutzt die `relevantData`-Eigenschaft für die **Datenbefüllung**  
- Spalten: **„Auswahl“, „Element“, „Version“, „Seriennummer“**  
- Styling erfolgt mit **Tailwind CSS**  

---

### NumberToSelect.js
Die `NumberToSelect`-Komponente erstellt ein **Dropdown-Menü** mit Zahlen **von 1 bis `maxVersion`**.  
- Eine **neue Version** wird als **"NEU"** markiert  
- Auswahl erfolgt über **React Hooks**  

---

### SerialNumberForm.js
Die `SerialNumberForm`-Komponente ermöglicht das **Eingeben oder Scannen einer Seriennummer**.  
- Zeigt den **aktuell angemeldeten Benutzer**  
- Bietet ein **Eingabefeld & QR-Scanner**  
- **Daten werden nach Eingabe oder Auswahl per "Submit"-Button gesendet**  

---

### SerialNumberPage.js
Die `SerialNumberPage`-Komponente ermöglicht das **Scannen oder Eingeben einer Seriennummer**.  
- Falls eine Seriennummer im **`sessionStorage`** gespeichert ist, wird sie **automatisch geladen**  
- Nach dem Absenden erfolgt eine **Bestätigung oder Fehlermeldung**  

---

## Backend

## API Dokumentation
- http://localhost:8080/v3/api-docs
- Swagger-UI: http://localhost:8080/swagger-ui/index.html 
    - Falls die Dokumentation nicht geladen wird, gebe /v3/api-docs im Suchfeld ein.

---

Das **Backend** ist in verschiedene **Pakete** unterteilt, um eine **klare Struktur** und **Trennung der Verantwortlichkeiten** zu gewährleisten.  

### config
Das Paket `config` enthält **Konfigurationsklassen** für **Sicherheit und zentrale Einstellungen**.  

### JwtAuthFilter
Die Klasse `JwtAuthFilter` ist für die **JWT-Authentifizierung** zuständig.  
- Prüft bei jeder Anfrage den **JWT-Token**  
- Speichert bei Erfolg die **Authentifizierung**  
- Lehnt ungültige Anfragen ab  

---

### Ablauf der Authentifizierung beim Login
1. **Anfrage vom Client**:  
   - Der Client sendet eine **POST-Anfrage** an `/login` mit den **Anmeldedaten**  
2. **WebConfig (CORS-Filter)**:  
   - Prüft die **IP-Adresse** der Anfrage und deren **Herkunft**  
3. **SecurityConfig (SecurityFilterChain)**:  
   - Prüft, ob der **Endpunkt zugänglich** ist  
   - Gibt ggf. eine **403- oder 401-Fehlermeldung** zurück  
4. **Authentifizierung durch den AuthController**:  
   - Überprüft die **Anmeldedaten**  
   - Falls inkorrekt, wird die Anfrage **abgelehnt**  
5. **JWT-Erstellung**:  
   - Bei Erfolg wird ein **JWT-Token** generiert  
6. **JWT an den Client senden**:  
   - Der Client kann dieses Token für **zukünftige Anfragen** verwenden  

---

### Weitere Backend-Klassen:
- **PasswordConfig** → Hasht Passwörter vor Speicherung  
- **SecurityConfig** → Definiert Sicherheitsrichtlinien & Endpunkte  
- **UserAuthenticationEntryPoint** → Handhabt nicht-authentifizierte Anfragen  
- **UserAuthenticationProvider** → Erstellt & validiert JWTs  
- **WebConfig** → Konfiguriert CORS-Richtlinien  

---
