# Wail Rhazouani Portfolio

Static portfolio site hosted on GitHub Pages.

## View online

https://wailrhazouani-tech.github.io/Portfolio/

## Local development

To run locally:

```bash
uv sync
uv run python app.py
```

Or simply open `docs/index.html` in a browser for the static version.

## Structure

- **`docs/`** — Static site (deployed to GitHub Pages)
- **`static/`** — Original assets and stylesheets
- **`templates/`** — Original Flask templates
- **`app.py`** — Flask app (no longer used, kept for reference)

## Pages

- Home
- Bio
- Portfolio
- Elevator Pitch (placeholder)

## Notes

- The static HTML is in the `docs/` folder and automatically served by GitHub Pages
- The portrait image and PDF live in `docs/assets/`
- All content is static HTML with no backend required
