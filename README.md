
# 🎮 Guess Who? — Vue 3 + Vite + Tailwind

An interactive “Guess Who?” game built with Vue 3 using the Composition API, Vite, and Tailwind CSS. Supports category selection (Anime, Movie, Real Person), multilingual interface (English / 日本語), dynamic backgrounds, and ChatGPT API integration.

⚠️ You can provide the key either **locally via `.env` file** or **via URL param** in the browser.

---

## ✨ Features

- 🎨 Modern design with Tailwind
- 💬 Chat interface powered by ChatGPT
- 🌐 🇬🇧 English / 🇯🇵 日本語
- 🎭 Anime / Movie / Real Person
- 📸 Dynamic background
- 🔢 Limit: 15 questions
- 📱 Mobile-ready

---

## 🚀 Quick Start

Create `.env` file and add your OpenAI API key:
```bash
npm install
npm run dev
```
---

## ⚙️ OpenAI API Setup
Option 1: Local via .env
```js
VITE_API_KEY=API_KEY
```
Option 2: Via URL param (no .env required)
```
https://game-domain.com?key=sk-xxxxxxxxxxxxxxxxxxxxxxx

```

---

## 📁 Structure

```
src/
├── components/
│   ├── CategorySelector.vue
│   ├── ChatWindow.vue
│   ├── QuickReplies.vue
├── assets/
│   └── images/
├── App.vue
├── main.ts
```

## 📄 License

MIT
