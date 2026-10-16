/*!
 * Cairn 2e - Deutsche Übersetzung
 * 2026 https://github.com/Eulheim
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License version 3.
 */

import { MODULE_ID, SETTING_LANGUAGE_PROMPTED, LANGUAGE_PANEL_MENU, QUERIES } from "./constants.js";
import LanguagePanel from "./language-panel.js";

// Babele reads compendium/<system>.<pack>.json; the system's docs/translating.md is the contract
// for what those files may translate.
Hooks.once("babele.init", (babele) => {
  // Cairn keeps descriptions in `system.description` (a plain HTML string), not Babele's default
  // `system.description.value`. Registered globally rather than per file so the Items embedded in
  // bestiary and hireling Actors are covered too.
  babele.registerMapping({
    Item: { description: "system.description", recharge: "system.recharge" },
    Actor: { description: "system.description", career: "system.career" }
  });
  babele.register({ module: MODULE_ID, lang: "de", dir: "compendium" });
});

// Automated Animations plays an entry when its label is part of the used item's name, so the
// system's English labels miss every translated item. Each key is a label from the system's
// module/automated-animations-menu.js; each value is the part of the German names it must
// match. Unarmed follows CAIRN.Unarmed on its own and needs nothing here.
// AA's own default entries (Sword, Dagger, Spear, Mace, Bite, Claw…) only know English names, and
// the hook accepts no label of theirs. The German names that have a system entry with the
// same animation ride on it: Adaga on Knife (dagger), Lança on Trident (spear), Maça on Flail
// (mace), Espada on Falchion, Mordida on Beak (creature bite), Garra on Talons (creature claw).
// Rapieira, Arco, Besta and Curar Ferimentos have none, and stay unanimated.
Hooks.on("cairn2e.animationLabels", (labels) => {
  Object.assign(labels, {
    "Axe": ["Axt", "Äxte"],
    "Club": ["Keule", "Knüppel"],
    "Cudgel": ["Knüppel"],
    "Flail": ["Flegel", "Morgenstern"],
    "Sickle": ["Sichel"],
    "Halberd": ["Hellebarde"],
    "Hammer": ["Hammer"],
    "Staff": ["Stab"],
    "Knife": ["Messer", "Dolch"],
    "Falchion": ["Krummschwert", "Schwert"],
    "Trident": ["Dreizack", "Lanze", "Speer"],
    "Fists": ["Fäuste"],
    "Sling": ["Schleuder"],
    "Throwing Knives": ["Wurfmesser"],
    "Blunderbuss": ["Donnerbüchse"],
    "Tentacles": ["Tentakel"],
    "Talons": ["Krallen"],
    "Beak": ["Schnabel", "Biss"],
    "Horn": ["Horn"],
    "Gore": ["Haupte, Geweih, Stoßzähne"],
    "Sting": ["Stachel"],
    "Touch": ["Berührung"],
    "Breath": ["Odem"],
    "Shield": ["Schild"],
    "Ward": ["Schutz"],
    "Haste": ["Eile"],
    "Sleep": ["Schlaf"],
    "Charm": ["Bezaubern"],
    "Hypnotize": ["Hypnose"],
    "Befuddle": ["Verwirren", "Verwirrung"],
    "Pacify": ["Besänftigen"],
    "Phobia": ["Phobie"],
    "Command": ["Befehl"],
    "Web": ["Netz", "Spinnennetz"],
    "Thicket": ["Gestrüpp"],
    "Control Plants": ["Pflanzen kontrollieren"],
    "Night Sphere": ["Nachtkugel"],
    "Elemental Wall": ["Elementarwand"],
    "Detect Magic": ["Magie entdecken"],
    "Cone of Foam": ["Schaumkegel"],
    "Icy Touch": ["Eisige Berührung"],
    "Flare": ["Leuchtsignal"],
    "Illuminate": ["Erleuchten"],
    "Push/Pull": ["Stoßen/Ziehen"],
    "Repel": ["Abstoßen"],
    "Telekinesis": ["Telekinese"],
    "Earthquake": ["Erdbeben"],
    "Pit": ["Grube"],
    "Fog Cloud": ["Nebelwolke"],
    "Smoke Form": ["Rauchgestalt"],
    "Arcane Eye": ["Arkanauges"],
    "Vision": ["Vision"],
    "True Sight": ["Wahrsicht"],
    "Wizard Mark": ["Magierzeichen"],
    "Raise": ["Erheben", "Auferwecken"],
    "Teleport": ["Teleport"]
  });
});
});

