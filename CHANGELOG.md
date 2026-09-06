# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

## [1.0.1] - 2026-09-06

### Fixed

- The keyboard shortcuts help modal (`?`) advertised `Ctrl/Cmd+C` — "Copy output (when focused outside inputs)" — but the shortcut was never actually implemented, so pressing it did nothing. It's now wired up: pressing `Ctrl/Cmd+C` while focus is outside the Count field copies the generated output, matching the documented behavior. Native copy of a text selection inside the Count field is left untouched.
