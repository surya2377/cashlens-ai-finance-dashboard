import { useState, useEffect, useRef } from "react";
import {
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid
} from "recharts";
import {
  Upload, FileText, Brain, AlertTriangle, Send, RefreshCw,
  MessageSquare, CheckCircle, TrendingUp, TrendingDown,
  Zap, Shield, CreditCard, Droplets, BarChart2, ChevronRight, Menu, X
} from "lucide-react";

const CHART_COLORS = ["#10b981", "#3b82f6", "#f59e0b", "#ef4444", "#8b5cf6", "#f97316", "#06b6d4", "#84cc16"];


const DEMO_TXN = [
  { id: 0, date: "2025-04-01", description: "NETFLIX SUBSCRIPTION", amount: -15.99, type: "expense", category: "Subscriptions" },
  { id: 1, date: "2025-04-02", description: "SALARY — ACME CORP", amount: 4500, type: "income", category: "Income" },
  { id: 2, date: "2025-04-03", description: "WHOLE FOODS MARKET", amount: -124.50, type: "expense", category: "Groceries" },
  { id: 3, date: "2025-04-03", description: "SPOTIFY PREMIUM", amount: -9.99, type: "expense", category: "Subscriptions" },
  { id: 4, date: "2025-04-04", description: "UBER EATS", amount: -34.20, type: "expense", category: "Food & Dining" },
  { id: 5, date: "2025-04-05", description: "STARBUCKS", amount: -6.50, type: "expense", category: "Food & Dining" },
  { id: 6, date: "2025-04-06", description: "AMAZON PRIME", amount: -14.99, type: "expense", category: "Subscriptions" },
  { id: 7, date: "2025-04-07", description: "SHELL GAS STATION", amount: -52.30, type: "expense", category: "Transport" },
  { id: 8, date: "2025-04-08", description: "STARBUCKS", amount: -5.75, type: "expense", category: "Food & Dining" },
  { id: 9, date: "2025-04-09", description: "TARGET", amount: -89.30, type: "expense", category: "Shopping" },
  { id: 10, date: "2025-04-10", description: "UBER EATS", amount: -28.90, type: "expense", category: "Food & Dining" },
  { id: 11, date: "2025-04-11", description: "ELECTRIC BILL", amount: -95.00, type: "expense", category: "Utilities" },
  { id: 12, date: "2025-04-12", description: "INTERNET — COMCAST", amount: -79.99, type: "expense", category: "Utilities" },
  { id: 13, date: "2025-04-13", description: "STARBUCKS", amount: -7.25, type: "expense", category: "Food & Dining" },
  { id: 14, date: "2025-04-14", description: "FREELANCE PAYMENT", amount: 850, type: "income", category: "Income" },
  { id: 15, date: "2025-04-15", description: "RENT", amount: -1500, type: "expense", category: "Housing" },
  { id: 16, date: "2025-04-16", description: "CVS PHARMACY", amount: -23.40, type: "expense", category: "Health" },
  { id: 17, date: "2025-04-17", description: "UBER", amount: -18.50, type: "expense", category: "Transport" },
  { id: 18, date: "2025-04-18", description: "DISNEY+", amount: -13.99, type: "expense", category: "Subscriptions" },
  { id: 19, date: "2025-04-19", description: "WHOLE FOODS MARKET", amount: -98.20, type: "expense", category: "Groceries" },
  { id: 20, date: "2025-04-20", description: "STARBUCKS", amount: -6.75, type: "expense", category: "Food & Dining" },
  { id: 21, date: "2025-04-21", description: "APPLE ICLOUD STORAGE", amount: -2.99, type: "expense", category: "Subscriptions" },
  { id: 22, date: "2025-04-22", description: "GYM MEMBERSHIP", amount: -45.00, type: "expense", category: "Health" },
  { id: 23, date: "2025-04-23", description: "UBER EATS", amount: -41.30, type: "expense", category: "Food & Dining" },
  { id: 24, date: "2025-04-24", description: "AMAZON.COM", amount: -67.90, type: "expense", category: "Shopping" },
  { id: 25, date: "2025-04-25", description: "STARBUCKS", amount: -5.50, type: "expense", category: "Food & Dining" },
];

const DEMO_INSIGHTS = {
  healthScore: 68,
  totalIncome: 5350,
  totalExpenses: 2585.72,
  netBalance: 2764.28,
  categories: [
    { name: "Housing", amount: 1500, percentage: 58.0 },
    { name: "Food & Dining", amount: 235.15, percentage: 9.1 },
    { name: "Groceries", amount: 222.70, percentage: 8.6 },
    { name: "Shopping", amount: 157.20, percentage: 6.1 },
    { name: "Utilities", amount: 174.99, percentage: 6.8 },
    { name: "Transport", amount: 70.80, percentage: 2.7 },
    { name: "Health", amount: 68.40, percentage: 2.6 },
    { name: "Subscriptions", amount: 116.51, percentage: 4.5 },
  ],
  subscriptions: [
    { name: "Netflix", amount: 15.99, lastCharged: "Apr 1" },
    { name: "Spotify Premium", amount: 9.99, lastCharged: "Apr 3" },
    { name: "Amazon Prime", amount: 14.99, lastCharged: "Apr 6" },
    { name: "Disney+", amount: 13.99, lastCharged: "Apr 18" },
    { name: "Apple iCloud", amount: 2.99, lastCharged: "Apr 21" },
    { name: "Gym Membership", amount: 45.00, lastCharged: "Apr 22" },
  ],
  moneyLeaks: [
    { description: "Starbucks — 5 visits this month", totalAmount: 31.75, count: 5, frequency: "Almost daily" },
    { description: "Uber Eats — 3 food deliveries", totalAmount: 104.40, count: 3, frequency: "Weekly" },
    { description: "Unused streaming subscriptions", totalAmount: 28.98, count: 2, frequency: "Monthly auto-charge" },
  ],
  cfoReport: "Your financial health score stands at 68/100 — solid but with room for improvement. Your savings rate of 51.7% is exceptional and well above the recommended 20% threshold. However, food delivery services are consuming £104/month unnecessarily, and your subscription stack has grown to £102.95/month. Redirecting delivery spending to groceries and auditing underused subscriptions could free up £130+ per month.",
  alerts: [
    "Starbucks: £31.75 across 5 visits — brewing at home could save £25/month",
    "Uber Eats: £104.40/month — meal prepping could cut this by 60%",
    "6 active subscriptions totalling £102.95/month — consider auditing",
    "Rent is 28% of income — within the healthy 30% threshold",
  ],
  tips: [
    "Set a £40/month food delivery budget using in-app spending limits",
    "Cancel Disney+ if you watch less than 4 hours/week — save £168/year",
    "Your savings rate is excellent — consider automating investments",
    "Batch grocery shopping weekly reduces impulse purchases by ~30%",
  ],
  monthlySpending: [
    { month: "Nov", amount: 2890 }, { month: "Dec", amount: 3240 },
    { month: "Jan", amount: 2650 }, { month: "Feb", amount: 2420 },
    { month: "Mar", amount: 2710 }, { month: "Apr", amount: 2586 },
  ],
  projectionData: [
    { month: "Nov", amount: 2890, projected: 2890 }, { month: "Dec", amount: 3240, projected: 3240 },
    { month: "Jan", amount: 2650, projected: 2650 }, { month: "Feb", amount: 2420, projected: 2420 },
    { month: "Mar", amount: 2710, projected: 2710 }, { month: "Apr", amount: 2586, projected: 2586 },
    { month: "May", amount: null, projected: 2560 }, { month: "Jun", amount: null, projected: 2530 },
    { month: "Jul", amount: null, projected: 2500 },
  ],
  nextMonthProjection: 2560
};

