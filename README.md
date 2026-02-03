# OMNI.TOOL - Developer Utilities

A premium suite of developer tools built with React, Vite, and Tailwind CSS.

[**Live Demo**](https://text-translator-app-indol.vercel.app/)

## Features

### 1. AI Translator
Translate text between multiple languages using the Google Translate API.

**How to use:**
1.  **Get an API Key**: You need a RapidAPI Key for `google-translate1`.
    *   Go to [RapidAPI](https://rapidapi.com/googlecloud/api/google-translate1).
    *   Subscribe (there is a free tier) to get your key.
2.  **Enter Key**: Paste your key into the "Paste RapidAPI Key here..." input field in the app.
3.  **Translate**:
    *   Select your source language (e.g., English).
    *   Select your target language (e.g., Spanish).
    *   Type text in the input box.
    *   The translation will appear automatically after you stop typing (debounced).

### 2. Secure Key Generator
Generate random, secure strings for passwords, API keys, or secrets.

**How to use:**
1.  **Adjust Length**: Use the slider to choose a length (6-64 characters).
2.  **Toggle Options**: Check/Uncheck "Numbers" or "Symbols" to customize complexity.
3.  **Generate**: Click "GENERATE NEW KEY" to create a fresh string.
4.  **Copy**: Click the copy icon (clipboard) or the generated text itself to copy it to your clipboard.

## Installation

```bash
npm install
npm run dev
```

## Technologies
- React 19
- Tailwind CSS v3
- Vite
- Glassmorphism UI