Hooks.once("init", () => {
  // User scope (per world, per user) even though `core.language` is per client: a "no" given in
  // one world, or a browser switched back to English for another system, must not silence the
  // offer in every Cairn world on that browser.
  game.settings.register(MODULE_ID, SETTING_LANGUAGE_PROMPTED, {
    scope: "user",
    config: false,
    type: Boolean,
    default: false
  });

  // Hardcoded in German like the offer dialog: the GM opening it may not be in German yet.
  game.settings.registerMenu(MODULE_ID, LANGUAGE_PANEL_MENU, {
    name: "Sprache der Spieler",
    label: "Öffnen",
    hint: "Zeigt die Sprache jedes Spielers, reaktiviert das Angebot, auf Deutsch umzustellen, oder ändert die Sprache verbundener Spieler.",
    icon: "fa-solid fa-language",
    type: LanguagePanel,
    restricted: true
  });

  // The language panel's requests. Any client can call a registered query, so each one checks the
  // server-supplied sender before acting.
  CONFIG.queries[QUERIES.GET_LANGUAGE] = async (data, { user }) => {
    if (!user?.isGM) throw new Error("Only a GM can read a player's language");
    return { lang: game.i18n.lang };
  };
  CONFIG.queries[QUERIES.SET_LANGUAGE] = async (data, { user }) => {
    if (!user?.isGM) throw new Error("Only a GM can change a player's language");
    await game.settings.set("core", "language", "de");
    // Not awaited: the GM's query resolves now, not when the player answers the reload prompt.
    foundry.applications.settings.SettingsConfig.reloadConfirm({ world: false });
    return { ok: true };
  };
  CONFIG.queries[QUERIES.OFFER_LANGUAGE] = async (data, { user }) => {
    if (!user?.isGM) throw new Error("Only a GM can offer the language switch");
    // Not awaited, for the same reason: the dialog waits on the player.
    offerLanguage();
    return { ok: true };
  };
});

Hooks.once("ready", () => {
  if (game.i18n.lang === "de" || game.settings.get(MODULE_ID, SETTING_LANGUAGE_PROMPTED)) return;
  offerLanguage();
});

/**
 * Ask this client whether to switch Foundry to German. The user is marked as asked before the
 * dialog opens, so closing it or reloading counts as an answer.
 */
async function offerLanguage() {
  await game.settings.set(MODULE_ID, SETTING_LANGUAGE_PROMPTED, true);

  // Hardcoded in German: this dialog only appears while the client is NOT in German, so the
  // module's own lang file isn't loaded yet, and its audience reads German.
  const switchLanguage = await foundry.applications.api.DialogV2.confirm({
    // The system's id as a class opts the window into its paper-and-ink styling, the same way the
    // system's own dialogs get it.
    classes: ["cairn2e"],
    window: { title: "Cairn 2e — Deutsch" },
    content: `<img src="modules/${MODULE_ID}/assets/flag-germany.svg" alt="Flagge Deutschlands"`
      + ` style="display: block; width: 120px; margin: 0 auto 0.5rem; border: none;">`
      + "<p>Möchtest du die Sprache von Foundry VTT auf <strong>Deutsch</strong> umstellen?</p>"
      + "<p>Die Welt wird neu geladen. Du kannst das später unter Einstellungen → Sprache ändern.</p>",
    yes: { label: "Ja, umstellen" },
    no: { label: "Nein" },
    rejectClose: false
  });
  if (!switchLanguage) return;
  await game.settings.set("core", "language", "de");
  foundry.utils.debouncedReload();
}