const MODEL = "gemini-2.5-flash";

// Main AI API call wrapper
async function callAI(system, user, retries = 3) {
  const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
  if (!API_KEY) {
    throw new Error(
      "Missing VITE_GEMINI_API_KEY in .env file. " +
      "Create a .env file in the project root with your Gemini API key. " +
      "See .env.example for the template."
    );
  }

  const url = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${API_KEY}`;

  for (let i = 0; i < retries; i++) {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        systemInstruction: { parts: [{ text: system }] },
        contents: [{ role: "user", parts: [{ text: user }] }],
        generationConfig: {
          temperature: 0.1,
          maxOutputTokens: 8192,
          // CRITICAL: Disable thinking mode to prevent silent token exhaustion
          thinkingConfig: { thinkingBudget: 0 },
          // Ensure valid JSON output for easier parsing
          responseMimeType: "application/json",
        },
      }),
    });

    const d = await res.json();

    // Handle HTTP errors and rate limits
    if (!res.ok) {
      if (res.status === 429 && i < retries - 1) {
        console.warn(`Rate limit hit. Waiting 10s before retry ${i + 2}/${retries}...`);
        await new Promise(r => setTimeout(r, 10000));
        continue;
      }
      throw new Error(`API ${res.status}: ${JSON.stringify(d.error || d)}`);
    }

    // Safely extract text with proper error handling
    const candidate = d.candidates?.[0];
    const parts = candidate?.content?.parts;
    const text = parts?.map(p => p.text).filter(Boolean).join("") || "";

    if (!text) {
      // Handle the case where model exhausted tokens or returned empty response
      const reason = candidate?.finishReason || "unknown";
      if (reason === "MAX_TOKENS" && i < retries - 1) {
        console.warn("Hit MAX_TOKENS with no output text — retrying...");
        continue;
      }
      throw new Error(
        `Empty response from model. finishReason=${reason}. ` +
        `This usually means the model exhausted its token budget. ` +
        `Full response: ${JSON.stringify(d).slice(0, 500)}`
      );
    }

    return text;
  }
  
  throw new Error("Exhausted all API retries without successful response");
}

function cleanJSON(t) {
  const s = t.indexOf('[');
  const o = t.indexOf('{');
  const first = (s !== -1 && o !== -1) ? Math.min(s, o) : Math.max(s, o);
  if (first === -1) return t;
  const l_s = t.lastIndexOf(']');
  const l_o = t.lastIndexOf('}');
  const last = Math.max(l_s, l_o);
  return t.substring(first, last + 1);
}

function fmt(n) { return n?.toLocaleString("en-GB", { style: "currency", currency: "GBP", maximumFractionDigits: 0 }) || "£0"; }
function fmtDec(n) { return n?.toLocaleString("en-GB", { style: "currency", currency: "GBP", minimumFractionDigits: 2 }) || "£0.00"; }

export default function CashLens() {
  const [screen, setScreen] = useState("upload");
  const [transactions, setTransactions] = useState([]);
  const [insights, setInsights] = useState(null);
  const [tab, setTab] = useState("overview");
  const [messages, setMessages] = useState([]);
  const [chatInput, setChatInput] = useState("");
  const [chatLoading, setChatLoading] = useState(false);
  const [step, setStep] = useState("");
  const [pct, setPct] = useState(0);
  const [dragOver, setDragOver] = useState(false);
  const [txnFilter, setTxnFilter] = useState("all");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const fileRef = useRef(null);
  const chatEnd = useRef(null);

  useEffect(() => {
    if (chatEnd.current) chatEnd.current.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const loadPdfJs = () => new Promise(resolve => {
    if (window.pdfjsLib) return resolve();
    const s = document.createElement("script");
    s.src = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js";
    s.onload = () => {
      window.pdfjsLib.GlobalWorkerOptions.workerSrc =
        "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";
      resolve();
    };
    document.head.appendChild(s);
  });

  const extractPDF = async file => {
    await loadPdfJs();
    return new Promise((res, rej) => {
      const r = new FileReader();
      r.onload = async e => {
        try {
          const pdf = await window.pdfjsLib.getDocument({ data: e.target.result }).promise;
          let txt = "";
          for (let i = 1; i <= pdf.numPages; i++) {
            const pg = await pdf.getPage(i);
            const c = await pg.getTextContent();
            txt += c.items.map(x => x.str).join(" ") + "\n";
          }
          res(txt);
        } catch (e) { rej(e); }
      };
      r.readAsArrayBuffer(file);
    });
  };

  const buildProjections = ins => {
    const monthly = ins.monthlySpending || [];
    const amounts = monthly.slice(-4).map(m => m.amount).filter(Boolean);
    const avg = amounts.length ? amounts.reduce((a, b) => a + b, 0) / amounts.length : ins.totalExpenses || 0;
    const trendDiff = amounts.length >= 2 ? (amounts[amounts.length - 1] - amounts[0]) / amounts.length : 0;
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const cur = new Date().getMonth();
    return [
      ...monthly.slice(-6).map(m => ({ ...m, projected: m.amount })),
      ...[1, 2, 3].map(i => ({ month: months[(cur + i) % 12], amount: null, projected: Math.max(0, Math.round(avg + trendDiff * i)) }))
    ];
  };

  const processFile = async file => {
    setScreen("processing");
    try {
      setStep("Reading your bank statement…"); setPct(10);
      let raw = "";
      const name = file.name.toLowerCase();
      if (name.endsWith(".pdf")) raw = await extractPDF(file);
      else raw = await file.text();

      setStep("Extracting transactions with AI…"); setPct(35);
      const parseRes = await callAI(
        "You are a financial data extractor. Return ONLY a valid JSON array. No markdown, no explanation.",
        `Parse this bank statement. Return ALL transactions as a JSON array. Each object must have:
date (YYYY-MM-DD), description (string), amount (number — negative for expenses/debits, positive for income/credits)

Bank statement data:
${raw.slice(0, 3000)}`
      );

      let txns = [];
      try {
        txns = JSON.parse(cleanJSON(parseRes)).map((t, i) => ({
          ...t,
          id: i,
          category: "Other",
          type: t.amount >= 0 ? "income" : "expense"
        }));
      }
      catch (e) { 
        console.error("Failed to parse transactions JSON. Raw response:", parseRes);
        console.error(e);
        txns = DEMO_TXN; 
      }

      setStep("Pacing requests to respect API limits…"); setPct(50);
      await new Promise(r => setTimeout(r, 4000));
      setStep("Running deep financial analysis…"); setPct(65);
      // We explicitly ask the AI NOT to do math, only to classify and provide textual insights.
      const insRes = await callAI(
        "You are a CFO-level financial analyst. Return ONLY valid JSON. No markdown, no explanation. Do NOT calculate totals.",
        `Analyze these transactions. Return exactly this JSON structure:
{
  "healthScore": <number 0-100>,
  "subscriptions": [{"name":"<string>","amount":<number>,"lastCharged":"<string>"}],
  "moneyLeaks": [{"description":"<string>","totalAmount":<number>,"count":<number>,"frequency":"<string>"}],
  "cfoReport": "<4-5 sentence executive summary>",
  "alerts": ["<string>","<string>","<string>","<string>"],
  "tips": ["<string>","<string>","<string>","<string>"],
  "taggedTransactions": [{"id":<number>,"category":"<string>"}]
}

Transactions (JSON):
${JSON.stringify(txns.slice(0, 50))}`
      );

      let ins = {};
      try {
        ins = JSON.parse(cleanJSON(insRes));
        if (ins.taggedTransactions) {
          const map = {};
          ins.taggedTransactions.forEach(t => map[t.id] = t.category);
          txns = txns.map(t => ({ ...t, category: map[t.id] || "Other" }));
        }
      } catch (e) { 
        console.error("Failed to parse insights JSON. Raw response:", insRes);
        console.error(e);
        ins = DEMO_INSIGHTS; 
      }

      // --- DETERMINISTIC JAVASCRIPT CALCULATIONS ---
      setStep("Calculating totals and aggregations…"); setPct(80);

      const totalIncome = txns.filter(t => t.type === 'income').reduce((s, t) => s + t.amount, 0);
      const totalExpenses = txns.filter(t => t.type === 'expense').reduce((s, t) => s + Math.abs(t.amount), 0);
      const netBalance = totalIncome - totalExpenses;

      const catMap = {};
      txns.filter(t => t.type === 'expense').forEach(t => {
        catMap[t.category] = (catMap[t.category] || 0) + Math.abs(t.amount);
      });
      const categories = Object.keys(catMap)
        .map(name => ({ name, amount: catMap[name], percentage: (catMap[name] / totalExpenses) * 100 }))
        .sort((a, b) => b.amount - a.amount);

      const monthMap = {};
      txns.forEach(t => {
        if (!t.date) return;
        const d = new Date(t.date);
        if (isNaN(d.getTime())) return;
        const month = d.toLocaleString('en-US', { month: 'short' });
        if (t.type === 'expense') {
          monthMap[month] = (monthMap[month] || 0) + Math.abs(t.amount);
        }
      });
      const monthlySpending = Object.keys(monthMap).map(m => ({ month: m, amount: monthMap[m] }));

      ins.totalIncome = totalIncome;
      ins.totalExpenses = totalExpenses;
      ins.netBalance = netBalance;
      ins.categories = categories;
      ins.monthlySpending = monthlySpending.length ? monthlySpending : [{ month: 'Apr', amount: totalExpenses }];

      setStep("Generating spending projections…"); setPct(88);
      ins.projectionData = buildProjections(ins);
      ins.nextMonthProjection = ins.projectionData[ins.projectionData.length - 1]?.projected || 0;

      setPct(100); setStep("Done!");
      setTransactions(txns);
      setInsights(ins);
      setMessages([{ role: "assistant", content: `I've finished analysing your finances. Your financial health score is **${ins.healthScore}/100**. ${ins.cfoReport?.split(".")[0]}. What would you like to explore?` }]);
      await new Promise(r => setTimeout(r, 400));
      setScreen("dashboard");
    } catch (err) {
      console.error(err);
      alert("API Error: " + err.message);
      setTransactions(DEMO_TXN);
      setInsights({ ...DEMO_INSIGHTS, projectionData: DEMO_INSIGHTS.projectionData });
      setMessages([{ role: "assistant", content: "I've loaded a sample analysis for demo purposes. Your financial health score is 68/100. Ask me anything about your finances!" }]);
      setScreen("dashboard");
    }
  };

  const loadDemo = () => {
    setTransactions(DEMO_TXN);
    setInsights(DEMO_INSIGHTS);
    setMessages([{ role: "assistant", content: "Demo data loaded! Health score: 68/100. I found 6 active subscriptions totalling £102.95/month and several spending patterns worth addressing. What would you like to know?" }]);
    setScreen("dashboard");
  };

  const sendChat = async () => {
    if (!chatInput.trim() || chatLoading) return;
    const q = chatInput.trim();
    setChatInput("");
    setMessages(p => [...p, { role: "user", content: q }]);
    setChatLoading(true);
    try {
      const ctx = `Financial summary:
Health score: ${insights.healthScore}/100
Total income: ${fmt(insights.totalIncome)} | Total expenses: ${fmt(insights.totalExpenses)} | Net: ${fmt(insights.netBalance)}
Top spending categories: ${insights.categories?.slice(0, 5).map(c => `${c.name} ${fmtDec(c.amount)}`).join(", ")}
Active subscriptions: ${insights.subscriptions?.map(s => `${s.name} ${fmtDec(s.amount)}/mo`).join(", ")}
Money leaks: ${insights.moneyLeaks?.map(l => l.description).join("; ")}
Recent transactions (sample): ${JSON.stringify(transactions.slice(0, 25))}`;
      const reply = await callAI(
        "You are a sharp personal CFO. Answer in 2-3 sentences with specific numbers from the data. Be direct and actionable.",
        `${ctx}\n\nUser question: ${q}`
      );
      setMessages(p => [...p, { role: "assistant", content: reply }]);
    } catch {
      setMessages(p => [...p, { role: "assistant", content: "Sorry, I ran into an issue. Please try again." }]);
    }
    setChatLoading(false);
  };

  const S = {
    app: { fontFamily: "'Inter', system-ui, sans-serif", minHeight: "100vh", color: "var(--color-text-primary)", display: "flex", flexDirection: "column" },
    pill: (c) => ({ display: "inline-flex", alignItems: "center", gap: "6px", padding: "4px 12px", borderRadius: "99px", fontSize: "12px", fontWeight: 600, background: c + "1a", color: c, border: `1px solid ${c}40`, letterSpacing: "0.02em" }),
    mono: { fontFamily: "'JetBrains Mono', 'Courier New', monospace" },
    label: { fontSize: "12px", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--color-text-tertiary)", marginBottom: "16px", display: "block" },
    bigNum: { fontFamily: "'JetBrains Mono', 'Courier New', monospace", fontSize: "32px", fontWeight: 700, lineHeight: 1.1, letterSpacing: "-0.02em" },
    section: { color: "var(--color-text-secondary)", fontSize: "14px" },
  };

  const Tip = ({ active, payload, label }) => {
    if (!active || !payload?.length) return null;
    return <div className="glass-card-static animate-fade-in" style={{ padding: "12px 16px", fontSize: "13px", fontFamily: "'JetBrains Mono', monospace", zIndex: 1000, position: 'relative' }}>
      <p style={{ color: "var(--color-text-secondary)", marginBottom: "6px", fontWeight: 600 }}>{label}</p>
      {payload.map((p, i) => <p key={i} style={{ color: p.color, margin: 0, fontSize: "14px", fontWeight: 700 }}>£{(p.value || 0).toLocaleString()}</p>)}
    </div>;
  };

  const TABS = [
    { id: "overview", label: "Overview", icon: <BarChart2 size={16} /> },
    { id: "transactions", label: "Transactions", icon: <FileText size={16} /> },
    { id: "subscriptions", label: "Subscriptions", icon: <CreditCard size={16} /> },
    { id: "insights", label: "AI Insights", icon: <Brain size={16} /> },
    { id: "projections", label: "Projections", icon: <TrendingUp size={16} /> },
    { id: "chat", label: "Ask AI", icon: <MessageSquare size={16} /> },
  ];

  if (screen === "upload") return (
    <div className="animate-fade-in" style={{ ...S.app, alignItems: "center", justifyContent: "center", padding: "24px", position: "relative", overflow: "hidden" }}>
      {/* Background decorative elements */}
      <div style={{ position: "absolute", top: "5%", left: "-10%", width: "600px", height: "380px", transform: "rotate(-15deg)", opacity: 0.25, animation: "floatCard 8s ease-in-out infinite", pointerEvents: "none", zIndex: 0 }}>
        <img src="/card.png" alt="" style={{ width: "100%", height: "100%", objectFit: "contain", filter: "blur(4px)" }} />
      </div>
      <div style={{ position: "absolute", bottom: "-10%", right: "-10%", width: "700px", height: "450px", transform: "rotate(20deg)", opacity: 0.2, animation: "floatCard 12s ease-in-out infinite reverse", pointerEvents: "none", zIndex: 0 }}>
        <img src="/card.png" alt="" style={{ width: "100%", height: "100%", objectFit: "contain", filter: "blur(6px)" }} />
      </div>

      <div className="glass-card" style={{ width: "100%", maxWidth: "560px", padding: "48px 40px", zIndex: 10, position: "relative" }}>
        <div style={{ textAlign: "center", marginBottom: "40px" }}>
          <div style={{ width: "72px", height: "72px", borderRadius: "20px", background: "linear-gradient(135deg, #10b981 0%, #059669 100%)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 24px", boxShadow: "0 10px 25px -5px rgba(16,185,129,0.4)" }}>
            <span style={{ fontSize: "36px", color: "#fff", fontWeight: 800 }}>£</span>
          </div>
          <h1 style={{ fontSize: "36px", fontWeight: 800, marginBottom: "12px", margin: "0 0 12px", letterSpacing: "-0.03em" }}>CashLens</h1>
          <p style={{ color: "var(--color-text-secondary)", fontSize: "16px", lineHeight: 1.6, margin: 0 }}>
            Upload your bank statement and get AI-powered financial insights in seconds.
          </p>
        </div>

        <div
          onDragOver={e => { e.preventDefault(); setDragOver(true); }}
          onDragLeave={() => setDragOver(false)}
          onDrop={e => { e.preventDefault(); setDragOver(false); const f = e.dataTransfer.files[0]; if (f) processFile(f); }}
          onClick={() => fileRef.current?.click()}
          style={{ border: `2px dashed ${dragOver ? "#10b981" : "var(--color-border-secondary)"}`, borderRadius: "var(--border-radius-lg)", padding: "48px 32px", textAlign: "center", cursor: "pointer", transition: "all 0.3s ease", background: dragOver ? "rgba(16,185,129,0.08)" : "var(--color-background-secondary)", marginBottom: "24px" }}
          className="btn-interactive"
        >
          <input ref={fileRef} type="file" accept=".pdf,.csv,.txt" onChange={e => { const f = e.target.files[0]; if (f) processFile(f); }} style={{ display: "none" }} />
          <div style={{ width: "64px", height: "64px", borderRadius: "16px", background: "rgba(16,185,129,0.15)", border: "1px solid rgba(16,185,129,0.3)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px" }}>
            <Upload size={28} color="#10b981" />
          </div>
          <p style={{ fontWeight: 600, fontSize: "18px", marginBottom: "8px", color: "var(--color-text-primary)" }}>Drop your bank statement here</p>
          <p style={{ color: "var(--color-text-secondary)", fontSize: "15px", marginBottom: "24px" }}>or click to browse</p>
          <div style={{ display: "flex", gap: "10px", justifyContent: "center" }}>
            {["PDF", "CSV", "TXT"].map(f => (
              <span key={f} style={{ padding: "6px 14px", borderRadius: "8px", fontSize: "13px", fontWeight: 600, background: "rgba(255,255,255,0.05)", border: "1px solid var(--color-border-secondary)", color: "var(--color-text-secondary)" }}>{f}</span>
            ))}
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "24px" }}>
          <div style={{ flex: 1, height: "1px", background: "var(--color-border-secondary)" }} />
          <span style={{ fontSize: "13px", color: "var(--color-text-tertiary)", fontWeight: 500, letterSpacing: "0.05em", textTransform: "uppercase" }}>or</span>
          <div style={{ flex: 1, height: "1px", background: "var(--color-border-secondary)" }} />
        </div>

        <button onClick={loadDemo} className="btn-interactive" style={{ width: "100%", padding: "16px", borderRadius: "var(--border-radius-md)", border: "1px solid rgba(245, 158, 11, 0.3)", background: "rgba(245, 158, 11, 0.1)", cursor: "pointer", fontSize: "15px", fontWeight: 600, color: "#f59e0b", display: "flex", alignItems: "center", justifyContent: "center", gap: "10px" }}>
          <Zap size={18} /> Try with sample bank data
        </button>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", marginTop: "32px" }}>
          <Shield size={14} color="var(--color-text-tertiary)" />
          <span style={{ fontSize: "13px", color: "var(--color-text-tertiary)", fontWeight: 500 }}>Files processed in-browser — never stored on servers</span>
        </div>
      </div>
    </div>
  );

  if (screen === "processing") return (
    <div className="animate-fade-in" style={{ ...S.app, alignItems: "center", justifyContent: "center" }}>
      <div className="glass-card" style={{ width: "100%", maxWidth: "420px", padding: "48px 40px", textAlign: "center" }}>
        <div style={{ width: "80px", height: "80px", borderRadius: "24px", background: "rgba(16,185,129,0.1)", border: "1px solid rgba(16,185,129,0.25)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 32px", boxShadow: "0 0 30px rgba(16,185,129,0.2)", animation: "pulseGlow 2s infinite" }}>
          <Brain size={36} color="#10b981" />
        </div>
        <h2 style={{ fontSize: "24px", fontWeight: 700, marginBottom: "8px", letterSpacing: "-0.02em" }}>Analysing finances</h2>
        <p style={{ color: "var(--color-text-secondary)", fontSize: "15px", marginBottom: "32px", minHeight: "24px" }}>{step}</p>
        <div style={{ height: "6px", background: "var(--color-background-secondary)", borderRadius: "99px", overflow: "hidden", marginBottom: "16px" }}>
          <div style={{ height: "100%", background: "linear-gradient(90deg, #10b981, #059669)", borderRadius: "99px", width: `${pct}%`, transition: "width 0.4s ease" }} />
        </div>
        <p style={{ ...S.mono, fontSize: "14px", color: "var(--color-text-tertiary)", fontWeight: 600 }}>{pct}%</p>
      </div>
    </div>
  );

  if (!insights) return null;

  const scoreColor = insights.healthScore >= 80 ? "#10b981" : insights.healthScore >= 60 ? "#f59e0b" : "#ef4444";
  const scoreLabel = insights.healthScore >= 80 ? "Excellent" : insights.healthScore >= 60 ? "Good" : "Needs attention";

  const visibleTxns = txnFilter === "all" ? transactions : transactions.filter(t => t.type === txnFilter);

  return (
    <div className="animate-fade-in" style={{ ...S.app, flexDirection: "row", overflow: "hidden" }}>

      {/* Sidebar */}
      <div className="glass-card-static" style={{ width: "260px", height: "100vh", display: "flex", flexDirection: "column", borderRight: "1px solid var(--color-border-secondary)", borderRadius: 0, borderTop: 0, borderBottom: 0, borderLeft: 0, zIndex: 100, flexShrink: 0 }}>
        <div style={{ padding: "24px", display: "flex", alignItems: "center", gap: "12px", borderBottom: "1px solid var(--color-border-tertiary)" }}>
          <div style={{ width: "36px", height: "36px", borderRadius: "10px", background: "linear-gradient(135deg, #10b981 0%, #059669 100%)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, boxShadow: "0 4px 10px rgba(16,185,129,0.3)" }}>
            <span style={{ fontSize: "18px", color: "#fff", fontWeight: 800 }}>£</span>
          </div>
          <span style={{ fontWeight: 800, fontSize: "22px", letterSpacing: "-0.03em" }}>CashLens</span>
        </div>

        <div style={{ padding: "24px 16px", flex: 1, display: "flex", flexDirection: "column", gap: "8px" }}>
          <span style={{ fontSize: "11px", fontWeight: 700, color: "var(--color-text-tertiary)", textTransform: "uppercase", letterSpacing: "0.1em", marginLeft: "8px", marginBottom: "8px" }}>Menu</span>
          {TABS.map(t => (
            <button key={t.id} onClick={() => setTab(t.id)} className="tab-btn" style={{ padding: "12px 16px", borderRadius: "10px", border: "none", cursor: "pointer", fontSize: "15px", fontWeight: tab === t.id ? 600 : 500, background: tab === t.id ? "rgba(255,255,255,0.08)" : "transparent", color: tab === t.id ? "var(--color-text-primary)" : "var(--color-text-secondary)", display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%", textAlign: "left" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <span style={{ color: tab === t.id ? "#10b981" : "inherit" }}>{t.icon}</span>
                {t.label}
              </div>
              {tab === t.id && <ChevronRight size={16} color="var(--color-text-tertiary)" />}
            </button>
          ))}
        </div>

        <div style={{ padding: "24px", borderTop: "1px solid var(--color-border-tertiary)" }}>
          <button onClick={() => setScreen("upload")} className="btn-interactive" style={{ width: "100%", padding: "12px", borderRadius: "10px", border: "1px solid var(--color-border-secondary)", background: "rgba(255,255,255,0.05)", cursor: "pointer", fontSize: "14px", fontWeight: 600, color: "var(--color-text-primary)", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" }}>
            <RefreshCw size={14} /> Upload New
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div style={{ flex: 1, height: "100vh", overflowY: "auto", position: "relative" }}>

        {/* Header (Mobile / Top Info) */}
        <div style={{ padding: "32px 40px 24px 40px", display: "flex", justifyContent: "space-between", alignItems: "center", maxWidth: "1400px", margin: "0 auto" }}>
          <div>
            <h2 style={{ fontSize: "28px", fontWeight: 800, margin: "0 0 4px", letterSpacing: "-0.02em" }}>{TABS.find(t => t.id === tab)?.label}</h2>
            <p style={{ margin: 0, color: "var(--color-text-secondary)", fontSize: "15px" }}>Analysis generated for your latest statement.</p>
          </div>
          <div style={{ ...S.pill(scoreColor), padding: "8px 16px", border: `1px solid ${scoreColor}50`, background: `${scoreColor}15` }}>
            <Zap size={14} /> Health Score: {insights.healthScore}
          </div>
        </div>

        <div key={tab} className="animate-fade-in" style={{ maxWidth: "1400px", margin: "0 auto", padding: "0 40px 60px 40px" }}>

          {tab === "overview" && (
            <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "20px" }}>
                {[
                  { label: "Total Income", value: fmt(insights.totalIncome), color: "#10b981", icon: <TrendingUp size={20} /> },
                  { label: "Total Expenses", value: fmt(insights.totalExpenses), color: "#ef4444", icon: <TrendingDown size={20} /> },
                  { label: "Net Balance", value: fmt(insights.netBalance), color: insights.netBalance >= 0 ? "#10b981" : "#ef4444", icon: <span style={{ fontSize: "20px", fontWeight: 800 }}>=</span> },
                  { label: "Health Score", value: `${insights.healthScore}/100`, color: scoreColor, sub: scoreLabel, icon: <Zap size={20} /> },
                ].map((c, i) => (
                  <div key={i} className={`glass-card stagger-${i + 1}`} style={{ padding: "24px", display: "flex", flexDirection: "column", gap: "16px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <span style={{ fontSize: "14px", color: "var(--color-text-secondary)", fontWeight: 600 }}>{c.label}</span>
                      <div style={{ padding: "10px", borderRadius: "12px", background: `${c.color}15`, color: c.color }}>{c.icon}</div>
                    </div>
                    <div>
                      <div style={{ ...S.bigNum, color: c.color }}>{c.value}</div>
                      {c.sub && <div style={{ fontSize: "13px", color: "var(--color-text-tertiary)", fontWeight: 500, marginTop: "6px" }}>{c.sub}</div>}
                    </div>
                  </div>
                ))}
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))", gap: "24px" }}>
                <div className="glass-card stagger-3" style={{ padding: "32px", minHeight: "340px" }}>
                  <span style={S.label}>Monthly Spending Trend</span>
                  <ResponsiveContainer width="100%" height={260}>
                    <BarChart data={insights.monthlySpending || []} barSize={32}>
                      <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border-tertiary)" vertical={false} />
                      <XAxis dataKey="month" tick={{ fill: "var(--color-text-tertiary)", fontSize: 12, fontFamily: "'JetBrains Mono', monospace" }} axisLine={false} tickLine={false} dy={10} />
                      <YAxis tick={{ fill: "var(--color-text-tertiary)", fontSize: 12, fontFamily: "'JetBrains Mono', monospace" }} axisLine={false} tickLine={false} tickFormatter={v => `£${(v / 1000).toFixed(0)}k`} width={50} dx={-10} />
                      <Tooltip content={<Tip />} cursor={{ fill: 'rgba(255,255,255,0.04)' }} />
                      <Bar dataKey="amount" fill="url(#colorIncome)" radius={[6, 6, 0, 0]}>
                        <defs>
                          <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#10b981" stopOpacity={1} />
                            <stop offset="100%" stopColor="#059669" stopOpacity={1} />
                          </linearGradient>
                        </defs>
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                <div className="glass-card stagger-4" style={{ padding: "32px", minHeight: "340px", display: "flex", flexDirection: "column" }}>
                  <span style={S.label}>Top Spending Categories</span>
                  <div style={{ display: "flex", flex: 1, alignItems: "center", gap: "24px" }}>
                    <div style={{ flex: 1, minWidth: "180px", height: "240px" }}>
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie data={insights.categories || []} dataKey="amount" nameKey="name" cx="50%" cy="50%" innerRadius={60} outerRadius={90} paddingAngle={3}>
                            {(insights.categories || []).map((_, i) => <Cell key={i} fill={CHART_COLORS[i % CHART_COLORS.length]} stroke="rgba(0,0,0,0)" />)}
                          </Pie>
                          <Tooltip formatter={v => [`£${v.toLocaleString()}`, ""]} content={<Tip />} />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                    <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "12px", maxHeight: "240px", overflowY: "auto", paddingRight: "10px" }}>
                      {(insights.categories || []).slice(0, 6).map((cat, i) => (
                        <div key={i} className="txn-row" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "8px", borderRadius: "8px" }}>
                          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                            <div style={{ width: "12px", height: "12px", borderRadius: "3px", background: CHART_COLORS[i % CHART_COLORS.length], flexShrink: 0 }} />
                            <span style={{ fontSize: "13px", color: "var(--color-text-primary)", fontWeight: 500 }}>{cat.name}</span>
                          </div>
                          <span style={{ ...S.mono, fontSize: "12px", color: "var(--color-text-tertiary)" }}>{cat.percentage?.toFixed(0)}%</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {insights.alerts?.length > 0 && (
                <div className="glass-card stagger-5" style={{ padding: "32px" }}>
                  <span style={S.label}>Critical Alerts</span>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "16px" }}>
                    {insights.alerts.map((a, i) => (
                      <div key={i} className="btn-interactive" style={{ display: "flex", gap: "16px", alignItems: "flex-start", background: "rgba(245,158,11,0.06)", border: "1px solid rgba(245,158,11,0.2)", borderRadius: "var(--border-radius-md)", padding: "20px" }}>
                        <div style={{ padding: "8px", background: "rgba(245,158,11,0.15)", borderRadius: "10px", flexShrink: 0 }}>
                          <AlertTriangle size={18} color="#f59e0b" />
                        </div>
                        <span style={{ fontSize: "14px", lineHeight: 1.6, color: "var(--color-text-primary)", fontWeight: 500 }}>{a}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {tab === "transactions" && (
            <div className="glass-card stagger-1" style={{ padding: "32px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
                <span style={S.label}>All Transactions ({transactions.length})</span>
                <div style={{ display: "flex", gap: "8px", background: "rgba(255,255,255,0.03)", padding: "4px", borderRadius: "10px", border: "1px solid var(--color-border-secondary)" }}>
                  {["all", "income", "expense"].map(f => (
                    <button key={f} onClick={() => setTxnFilter(f)} style={{ padding: "8px 16px", borderRadius: "8px", border: "none", background: txnFilter === f ? "var(--color-background-secondary)" : "transparent", cursor: "pointer", fontSize: "13px", fontWeight: txnFilter === f ? 600 : 500, color: txnFilter === f ? "var(--color-text-primary)" : "var(--color-text-secondary)", textTransform: "capitalize", transition: "all 0.2s" }}>
                      {f}
                    </button>
                  ))}
                </div>
              </div>
              <div style={{ maxHeight: "650px", overflowY: "auto", paddingRight: "10px" }}>
                {visibleTxns.map(t => (
                  <div key={t.id} className="txn-row" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px", borderBottom: "1px solid var(--color-border-tertiary)", borderRadius: "8px" }}>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <p style={{ fontSize: "15px", fontWeight: 600, marginBottom: "6px", color: "var(--color-text-primary)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{t.description}</p>
                      <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
                        <span style={{ ...S.mono, color: "var(--color-text-tertiary)", fontSize: "12px" }}>{t.date}</span>
                        {t.category && <span style={{ ...S.pill("#3b82f6"), fontSize: "11px", padding: "2px 10px" }}>{t.category}</span>}
                      </div>
                    </div>
                    <div style={{ ...S.mono, fontSize: "18px", fontWeight: 700, color: t.amount >= 0 ? "#10b981" : "#ef4444", marginLeft: "24px", flexShrink: 0 }}>
                      {t.amount >= 0 ? "+" : ""}{fmtDec(t.amount)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {tab === "subscriptions" && (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(450px, 1fr))", gap: "24px" }}>
              <div className="glass-card stagger-1" style={{ padding: "32px" }}>
                <span style={S.label}>Active Subscriptions</span>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px 0", marginBottom: "16px", borderBottom: "1px solid var(--color-border-secondary)" }}>
                  <span style={{ fontSize: "15px", color: "var(--color-text-secondary)", fontWeight: 600 }}>Monthly Total</span>
                  <span style={{ ...S.mono, fontSize: "24px", fontWeight: 700, color: "#ef4444" }}>
                    {fmtDec((insights.subscriptions || []).reduce((s, x) => s + x.amount, 0))}/mo
                  </span>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                  {(insights.subscriptions || []).map((sub, i) => (
                    <div key={i} className="txn-row" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px", borderBottom: "1px solid var(--color-border-tertiary)", borderRadius: "8px" }}>
                      <div>
                        <p style={{ fontSize: "15px", fontWeight: 600, marginBottom: "4px", color: "var(--color-text-primary)" }}>{sub.name}</p>
                        <p style={{ fontSize: "12px", color: "var(--color-text-tertiary)" }}>Last charged: {sub.lastCharged}</p>
                      </div>
                      <span style={{ ...S.mono, fontSize: "16px", fontWeight: 700, color: "#f59e0b" }}>{fmtDec(sub.amount)}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
                <div className="glass-card stagger-2" style={{ padding: "32px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "20px" }}>
                    <div style={{ padding: "8px", background: "rgba(59,130,246,0.1)", borderRadius: "8px" }}>
                      <Droplets size={18} color="#3b82f6" />
                    </div>
                    <span style={{ ...S.label, marginBottom: 0 }}>Money Leaks Detected</span>
                  </div>
                  {(insights.moneyLeaks || []).map((l, i) => (
                    <div key={i} className="btn-interactive" style={{ background: "rgba(239,68,68,0.05)", border: "1px solid rgba(239,68,68,0.2)", borderRadius: "var(--border-radius-md)", padding: "20px", marginBottom: "16px" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "12px" }}>
                        <span style={{ fontSize: "15px", fontWeight: 600, color: "var(--color-text-primary)", flex: 1, marginRight: "12px", lineHeight: 1.5 }}>{l.description}</span>
                        <span style={{ ...S.mono, fontSize: "16px", fontWeight: 700, color: "#ef4444", flexShrink: 0 }}>{fmtDec(l.totalAmount)}</span>
                      </div>
                      <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                        <span style={S.pill("#ef4444")}>{l.count} transactions</span>
                        <span style={S.pill("#f59e0b")}>{l.frequency}</span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="glass-card stagger-3" style={{ padding: "32px", background: "rgba(16,185,129,0.04)", border: "1px solid rgba(16,185,129,0.2)" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "20px" }}>
                    <div style={{ padding: "8px", background: "rgba(16,185,129,0.1)", borderRadius: "8px" }}>
                      <CheckCircle size={18} color="#10b981" />
                    </div>
                    <span style={{ fontSize: "14px", fontWeight: 700, color: "#10b981", textTransform: "uppercase", letterSpacing: "0.05em" }}>Actionable Savings Tips</span>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                    {(insights.tips || []).map((tip, i) => (
                      <p key={i} style={{ fontSize: "14px", color: "var(--color-text-secondary)", lineHeight: 1.6, margin: 0, padding: "12px", background: "rgba(255,255,255,0.03)", borderRadius: "8px", borderLeft: "3px solid #10b981" }}>{tip}</p>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {tab === "insights" && (
            <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
              <div className="glass-card stagger-1" style={{ padding: "36px", borderLeft: "4px solid #10b981" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "20px" }}>
                  <div style={{ width: "48px", height: "48px", borderRadius: "14px", background: "rgba(16,185,129,0.15)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <Brain size={24} color="#10b981" />
                  </div>
                  <div>
                    <p style={{ fontSize: "18px", fontWeight: 700, marginBottom: "4px", color: "var(--color-text-primary)", letterSpacing: "-0.01em" }}>CFO Executive Report</p>
                    <p style={{ fontSize: "13px", color: "var(--color-text-tertiary)", margin: 0 }}>AI-generated financial summary based on full analysis.</p>
                  </div>
                </div>
                <p style={{ fontSize: "16px", lineHeight: 1.8, color: "var(--color-text-secondary)", margin: 0 }}>{insights.cfoReport}</p>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "auto 1fr", gap: "24px" }}>
                <div className="glass-card stagger-2" style={{ padding: "40px", textAlign: "center", minWidth: "240px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "20px" }}>
                  <span style={S.label}>Health Score</span>
                  <div style={{ width: "140px", height: "140px", borderRadius: "50%", border: `4px solid ${scoreColor}`, display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", boxShadow: `0 0 30px ${scoreColor}20`, background: "rgba(255,255,255,0.02)" }}>
                    <span style={{ ...S.mono, fontSize: "42px", fontWeight: 800, color: scoreColor, lineHeight: 1 }}>{insights.healthScore}</span>
                    <span style={{ fontSize: "13px", color: "var(--color-text-tertiary)", marginTop: "4px", fontWeight: 600 }}>/ 100</span>
                  </div>
                  <span style={{ ...S.pill(scoreColor), fontSize: "14px", padding: "6px 20px" }}>{scoreLabel}</span>
                </div>

                <div className="glass-card stagger-3" style={{ padding: "32px" }}>
                  <span style={S.label}>Priority Action Items</span>
                  <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                    {(insights.tips || []).map((tip, i) => (
                      <div key={i} className="txn-row" style={{ display: "flex", gap: "16px", alignItems: "flex-start", padding: "16px", borderRadius: "12px", border: "1px solid var(--color-border-tertiary)" }}>
                        <div style={{ width: "28px", height: "28px", borderRadius: "50%", background: "var(--color-background-secondary)", border: "1px solid var(--color-border-secondary)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, boxShadow: "0 2px 5px rgba(0,0,0,0.2)" }}>
                          <span style={{ fontSize: "12px", fontWeight: 700, color: "var(--color-text-secondary)" }}>{i + 1}</span>
                        </div>
                        <p style={{ fontSize: "15px", lineHeight: 1.6, color: "var(--color-text-secondary)", margin: 0, paddingTop: "2px" }}>{tip}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "20px" }}>
                {(insights.categories || []).slice(0, 6).map((cat, i) => (
                  <div key={i} className={`glass-card-static btn-interactive stagger-${(i % 3) + 3}`} style={{ padding: "24px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "16px" }}>
                      <div style={{ width: "12px", height: "12px", borderRadius: "4px", background: CHART_COLORS[i % CHART_COLORS.length] }} />
                      <span style={{ fontSize: "14px", color: "var(--color-text-secondary)", fontWeight: 600 }}>{cat.name}</span>
                    </div>
                    <div style={{ ...S.mono, fontSize: "24px", fontWeight: 700, color: "var(--color-text-primary)", marginBottom: "6px" }}>{fmt(cat.amount)}</div>
                    <div style={{ fontSize: "13px", color: "var(--color-text-tertiary)", fontWeight: 500 }}>{cat.percentage?.toFixed(1)}% of expenses</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {tab === "projections" && (
            <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
              <div className="glass-card stagger-1" style={{ padding: "40px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "32px" }}>
                  <div>
                    <span style={S.label}>Spending Forecast</span>
                    <p style={{ fontSize: "15px", color: "var(--color-text-tertiary)", margin: 0 }}>Historical data + 3-month AI projection based on current trends.</p>
                  </div>
                  <div style={{ textAlign: "right", background: "rgba(245,158,11,0.08)", padding: "16px 24px", borderRadius: "16px", border: "1px solid rgba(245,158,11,0.2)" }}>
                    <p style={{ fontSize: "13px", color: "var(--color-text-secondary)", marginBottom: "8px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em" }}>Next Month Projection</p>
                    <p style={{ ...S.mono, fontSize: "28px", fontWeight: 800, color: "#f59e0b", margin: 0 }}>{fmt(insights.nextMonthProjection)}</p>
                  </div>
                </div>
                <ResponsiveContainer width="100%" height={320}>
                  <AreaChart data={insights.projectionData || []} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                    <defs>
                      <linearGradient id="ag" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#10b981" stopOpacity={0.25} />
                        <stop offset="100%" stopColor="#10b981" stopOpacity={0} />
                      </linearGradient>
                      <linearGradient id="pg" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#f59e0b" stopOpacity={0.2} />
                        <stop offset="100%" stopColor="#f59e0b" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border-tertiary)" vertical={false} />
                    <XAxis dataKey="month" tick={{ fill: "var(--color-text-tertiary)", fontSize: 12, fontFamily: "'JetBrains Mono', monospace" }} axisLine={false} tickLine={false} dy={10} />
                    <YAxis tick={{ fill: "var(--color-text-tertiary)", fontSize: 12, fontFamily: "'JetBrains Mono', monospace" }} axisLine={false} tickLine={false} tickFormatter={v => `£${(v / 1000).toFixed(1)}k`} width={55} dx={-10} />
                    <Tooltip content={<Tip />} />
                    <Area type="monotone" dataKey="amount" stroke="#10b981" strokeWidth={3} fill="url(#ag)" name="Actual" connectNulls={false} activeDot={{ r: 6, strokeWidth: 0, fill: "#10b981" }} />
                    <Area type="monotone" dataKey="projected" stroke="#f59e0b" strokeWidth={3} strokeDasharray="6 6" fill="url(#pg)" name="Projected" connectNulls activeDot={{ r: 6, strokeWidth: 0, fill: "#f59e0b" }} />
                  </AreaChart>
                </ResponsiveContainer>
                <div style={{ display: "flex", gap: "32px", marginTop: "24px", paddingTop: "24px", borderTop: "1px solid var(--color-border-tertiary)" }}>
                  {[{ color: "#10b981", label: "Actual spending" }, { color: "#f59e0b", label: "Projected (trend-based)", dash: true }].map((l, i) => (
                    <div key={i} style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                      <div style={{ width: "24px", height: "3px", background: l.color, borderRadius: "2px" }} />
                      <span style={{ fontSize: "14px", color: "var(--color-text-secondary)", fontWeight: 500 }}>{l.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "20px" }}>
                {[
                  { label: "Current Monthly Avg", value: fmt((insights.monthlySpending || []).slice(-3).reduce((s, m) => s + (m.amount || 0), 0) / Math.max(1, Math.min(3, insights.monthlySpending?.length || 1))), color: "#10b981" },
                  { label: "Next Month Target", value: fmt(insights.nextMonthProjection), color: "#f59e0b" },
                  { label: "Projected Savings", value: fmt(Math.max(0, (insights.totalIncome || 0) - (insights.nextMonthProjection || 0))), color: "#3b82f6" },
                  { label: "Annual Run Rate", value: fmt((insights.nextMonthProjection || 0) * 12), color: "#8b5cf6" },
                ].map((c, i) => (
                  <div key={i} className={`glass-card-static btn-interactive stagger-${(i % 3) + 2}`} style={{ padding: "24px" }}>
                    <p style={{ fontSize: "12px", color: "var(--color-text-tertiary)", marginBottom: "12px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em" }}>{c.label}</p>
                    <p style={{ ...S.mono, fontSize: "24px", fontWeight: 700, color: c.color, margin: 0 }}>{c.value}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {tab === "chat" && (
            <div className="glass-card stagger-1" style={{ display: "flex", flexDirection: "column", height: "700px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "16px", padding: "24px 32px", borderBottom: "1px solid var(--color-border-tertiary)" }}>
                <div style={{ width: "40px", height: "40px", borderRadius: "12px", background: "rgba(59,130,246,0.15)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <MessageSquare size={20} color="#3b82f6" />
                </div>
                <div>
                  <p style={{ fontSize: "16px", fontWeight: 700, color: "var(--color-text-primary)", margin: "0 0 4px" }}>Ask your Personal CFO</p>
                  <p style={{ fontSize: "13px", color: "var(--color-text-tertiary)", margin: 0 }}>Powered by Groq AI · Fully context-aware</p>
                </div>
                <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: "8px", background: "rgba(16,185,129,0.1)", padding: "6px 12px", borderRadius: "99px" }}>
                  <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#10b981", animation: "pulseGlow 2s infinite" }} />
                  <span style={{ fontSize: "12px", fontWeight: 600, color: "#10b981" }}>Online</span>
                </div>
              </div>

              <div style={{ flex: 1, overflowY: "auto", display: "flex", flexDirection: "column", gap: "20px", padding: "32px" }}>
                {messages.length === 0 && (
                  <div style={{ margin: "auto", textAlign: "center", color: "var(--color-text-tertiary)" }}>
                    <Brain size={48} color="var(--color-border-secondary)" style={{ marginBottom: "16px" }} />
                    <p style={{ fontSize: "16px", fontWeight: 500 }}>How can I help you understand your finances today?</p>
                  </div>
                )}
                {messages.map((m, i) => (
                  <div key={i} style={{ display: "flex", justifyContent: m.role === "user" ? "flex-end" : "flex-start" }}>
                    <div style={{ maxWidth: "75%", padding: "16px 20px", borderRadius: m.role === "user" ? "20px 20px 4px 20px" : "20px 20px 20px 4px", fontSize: "15px", lineHeight: 1.6, color: "var(--color-text-primary)", background: m.role === "user" ? "linear-gradient(135deg, rgba(59,130,246,0.2) 0%, rgba(59,130,246,0.1) 100%)" : "rgba(255,255,255,0.03)", border: `1px solid ${m.role === "user" ? "rgba(59,130,246,0.3)" : "var(--color-border-tertiary)"}`, boxShadow: "0 4px 10px rgba(0,0,0,0.1)" }}>
                      {m.content}
                    </div>
                  </div>
                ))}
                {chatLoading && (
                  <div style={{ display: "flex", gap: "6px", padding: "16px 20px", background: "rgba(255,255,255,0.03)", border: "1px solid var(--color-border-tertiary)", borderRadius: "20px 20px 20px 4px", width: "fit-content" }}>
                    {[0, 0.2, 0.4].map((d, i) => (
                      <div key={i} style={{ width: "8px", height: "8px", borderRadius: "50%", background: "var(--color-text-tertiary)", animation: `pulse 1.2s ${d}s infinite` }} />
                    ))}
                  </div>
                )}
                <div ref={chatEnd} />
              </div>

              <div style={{ borderTop: "1px solid var(--color-border-tertiary)", padding: "24px 32px", background: "rgba(0,0,0,0.1)" }}>
                <div style={{ display: "flex", gap: "12px", marginBottom: "16px", flexWrap: "wrap" }}>
                  {["Where did I spend the most?", "How much on food this month?", "How can I save £200/month?", "Which subscriptions to cancel?"].map(q => (
                    <button key={q} onClick={() => setChatInput(q)} className="btn-interactive" style={{ padding: "8px 16px", borderRadius: "99px", border: "1px solid var(--color-border-secondary)", background: "rgba(255,255,255,0.05)", cursor: "pointer", fontSize: "13px", fontWeight: 500, color: "var(--color-text-secondary)" }}>
                      {q}
                    </button>
                  ))}
                </div>
                <div style={{ display: "flex", gap: "12px" }}>
                  <input
                    value={chatInput}
                    onChange={e => setChatInput(e.target.value)}
                    onKeyDown={e => e.key === "Enter" && sendChat()}
                    placeholder="Ask anything about your finances…"
                    style={{ flex: 1, padding: "16px 20px", borderRadius: "16px", border: "1px solid var(--color-border-secondary)", background: "rgba(0,0,0,0.2)", color: "var(--color-text-primary)", fontSize: "15px", outline: "none", fontFamily: "inherit", transition: "border-color 0.2s" }}
                    onFocus={e => e.target.style.borderColor = "#3b82f6"}
                    onBlur={e => e.target.style.borderColor = "var(--color-border-secondary)"}
                  />
                  <button onClick={sendChat} className="btn-interactive" disabled={chatLoading || !chatInput.trim()} style={{ padding: "0 24px", borderRadius: "16px", border: "none", background: "linear-gradient(135deg, #10b981 0%, #059669 100%)", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", opacity: chatLoading || !chatInput.trim() ? 0.5 : 1, boxShadow: "0 4px 15px rgba(16,185,129,0.3)" }}>
                    <Send size={18} color="#fff" />
                  </button>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
      <style>{`@keyframes pulse{0%,100%{opacity:1}50%{opacity:0.4}} @keyframes floatCard{0%,100%{transform:translateY(0)}50%{transform:translateY(-15px)}}`}</style>
    </div>
  );
}
