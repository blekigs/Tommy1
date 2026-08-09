# Holz- & Elektrobau Schröder — Website (Paket L, Preview)

Conversion-fokussierte, **mobile-first** Multipage-Website für einen Handwerksbetrieb
(Holzbau + Elektrobau). Statisches HTML/CSS/JS — **kein Build-Step**, sofort lauffähig
und überall als statische Seite deploybar.

> ⚠️ **Preview-Version.** Enthält Platzhalter (`[PLATZHALTER: …]`) für echte Daten, Logo
> und Projektfotos. **Kein** SEO-Meta / **kein** JSON-LD (kommt bewusst erst in Phase 2).

---

## Seitenstruktur

| Datei | Inhalt |
|------|--------|
| `index.html` | Startseite — Hero, Über-uns-Teaser, Stats, Leistungs-Teaser, Kundenstimmen, CTA |
| `ueber-uns.html` | Über uns — Geschichte, Werte, Stats |
| `leistungen.html` | Leistungen mit Tabs **Holzbau / Elektrobau** (je Eintrag ein Foto) + **Leistungspakete / Preisliste** |
| `galerie.html` | Galerie mit Kategorie-Tabs (Holzbau / Elektro / Referenzprojekte) |
| `kontakt.html` | Kontaktformular, Adresse/Tel/Mail/Öffnungszeiten, **interaktive Google Maps**, Social Links |
| `impressum.html` · `datenschutz.html` · `agb.html` | Rechtliche Pflichtseiten (Platzhaltertexte) |

```
schroeder-holz-elektrobau/
├── index.html · ueber-uns.html · leistungen.html · galerie.html · kontakt.html
├── impressum.html · datenschutz.html · agb.html
├── css/style.css        # komplettes Design-System, mobile-first
├── js/main.js           # Nav, Scroll-Reveal, Tabs, Galerie-Filter, Formular
├── assets/logo-placeholder.svg
├── README.md · .gitignore
```

---

## Starten (lokal)

Reines HTML — `index.html` lässt sich direkt im Browser öffnen. Für korrektes Verhalten
(relative Pfade, `fetch`-freundlich) empfiehlt sich ein kleiner lokaler Server:

```bash
# Variante 1: Python (vorinstalliert auf den meisten Systemen)
python -m http.server 5173
#   → http://localhost:5173

# Variante 2: Node
npx serve .

# Variante 3: VS Code „Live Server“-Extension → Rechtsklick auf index.html
```

## Deployment

Statische Seite — einfach den Ordnerinhalt hochladen. Funktioniert u. a. mit
Netlify (Ordner droppen), Vercel, GitHub Pages oder klassischem Webhosting (FTP).

---

## Anpassen (für den Go-Live)

1. **Echte Daten:** Alle `[PLATZHALTER: …]` ersetzen — Adresse, Telefon, E-Mail,
   Öffnungszeiten, WhatsApp-Nummer, Social-Media-URLs.
   - Telefon-Links: `href="tel:+49..."` · WhatsApp: `href="https://wa.me/49..."`
2. **Logo:** Den klar markierten `LOGO PLACEHOLDER`-Block (`.logo-mark`) in Header & Footer
   durch `<img src="assets/logo.svg" …>` ersetzen. `assets/logo-placeholder.svg` als Vorlage.
3. **Bilder:** Unsplash-Platzhalter durch eigene Projektfotos tauschen
   (`src`-Attribute + `alt`-Texte). Fällt ein Bild aus, greift ein farbiger Fallback.
4. **Google Maps:** In `kontakt.html` die `q=…`-Adresse in der `iframe`-URL anpassen.
5. **Formular:** Aktuell Preview (zeigt Erfolgsmeldung, versendet nicht). Versand-Backend
   bzw. Form-Service (z. B. Formspree, eigenes PHP) in `js/main.js` / `<form>` ergänzen.
6. **Farben/Fonts:** Zentral in `css/style.css` unter `:root` (`--wood`, `--volt`, …).

---

## Design & Technik

- **Farbkonzept:** warmes, helles Theme (Papier-Off-White `#faf6f0`), Holzton *Oak*
  `#8c5e22` / `#c89b5a` + technischer Akzent *Electric Blue* `#2f6fe0`.
  Fonts: **Bricolage Grotesque** (Headings) + **Hanken Grotesk** (Body).
- **Mobile-first:** Layout von 320px aufwärts, Touch-Targets ≥ 44px, `viewport-fit=cover`
  + `env(safe-area-inset-*)`, Inputs ≥ 16px (kein iOS-Zoom), kein horizontaler Overflow.
- **Performance:** lazy-load Bilder, responsive Bild-Parameter, minimal JS (vanilla,
  keine Abhängigkeiten), `prefers-reduced-motion` respektiert.
- **Interaktionen:** Sticky Header (transparent → blur), Hamburger + Fullscreen-Overlay,
  Scroll-Reveal (IntersectionObserver), Tab-Wechsel, Galerie-Filter, WhatsApp-Float.

---

*Erstellt als Client-Preview. SEO-Optimierung & strukturierte Daten folgen in Phase 2.*
