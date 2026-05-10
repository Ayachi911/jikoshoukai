[README.md](https://github.com/user-attachments/files/27566995/README.md)
# jikoshoukai
こんにちは、あやちです。これは私の自己紹介のウエブサイトです。よろしくね。　
# Ayachi Samyal — Portfolio

## Folder Structure

```
ayachi-portfolio/
├── index.html          ← all sections, edit text marked <!-- EDIT -->
├── css/
│   └── style.css       ← all styles, design tokens at top
├── js/
│   └── main.js         ← theme, scroll, omikuji, interactions
├── assets/
│   └── images/         ← DROP YOUR IMAGES HERE (see list below)
├── vercel.json
└── README.md
```

---

## Images to Upload → `assets/images/`

| Filename            | Where it's used              | Notes                          |
|---------------------|------------------------------|--------------------------------|
| `calligraphy.jpg`   | Hero section background      | Your shodō photo — portrait ok |
| `portrait.jpg`      | About scrapbook polaroid     | Any photo of you               |
| `polaroid-1.jpg`    | About scrapbook              | Japan / personal               |
| `polaroid-2.jpg`    | About scrapbook              | Japan / personal               |
| `polaroid-3.jpg`    | About scrapbook              | Japan / personal               |
| `japan-1.jpg`       | Japan film strip             | Exchange year photos           |
| `japan-2.jpg`       | Japan film strip             |                                |
| `japan-3.jpg`       | Japan film strip             |                                |
| `japan-4.jpg`       | Japan film strip             |                                |
| `japan-5.jpg`       | Japan film strip             |                                |
| `ink-1.jpg`         | Creative / ink art grid      | Micron pen drawings            |
| `ink-2.jpg`         | Creative / ink art grid      |                                |
| `ink-3.jpg`         | Creative / ink art grid      |                                |

Images show a neutral placeholder colour until you upload them. No broken image icons.

---

## What to Edit

Search `<!-- EDIT -->` in `index.html` — every line marked is yours to change:
- Bio text in the About section
- Polaroid captions (write like you'd write with a marker on a photo)
- Film strip captions
- Project descriptions, links, tech stacks
- Omikuji fortunes (also in `js/main.js` → `fortunes` array)
- Contact links (email, GitHub, LinkedIn)
- Footer credit year

---

## Deploy to Vercel

1. Push this folder to a GitHub repo
2. Go to vercel.com → New Project → import repo
3. No build step needed — it's plain HTML/CSS/JS
4. Done

Or via CLI:
```bash
npm i -g vercel
cd ayachi-portfolio
vercel
```

---

## Design Tokens (easy to tweak)

All colours and fonts live at the top of `css/style.css` inside `:root {}`.
Change `--red` to shift the accent colour across the whole site instantly.
