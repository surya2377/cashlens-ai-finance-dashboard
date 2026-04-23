# CashLens — AI-Powered Personal Finance Dashboard

Upload your bank statement and get instant insights powered by Google Gemini AI.

## 🚀 Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Up Your API Key

**IMPORTANT:** This app requires a Google Gemini API key. Your previous keys were exposed in the source code and should be rotated immediately.

1. **Get a new Gemini API key:**
   - Visit [Google AI Studio](https://aistudio.google.com/app/apikey)
   - Create or rotate your API key
   - **REVOKE** the old keys: `AIzaSyCtDoEO8zhs8-qnBAIBFwPPibH5rA4_0XI` and `AIzaSyCekj1CaJbVw6eU0xNIvujCpQm6UoPSfYw`

2. **Create a `.env` file** in the project root:
   ```bash
   cp .env.example .env
   ```

3. **Add your API key** to `.env`:
   ```
   VITE_GEMINI_API_KEY=your_new_api_key_here
   ```

4. **Never commit `.env`** — it's already in `.gitignore` to protect your key.

### 3. Run the Development Server

```bash
npm run dev
```

Open the URL shown in your terminal (usually `http://localhost:5173`).

### 4. Build for Production

```bash
npm run build
npm run preview  # Preview the production build
```

## 🔧 What Was Fixed

This version includes critical bug fixes from the original:

### **Critical API Bug Fixed:**
- **Problem:** Gemini 2.5 Flash's "thinking mode" was silently consuming all tokens without producing visible output, causing `TypeError: Cannot read properties of undefined (reading '0')`.
- **Fix:** Added `thinkingConfig: { thinkingBudget: 0 }` to disable thinking mode.
- **Result:** API calls now work reliably and return visible responses.

### **Security Improvements:**
- Removed hardcoded API keys from source code
- Added `.env` support for secure key management
- Updated `.gitignore` to exclude `.env` files
- Added `.env.example` as a template

### **Better Error Handling:**
- Properly catches empty responses with detailed error messages
- Shows actual `finishReason` (like `MAX_TOKENS`) instead of cryptic TypeErrors
- Handles rate limits with automatic retries and clear logging

### **Additional Improvements:**
- Added `responseMimeType: "application/json"` for guaranteed JSON output
- Improved retry logic with better error messages
- Fixed edge cases in response parsing

## 📁 File Structure

```
cashlens-app/
├── src/
│   ├── cashlens.jsx         # Main app component (FIXED)
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── public/                   # Static assets
├── .env.example              # API key template
├── .env                      # Your API key (create this, never commit)
├── .gitignore               # Updated to exclude .env
├── package.json
└── README.md                # This file
```

## 🎯 How to Use

1. **Start the app** with `npm run dev`
2. **Upload a bank statement** (CSV or PDF format)
   - CSV should have columns: `date`, `description`, `amount` (or `debit`/`credit`)
3. **Wait for AI analysis** (~15-30 seconds depending on statement size)
4. **Explore your dashboard:**
   - Overview: Income, expenses, health score
   - Transactions: All parsed transactions with AI categorization
   - Subscriptions: Auto-detected recurring charges
   - AI Insights: CFO-level financial analysis
   - Projections: Future spending forecast
   - Chat: Ask questions about your finances in plain English

## 🔒 Security & Privacy

- **Your data never leaves your browser** except for AI API calls to Google Gemini
- **Statements are not stored** — everything is processed in-memory
- **API keys are environment variables** — never hardcode them in source code
- **If you share this code:** Make sure `.env` is excluded via `.gitignore`

## ⚠️ Important Notes

### If API Still Fails After These Fixes:

1. **Check your API key is valid:**
   ```bash
   # Test with this command (replace with your key):
   GEMINI_API_KEY=your_key_here node list_models.js
   ```

2. **Verify .env is loaded:**
   - Check the dev server output for errors
   - Restart the dev server after creating `.env`
   - Vite only reads `.env` on startup, not on file change

3. **Check browser console:**
   - Open DevTools → Console
   - Look for specific error messages
   - The improved error handling will show the actual API response

### Rate Limits:

- Free tier: 15 requests per minute, 1,500 per day
- If you hit limits, the app will auto-retry after 10 seconds
- Consider upgrading to paid tier for heavy usage

## 🛠️ Tech Stack

- **Frontend:** React + Vite
- **Charts:** Recharts
- **Icons:** Lucide React
- **AI:** Google Gemini 2.5 Flash
- **PDF Parsing:** PDF.js

## 📝 License

This is a personal finance tool. Use at your own discretion.

---

## Need Help?

If the app still doesn't work after following these steps:

1. Check the browser console for errors
2. Verify your API key is valid at [AI Studio](https://aistudio.google.com/app/apikey)
3. Make sure you've rotated the old exposed keys
4. Check that `.env` file exists and has the correct format
5. Restart the dev server after any `.env` changes

The error messages are now much more detailed — they'll tell you exactly what went wrong with the API call.
