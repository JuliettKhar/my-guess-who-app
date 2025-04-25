
# 🎮 Guess Who? — Vue 3 + Vite + Tailwind

An interactive “Guess Who?” game built with Vue 3 using the Composition API, Vite, and Tailwind CSS. Supports category selection (Anime, Movie, Real Person), multilingual interface (English / 日本語), dynamic backgrounds, and ChatGPT API integration.

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

```bash
npm install
npm run dev
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
│   └── images/       # category backgrounds
├── App.vue
├── main.js
```

---

## ⚙️ OpenAI API Setup
 
Replace in `App.vue`:

```js
headers: {
  'Authorization': 'Bearer YOUR_API_KEY'
}
```

---

## ✅ Formatting

```bash
npm run lint     # ESLint
npx prettier . --write
```

---

## 📄 License

MIT
