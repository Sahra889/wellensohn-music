# WellenSohn – Musik & Geschichten

Fertige statische Website für GitHub Pages. Keine Installation, kein Build, kein API-Schlüssel und kein laufender PC erforderlich.

## Inhalt

- 21 öffentlich auf dem angegebenen SoundCloud-Profil gelistete Tracks (Stand 01.10.2026).
- Heruntergeladene Original-Artworks, eigene deutsche Begleittexte, Originalbeschreibungen und SoundCloud-Links.
- Cover-Kacheln, Track-Dialoge mit Artwork im Hintergrund, Jahresfilter und Suche.
- SoundCloud-Player werden erst nach dem Klick auf „Auf dieser Seite anhören“ eingebunden. Audio startet nicht automatisch.
- Kurzer Musikabschnitt auf Basis des öffentlichen Profils und der Veröffentlichungsabfolge. Keine erfundene persönliche Biografie.

## Live-Website

Seit 02.10.2026 veröffentlicht: https://wellensohn-packman.github.io/wellensohn-music/

GitHub-Benutzername am 03.10.2026 auf `WellenSohn-PackMan` geändert; die neue Website-Adresse wurde im Browser geprüft.

GitHub Pages verwendet Branch `brain`, Ordner `/ (root)`. Änderungen an diesem Branch werden automatisch veröffentlicht.

## Auf GitHub Pages veröffentlichen

1. Ein neues Repository für diese Website erstellen. Bei GitHub Free ein öffentliches Repository wählen.
2. Den Inhalt dieses Ordners (index.html, style.css, app.js, tracks.js, sources.json, assets und .nojekyll) in das Repository hochladen.
3. Unter Settings → Pages → Build and deployment „Deploy from a branch“ wählen.
4. Branch `brain`, Ordner `/ (root)` auswählen und speichern.
5. Nach erfolgreicher Veröffentlichung die in Pages angezeigte URL öffnen.

Relative Assetpfade unterstützen sowohl Benutzerseiten als auch Projektseiten unter einem Unterpfad. Es werden keine vorhandenen Repositories geändert.

## Inhalte ändern

`tracks.js` enthält die 21 Einträge mit Titel, Künstlerangabe, Datum, Coverpfad, Originalbeschreibung, Begleittext und Quelllink. Der Datenbestand ist ein statischer Stand und aktualisiert sich nicht automatisch. Bei Ergänzungen auch die Gesamtzahl und den hervorgehobenen Track im HTML aktualisieren.

Die Künstlerangaben stammen aus Beschreibungen, Titeln oder Cover-Aufschriften. Bei nicht gesondert bezeichneten Titeln wird der Profilname WellenSohn verwendet. „Matin Books – Berghain Stalker“ bleibt mit der Künstlerangabe Matin Books im Archiv und wird nicht als WellenSohn-Eigenkomposition bezeichnet. Quellen und Textgrundlage stehen in `sources.json`.

Die neuen Texte sind kreative Deutungen von Cover, Titel und vorhandenen Beschreibungen/Tags. Sie behaupten weder persönliche Erlebnisse noch einen eigenen Hörtest. Die vollständigen Originalbeschreibungen lassen sich im Track-Dialog öffnen.

## Prüfung

JavaScript-Syntax, Trackanzahl, eindeutige IDs und Links, vorhandene Bilddateien, lesbare Bildformate und lokale HTML-Referenzen wurden geprüft. Die veröffentlichte Website wurde am 02.10.2026 im Desktop-Browser geprüft: Darstellung, Suche, Jahresfilter, Track-Dialoge, Trackwechsel und Schließen per Escape funktionieren. Der SoundCloud-Player lädt den ausgewählten Track. Audioausgabe und Bedienung auf einem echten Mobilgerät wurden nicht geprüft. GitHub Pages hat die Bereitstellung erfolgreich abgeschlossen.

Externe Verbindung im Besucherbrowser: SoundCloud erst nach aktivem Laden eines Players oder Öffnen eines SoundCloud-Links. Die Cover liegen lokal. Keine Analyse- oder Tracking-Skripte werden von der Website selbst eingebaut.

## Artworks (03.10.2026)

Eigenständige Galerie unter `artworks.html`, verlinkt in der Hauptnavigation. Erster Beitrag: `artworks/was-weiterklingt.html` (Was weiterklingt), mit vollständig sichtbarem Bild, freigegebenem Text, Direktlink und Teilen-Funktion mit Kopierfallback. Die Artworks-Seiten funktionieren zum Lesen auch ohne JavaScript. `artworks.css` enthält die Galeriegestaltung und die mobile Navigation. `artworks.js` ergänzt ausschließlich das Teilen. Optimierte Bildvarianten liegen in `assets/artworks/`.

Weitere Beiträge als eigene HTML-Seite unter `artworks/` ergänzen und in der Galerie verlinken; relative Links und Canonical-/Open-Graph-Metadaten anpassen. Musikbestand und Player bleiben unabhängig vom Artwork-Bereich.

## Besucherbereiche (03.10.2026)

`ueber.html`: Künstler-Vorstellung, Kontakt über das bestätigte SoundCloud-Profil und Folgen via SoundCloud/RSS. Keine private E-Mail oder unbestätigte Social-Media-Adresse wird veröffentlicht. Für Threads fehlt der bestätigte Profil-Link.

`feed.xml` enthält 22 Einträge (21 Tracks und ein Artwork). Nach Änderungen an `tracks.js` oder neuen HTML-Beiträgen in `artworks/` den Feed mit `python3 tools/build-feed.py` neu erzeugen und veröffentlichen. Keine automatische SoundCloud-Synchronisation.

Kommentare zu `Was weiterklingt`: Issue #1. Laden erst nach Klick über die öffentliche GitHub-API. Schreiben auf GitHub mit GitHub-Konto. Kommentare werden als Klartext dargestellt, ohne HTML, eingebettete Bilder oder Links. Nach den ersten 30 Kommentaren verweist die Seite auf das vollständige Gespräch. Bei Netzfehlern oder API-Limits bleibt der direkte Link verfügbar. Moderation im GitHub-Repository; keine automatische Vorabfreigabe. Für neue Artworks einen eigenen Diskussionsort konfigurieren.

Prüfung: statische Links/Anker, Track-Verweise, RSS-XML und JavaScript-Syntax. Funktionsprüfungen bestanden: opt-in-Kommentarabruf, sichere Textdarstellung, ausgeblendete Kommentare, leere Antworten, Fehler-/Retryzustände sowie Feed-Kopieren mit manuellem Fallback. Praktische Smartphone-Prüfung weiterhin offen.
