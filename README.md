# Freewar Helper
> Eine Chrome Extension für Freewar, die dir beim Spielen hilft.

![Screenshot](http://i.imgur.com/GA0KXRG.png)

## Jump to Section

* [Getting Started](#getting-started)
* [Installation](#installation)
* [Usage](#usage)

## Getting started

### Ordnerstruktur

Die Ordnerstruktur des Freewar Helpers:

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

