# ContactHub

A simple, responsive contact management web application built with vanilla JavaScript, Bootstrap 5, and localStorage. No frameworks, no build tools — just clean HTML, CSS, and JS.

## Features

- **Add, edit, and delete contacts** through a modal form
- **Favorite and emergency toggles** with instant visual feedback
- **Live search** by contact name
- **Real-time form validation** with regex rules:
  - Name: letters and spaces only (2–50 characters)
  - Phone: Egyptian mobile numbers (010, 011, 012, 015 prefixes, 11 digits)
  - Email: standard email format
- **Statistics cards** showing total, favorites, and emergency counts
- **Sidebar quick-access** lists for favorites and emergency contacts
- **Persistent storage** using localStorage — data survives page refreshes
- **Responsive design** that works on desktop and mobile

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Structure | HTML5 |
| Styling | CSS3 + Bootstrap 5 |
| Logic | Vanilla JavaScript (ES5 style) |
| Icons | Font Awesome 6 |
| Alerts | SweetAlert2 |
| Storage | Browser localStorage |

## Project Structure

```
contacthub/
├── css/
│   ├── bootstrap.min.css
│   └── style.css
├── js/
│   ├── bootstrap.bundle.min.js
│   └── index.js
├── images/
│   └── avatar-2.jpg
├── index.html
└── README.md
```

## How to Run

1. Download or clone the repository
2. Open `index.html` in any modern browser
3. No server or build step required

## Code Conventions

This project intentionally uses a restricted JavaScript subset for educational clarity:

- `var` for all variable declarations
- `function` declarations only (no arrow functions)
- `getElementById()` for DOM access (no `querySelector`)
- `onclick` / `oninput` attributes for event handling (no `addEventListener`)
- `for` loops for iteration (no `forEach`, `map`, `filter`, or `reduce`)
- Template literals for HTML generation
- Single-responsibility functions — each function does one job

## License

MIT License — free to use, modify, and distribute.
