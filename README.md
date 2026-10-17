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

## Release veröffentlichen

Die Release-URLs in `module.json` sind fix und zeigen auf
`releases/latest/download/...` (Muster A). Der GitHub-Workflow
(`.github/workflows/release.yml`) baut bei jedem `v*`-Tag automatisch das
Modul-ZIP und lädt es mit dem Manifest unter immer gleichen Asset-Namen
(`cairn2e-de.zip`, `module.json`) als GitHub-Release hoch.

Checkliste für einen Release:

1. `"version"` in `module.json` erhöhen (z. B. `"0.2.0"` → `"0.2.1"`).
   URLs und Asset-Namen nicht ändern.
2. Commit und Push auf `main`:
   `git commit -am "Release v0.2.1" && git push origin main`
3. Tag setzen und pushen (löst den Workflow aus):
   `git tag v0.2.1 && git push origin v0.2.1`
4. Prüfen, ob der Workflow erfolgreich lief und das Release beide Assets
   enthält (Actions-Tab bzw. Releaseseite).
5. Testen: In Foundry das Modul aktualisieren bzw. einmalig über die
   Manifest-URL installieren:
   `https://github.com/Eulheim/cairn-2e-ger/releases/latest/download/module.json`

Regeln, die das System stabil halten:

- Tag und `"version"` müssen übereinstimmen (`v0.2.1` ↔ `"0.2.1"`),
  sonst bietet Foundry kein Update an.
- Keine Pre-Releases für normale Versionen — `releases/latest` ignoriert
  Pre-Releases, Nutzer erhielten das Update sonst nicht.
- Asset-Namen nie manuell ändern; der Workflow setzt sie automatisch.
- Das ZIP kann lokal vorgeprüft werden:
  `python3 tools/build_zip.py /tmp/cairn2e-de.zip`

## Übersetzungsstand

Vollständig übersetzt:

- Komplette Oberfläche (`lang/de.json`)
- Charaktererschaffung: Spieler-Handbuch (Hintergründe, Merkmale, Vorgeschichten,
  Omen), Hintergrund-Tabellen, Hintergrund-Ausrüstung
- Ausrüstung: Rüstungen, Waffen, Ausrüstung, Materialien, Tränke
- Magie: Zauberbücher und Schriften (Schriften werden automatisch aus den
  Zauberbüchern abgeleitet), weitere Zauberbücher/Schriften
- Referenz: Spieltabellen (Schicksalswürfel, Reaktionen, Narben), Gefährten,
  Makros, Kompendiumsordner, Wächter-Kompendium (Fraktionen, Monster, NSC,
  Gewölbe-/Wildnis-Ereignisse, Vald-Wetter), Relikte, Vald-Kalender,
  Bestiarium, Gefolge, weitere Ausrüstung

Die Übersetzung folgt der offiziellen deutschen Cairn-2e-Ausgabe
(Spielhandbuch v0.4, Übersetzung: Linus Weber et al.) als Terminologie-Referenz.

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
