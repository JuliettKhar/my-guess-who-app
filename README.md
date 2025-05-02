
# 🎮 Guess Who? — Vue 3 + Vite + Tailwind

An interactive “Guess Who?” game built with Vue 3 using the Composition API, Vite, and Tailwind CSS. Supports category selection (Anime, Movie, Real Person), multilingual interface (English / 日本語), dynamic backgrounds, and ChatGPT API integration.

⚠️ This project requires an OpenAI API key to run locally.

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
In .env file:
```js
VITE_API_KEY=OPEN_AI_API_KEY
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
