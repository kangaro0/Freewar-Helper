# Freewar Helper
> Eine Chrome Extension für Freewar, die dir beim Spielen hilft.

![Screenshot](http://i.imgur.com/GA0KXRG.png)

## Jump to Section

* [Getting Started](#getting-started)
* [Installation](#installation)
* [Wichtige Informationen](#wichtige-informationen)
* [Usage](#usage)

## Getting started

### Ordnerstruktur

	- css/
		-- bootstrap.min.css
		-- custom.css
	- fonts/
		-- glyphicons-halflings-regular.eot
        -- glyphicons-halflings-regular.svg
        -- glyphicons-halflings-regular (TrueType font file)
        -- glyphicons-halflings-regular.woff
	- js/
		- background/
			-- background.js (Wartet im Hintergrund auf Nachricht von Content Scripts (NPC auf Feld?) )
		- contentScripts/
			-- item.js (Nicht funktionsfähig! Ersetzt Item-Text aller Items im Inventar mit Links zur jeweiligen Wiki-Seite)
			-- npcs.js (Ersetzt NPC-Text aller NPCs auf dem jetzigen Feld mit einem Link zur jeweiligen Wiki-Seite. Es sendet Gruppen- & Unique-NPCs an die Erweiterung zum Speichern.)
		- popup/
			-- popup.js (Enthält Javascript-Code der Erweiterung)
		- thirdParty/
			-- bootstrap.min.js (Damit wird die Tabelle erstellt.)
			-- jquery-2.0.3.min.js (Erweitert Javascript um ein paar Funktionen, einfacheres Handling)

### Installation

- Repository clonen oder als Zip-File downloaden.
- Inhalt in gewünschten Ordner kopieren, z.B. Desktop/Freewar Helper
- Google Chrome Browser öffnen.
- Auf die Seite 'chrome://extensions' navigieren.
- Aktiviere den Entwicklermodus (oben rechts).
- Klicke auf 'Entpackte Erweiterung laden...'
- Wähle den Ordner aus in dem du den Freewar Helper entpackt hast.
- Der Freewar Helper sollte nun in deinen Erweiterungen zur Auswahl stehen.
- Aktiviere nun die Erweiterung, indem du den Haken bei 'Aktiviert' setzt.

## Wichtige Informationen

Der Freewar Helper zeichnet nie vertraulichen Informationen auf. Nicht jetzt und nicht in zukünftigen Versionen.

Die Daten, die der Bot speichert werden in deinem Google Konto gespeichert, damit du auch beim Spielen am Laptop, Arbeitsrechner, usw..., nicht auf den Freewar Helper verzichten musst. 

### Was speichert der Bot und wie funktionierts?

Immer wenn du ein Feld im Spiel wechselst, wird überprüft ob sich ein NPC auf dem Feld befindet. Sollte dies der Fall sein, wird das NPC automatisiert an die Erweiterung übertragen.

Die Daten, die gesendet werden, sehen dann beispielhaft so aus:

```
{
	name: 'bulliges Erd-Skelkos',
	type: 'Gruppen-NPC',
	coordinates: {
		x: '125',
		y: '91'
	}
}
```

Ausserdem wird der normale Text durch einen Link zum jeweiligen Wiki-Eintrag ersetzt. Bei diesem Vorgang werden keinerlei Daten versendet.

## Usage

Beim Spielen füllt sich die Liste an NPC's in der Erweiterung. 
- Mit einem Klick auf den **grünen Button** sendest du das NPC zu deiner Gruppe. 
- Mit einem Klick auf den **roten Button** löscht du das NPC von der Liste.
	




