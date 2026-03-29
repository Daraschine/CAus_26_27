# Centralausschuss Zofingia HSG — 2026–2027

Static website presenting the executive committee (Centralausschuss) of Zofingia HSG.  
Hosted via **GitHub Pages** — no server, no build step required.

---

## Repository structure

```
zofingia-caus-hsg/
├── index.html          Main page
├── style.css           All styles
├── members.js          Member data (DE + FR)
├── modal.js            Modal open/close logic
├── animation.js        Intro logo animation
├── i18n.js             DE/FR language switching
├── README.md
└── assets/
    ├── logos/
    │   ├── CAus_Logo_PNG_weiss.png
    │   └── CAus_Logo_version_ohne_Logo_weiss.png
    └── photos/
        ├── Zugi2.jpeg
        ├── Der_gutaussehende_Zone.jpg
        ├── GnüssLinn.jpg
        ├── FIXI.jpeg
        ├── QCT.jpeg
        ├── Zdi.jpg
        ├── Torronté.jpeg
        └── Kaschmir.jpg
```

---

## Deploying to GitHub Pages

1. Create a repository on GitHub.
2. Push all files to the `main` branch:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/YOUR-ORG/zofingia-caus-hsg.git
   git push -u origin main
   ```
3. Go to **Settings → Pages → Source → Deploy from branch → main / root**.
4. The site goes live at `https://YOUR-ORG.github.io/zofingia-caus-hsg/`.

---

## YouTube video

The video is already embedded: `https://youtu.be/UvAum-MQOgo`

To change it in the future, find this line in `index.html` inside `<section class="video-section">`:

```html
<iframe src="https://www.youtube.com/embed/UvAum-MQOgo" ...>
```

Replace the ID (`UvAum-MQOgo`) with the new YouTube video ID (the part after `?v=` or after `youtu.be/`).

---

## Updating for the next CAus year

1. Replace photos in `assets/photos/` (or update paths in `members.js`).
2. Edit all member entries in `members.js`.
3. Update `2026 – 2027` in `index.html` (topbar + title tag).
4. Replace `CAus_Logo_version_ohne_Logo_weiss.png` if the year is baked into the design.
5. Commit and push — GitHub Pages redeploys within ~60 seconds.

---

*Zofingia · Patriae, Amicitiae, Litteris*
