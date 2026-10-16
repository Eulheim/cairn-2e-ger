# cairn-2e-ger — Deutsche Übersetzung für Cairn 2e (Foundry VTT)

Dieses Modul fügt dem System **Cairn 2e** für Foundry VTT die Sprache **Deutsch** hinzu:
Oberfläche und Kompendien (via [Babele](https://gitlab.com/riccisi/foundryvtt-babele)).

Es übersetzt nur das System Cairn 2e, nicht die Foundry-VTT-Oberfläche selbst.

## Installation

1. Installiere das System [cairn2e](https://github.com/brunocalado/cairn2e).
2. Installiere das Babele-Modul.
3. Installiere dieses Modul über die Manifest-URL:
   `https://github.com/Eulheim/cairn-2e-ger/releases/latest/download/module.json`
4. Stelle in Foundry die Sprache auf **Deutsch** (das Modul bietet den Wechsel beim Start an).

## Übersetzungsstand

Vollständig übersetzt:

- Komplette Oberfläche (`lang/de.json`, 1354 Schlüssel)
- Charaktererschaffung: Hintergründe-Tabellen folgt, Merkmale, Bänder, Omen
- Ausrüstung: Rüstungen, Waffen, Ausrüstung, Materialien, Tränke
- Magie: Zauberbücher und Schriften (Schriften werden automatisch aus den
  Zauberbüchern abgeleitet)
- Referenz: Spieltabellen (Schicksalswürfel, Reaktionen, Narben), Gefährten,
  Makros, Kompendiumsordner

Als Arbeitsdateien unter `tools/work/` vorbereitet (Englisch; Werte in-place
übersetzen, dann `apply`):

- Hintergründe (`backgrounds`), Hintergrund-Tabellen, Hintergrund-Ausrüstung
- Relikte, Spieler-Handbuch, Vald-Kalender
- Bestiarium, Gefolge, Wächter-Kompendium
- Mehr Ausrüstung, weitere Zauberbücher/Schriften

## Wartung

Nach Änderungen am Cairn-2e-System (Quelle: `brunocalado/cairn2e`):

```bash
CAIRN_SYSTEM_DIR=/pfad/zu/cairn2e node tools/translations.mjs check   # was ist neu/geändert/fehlerhaft
CAIRN_SYSTEM_DIR=/pfad/zu/cairn2e node tools/translations.mjs todo    # Arbeitsdateien schreiben
# Werte in tools/work/*.json übersetzen, dann:
CAIRN_SYSTEM_DIR=/pfad/zu/cairn2e node tools/translations.mjs apply    # übernehmen, Schriften neu erzeugen
```

Das Skript prüft HTML-Tags, `@UUID`-Links, Würfelangaben und
Platzhalter — deutsche Namen sollten kompakt bleiben (das Skript warnt bei
Überlängen, da Deutsch länger als Englisch ist und die Bögen schmal sind).

## Lizenz

- Modul-Code: **GPL-3.0** (wie [cairn2e-ptbr](https://github.com/brunocalado/cairn2e-ptbr),
  das auch als Vorlage für Struktur und Wartungsskript diente).
- Übersetzte SRD-Inhalte: **CC-BY-SA 4.0**, Namensnennung **Yochai Gal**
  ([Cairn 2e SRD](https://cairnrpg.com), [deutsches Cairn-SRD](https://de.cairnrpg.com/cairn-srd/)).
  Dieselbe Lizenz gilt für Weitergabe und Bearbeitung der Übersetzung.

## Credits

- [Cairn 2e](https://cairnrpg.com) von Yochai Gal (CC-BY-SA 4.0)
- System-Implementierung: [brunocalado/cairn2e](https://github.com/brunocalado/cairn2e)
- Vorlage: [cairn2e-ptbr](https://github.com/brunocalado/cairn2e-ptbr) (GPL-3.0)
