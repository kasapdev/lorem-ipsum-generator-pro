# Lorem Ipsum Generator Pro

[![CI](https://github.com/kasapdev/lorem-ipsum-generator-pro/actions/workflows/ci.yml/badge.svg)](https://github.com/kasapdev/lorem-ipsum-generator-pro/actions/workflows/ci.yml)

Generate placeholder text — classic Latin lorem ipsum or original themed word banks — as words, sentences, paragraphs, or list items.

> A premium, zero-dependency placeholder-text generator. Pick a unit and count, choose a word bank (classic Latin, Tech Jargon, Corporate Buzzwords, or Space & Sci-Fi), optionally open with the familiar "Lorem ipsum dolor sit amet…", and export as plain text or ready-to-paste HTML — all in your browser, with nothing ever leaving your machine.

## Overview

Lorem Ipsum Generator Pro is part of the **Web Utility Suite**. It runs entirely in the browser with no build step, no frameworks, and no network calls — open `index.html` from disk and it works. Every sentence and paragraph is built on the fly from a chosen word bank, with realistic length variance, so output never feels mechanically repetitive.

## Features

- **Four output units** — words, sentences, paragraphs, or list items, 1–500 at a time.
- **Four word banks** — classic Latin lorem ipsum, plus three original themed banks written for this tool: **Tech Jargon**, **Corporate Buzzwords**, and **Space & Sci-Fi** — each with 50+ distinct words.
- **Classic opener toggle** — prepend the familiar "Lorem ipsum dolor sit amet, consectetur adipiscing elit." to the first unit, for any word bank.
- **Plain text or HTML output** — paragraphs wrap in `<p>`, list items in `<ul>/<li>`; the HTML view shows the literal markup as readable, escaped source.
- **Realistic generation** — sentences vary 8–16 words, paragraphs group 3–7 sentences, so output reads naturally instead of looking templated.
- **Live word/character stats** on every generation.
- **Copy** and **Download** (`.txt` or `.html` depending on output mode).
- **Auto-persist** — your last unit, count, word bank, and toggles are saved to `localStorage` and restored on return.
- **Dark & light themes**, fully responsive down to 360px, accessible, and keyboard-driven.

## Installation

No dependencies, no build step.

```bash
git clone https://github.com/kasapdev/lorem-ipsum-generator-pro.git
cd lorem-ipsum-generator-pro
```

Then simply open `index.html` in any modern browser (double-click it, or `file://` it). That's it.

## Usage

1. Choose a **Unit** (words / sentences / paragraphs / list items) and a **Count**.
2. Pick a **Word bank** — Classic Latin, Tech Jargon, Corporate Buzzwords, or Space & Sci-Fi.
3. Optionally flip **"Start with Lorem ipsum…"** to open with the classic clause, and **HTML tags** to wrap output in markup.
4. Click **Generate** (or press <kbd>Ctrl/⌘</kbd>+<kbd>Enter</kbd>) — output re-generates instantly whenever an option changes.
5. **Copy** the result or **Download** it as `.txt`/`.html`.

## Keyboard Shortcuts

| Action               | Shortcut                       |
| -------------------- | ------------------------------ |
| Generate text         | <kbd>Ctrl/⌘</kbd> + <kbd>Enter</kbd> |
| Show shortcuts help  | <kbd>?</kbd>                    |
| Close dialog         | <kbd>Esc</kbd>                  |

## Screenshots

> _Screenshots coming soon._

![screenshot](docs/screenshot-1.png)
![screenshot](docs/screenshot-2.png)

## Roadmap

- [ ] Custom user-defined word banks saved to `localStorage`
- [ ] Sentence/paragraph length sliders (min/max control)
- [ ] Markdown output mode (`##` headings, `-` lists)
- [ ] Per-paragraph copy buttons

## License

MIT Licensed. Part of the [Web Utility Suite](https://github.com/kasapdev/web-utility-suite).
