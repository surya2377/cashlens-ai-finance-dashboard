# Quick Setup Checklist ✅

Follow these steps in order to get CashLens running:

## Step 1: Install Dependencies
```bash
npm install
```

## Step 2: Get Your Gemini API Key

🔗 **Go to:** https://aistudio.google.com/app/apikey

- Click "Create API Key"
- Copy the key that starts with `AIzaSy...`

⚠️ **IMPORTANT:** If you previously had keys `AIzaSyCtDoEO8zhs8-qnBAIBFwPPibH5rA4_0XI` or `AIzaSyCekj1CaJbVw6eU0xNIvujCpQm6UoPSfYw` in your code, **delete them immediately** from Google AI Studio. They were exposed in your source code.

## Step 3: Create .env File

In the project root folder (where `package.json` is), create a file named `.env`:

```bash
cp .env.example .env
```

Then open `.env` and paste your API key:

```
VITE_GEMINI_API_KEY=AIzaSy...your_actual_key_here...
```

## Step 4: Start the App

```bash
npm run dev
```

You should see:
```
  VITE v8.0.10  ready in XXX ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
```

Open http://localhost:5173/ in your browser.

## Step 5: Test It

1. Click "Try Demo Data" to see the app working with sample data
2. Or upload your own CSV bank statement

---

## ⚠️ Troubleshooting

### "Missing VITE_GEMINI_API_KEY in .env file"
- You forgot to create the `.env` file
- Or you created it but didn't add your key
- Solution: Make sure `.env` exists in the project root with your key

### "API 403" or "API 400" errors
- Your API key is invalid or revoked
- Solution: Get a fresh key from https://aistudio.google.com/app/apikey

### Changes to .env don't work
- Vite only reads `.env` on startup
- Solution: Stop the dev server (Ctrl+C) and run `npm run dev` again

### Still getting TypeErrors about "parts" or "undefined"
- This was the original bug — it should be fixed now
- If you still see it, your `.env` file might not be loading
- Check: Is the file named exactly `.env` (not `.env.txt`)?
- Check: Is it in the same folder as `package.json`?

---

## 🎉 You're Done!

If you see the CashLens upload screen, you're all set. Upload a CSV bank statement and watch it work!
