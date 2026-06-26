import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import {
  Lock,
  Trash2,
  Download,
  Upload,
  RefreshCw,
  LogOut,
  Inbox,
  Mail,
  FileText,
} from "lucide-react";
import {
  getSubmissions,
  deleteSubmission,
  clearSubmissions,
  exportCsv,
  importCsv,
  type Submission,
} from "@/lib/submissions";

// Dummy admin gate. This is NOT real security — the password lives in the
// client bundle. Change it here if needed.
const ADMIN_PASSWORD = "durga@2024";
const SESSION_KEY = "durga-admin-authed";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Admin — Submissions" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: AdminPage,
});

function AdminPage() {
  const [authed, setAuthed] = useState(false);

  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      window.sessionStorage.getItem(SESSION_KEY) === "1"
    ) {
      setAuthed(true);
    }
  }, []);

  if (!authed) return <LoginGate onSuccess={() => setAuthed(true)} />;
  return <Dashboard onLogout={() => setAuthed(false)} />;
}

function LoginGate({ onSuccess }: { onSuccess: () => void }) {
  const [value, setValue] = useState("");
  const [error, setError] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (value === ADMIN_PASSWORD) {
      window.sessionStorage.setItem(SESSION_KEY, "1");
      onSuccess();
    } else {
      setError(true);
    }
  };

  return (
    <div className="min-h-screen grid place-items-center bg-[#F4F0EA] px-4">
      <form
        onSubmit={submit}
        className="w-full max-w-sm rounded-3xl bg-white p-8 shadow-soft"
      >
        <span className="grid h-14 w-14 place-items-center rounded-2xl gradient-gold text-white shadow-gold">
          <Lock className="h-6 w-6" />
        </span>
        <h1 className="mt-6 font-display text-2xl font-bold text-charcoal">
          Admin Login
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Enter the admin password to view form submissions.
        </p>
        <input
          type="password"
          autoFocus
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
            setError(false);
          }}
          placeholder="Password"
          className="mt-6 w-full rounded-xl border border-border bg-beige/40 px-4 py-3 text-sm text-charcoal outline-none focus:border-gold focus:ring-2 focus:ring-gold/30"
        />
        {error && (
          <p className="mt-2 text-sm text-red-600">Incorrect password.</p>
        )}
        <button
          type="submit"
          className="mt-5 w-full rounded-xl gradient-gold px-6 py-3.5 text-sm font-semibold text-white shadow-gold transition hover:scale-[1.01]"
        >
          Sign In
        </button>
      </form>
    </div>
  );
}

function formatDate(iso: string) {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleString();
}

function Dashboard({ onLogout }: { onLogout: () => void }) {
  const [items, setItems] = useState<Submission[]>([]);
  const [filter, setFilter] = useState<"all" | "contact" | "quote">("all");
  const fileRef = useRef<HTMLInputElement>(null);

  const refresh = () => setItems(getSubmissions());
  useEffect(refresh, []);

  const logout = () => {
    window.sessionStorage.removeItem(SESSION_KEY);
    onLogout();
  };

  const handleDelete = (id: string) => {
    deleteSubmission(id);
    refresh();
  };

  const handleClearAll = () => {
    if (window.confirm("Delete ALL submissions? This cannot be undone.")) {
      clearSubmissions();
      refresh();
    }
  };

  const handleExport = () => {
    const csv = exportCsv(getSubmissions());
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `submissions-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const result = importCsv(String(reader.result ?? ""));
      refresh();
      alert(`Import complete. Added ${result.added}, skipped ${result.skipped}.`);
    };
    reader.readAsText(file);
    e.target.value = "";
  };

  const filtered = items.filter((s) => filter === "all" || s.type === filter);
  const contactCount = items.filter((s) => s.type === "contact").length;
  const quoteCount = items.filter((s) => s.type === "quote").length;

  return (
    <div className="min-h-screen bg-[#F4F0EA]">
      <header className="border-b border-border bg-white">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-4 py-5 sm:px-6">
          <div>
            <h1 className="font-display text-2xl font-bold text-charcoal">
              Submissions
            </h1>
            <p className="text-sm text-muted-foreground">
              Contact form &amp; quote popup entries
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={refresh}
              className="inline-flex items-center gap-2 rounded-xl border border-border bg-white px-4 py-2.5 text-sm font-semibold text-charcoal transition hover:border-gold/50"
            >
              <RefreshCw className="h-4 w-4" /> Refresh
            </button>
            <button
              onClick={handleExport}
              className="inline-flex items-center gap-2 rounded-xl border border-border bg-white px-4 py-2.5 text-sm font-semibold text-charcoal transition hover:border-gold/50"
            >
              <Download className="h-4 w-4" /> Export CSV
            </button>
            <button
              onClick={() => fileRef.current?.click()}
              className="inline-flex items-center gap-2 rounded-xl border border-border bg-white px-4 py-2.5 text-sm font-semibold text-charcoal transition hover:border-gold/50"
            >
              <Upload className="h-4 w-4" /> Import CSV
            </button>
            <input
              ref={fileRef}
              type="file"
              accept=".csv,text/csv"
              onChange={handleImport}
              className="hidden"
            />
            <button
              onClick={logout}
              className="inline-flex items-center gap-2 rounded-xl gradient-gold px-4 py-2.5 text-sm font-semibold text-white shadow-gold"
            >
              <LogOut className="h-4 w-4" /> Logout
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        {/* Filter tabs */}
        <div className="mb-6 flex flex-wrap items-center gap-2">
          {(
            [
              { key: "all", label: `All (${items.length})` },
              { key: "contact", label: `Contact (${contactCount})` },
              { key: "quote", label: `Quote (${quoteCount})` },
            ] as const
          ).map((t) => (
            <button
              key={t.key}
              onClick={() => setFilter(t.key)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                filter === t.key
                  ? "gradient-gold text-white shadow-gold"
                  : "border border-border bg-white text-charcoal hover:border-gold/50"
              }`}
            >
              {t.label}
            </button>
          ))}
          {items.length > 0 && (
            <button
              onClick={handleClearAll}
              className="ml-auto inline-flex items-center gap-2 rounded-full border border-red-200 bg-white px-4 py-2 text-sm font-medium text-red-600 transition hover:bg-red-50"
            >
              <Trash2 className="h-4 w-4" /> Clear all
            </button>
          )}
        </div>

        {filtered.length === 0 ? (
          <div className="grid place-items-center rounded-3xl bg-white py-20 text-center shadow-soft">
            <Inbox className="h-12 w-12 text-muted-foreground/50" />
            <p className="mt-4 font-display text-xl font-bold text-charcoal">
              No submissions yet
            </p>
            <p className="mt-1 max-w-md text-sm text-muted-foreground">
              Entries from the contact form and the quote popup will appear here.
              Data is stored only in this browser.
            </p>
          </div>
        ) : (
          <div className="grid gap-4">
            {filtered.map((s) => (
              <article
                key={s.id}
                className="rounded-2xl bg-white p-5 shadow-soft sm:p-6"
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <span
                      className={`grid h-10 w-10 place-items-center rounded-xl text-white ${
                        s.type === "contact" ? "bg-charcoal" : "gradient-gold"
                      }`}
                    >
                      {s.type === "contact" ? (
                        <Mail className="h-5 w-5" />
                      ) : (
                        <FileText className="h-5 w-5" />
                      )}
                    </span>
                    <div>
                      <h3 className="font-display text-lg font-bold text-charcoal">
                        {s.name || "—"}
                      </h3>
                      <p className="text-xs uppercase tracking-widest text-muted-foreground">
                        {s.type} · {formatDate(s.createdAt)}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleDelete(s.id)}
                    aria-label="Delete submission"
                    className="grid h-9 w-9 place-items-center rounded-lg border border-red-200 text-red-600 transition hover:bg-red-50"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>

                <dl className="mt-4 grid gap-x-8 gap-y-2 text-sm sm:grid-cols-2">
                  <Field label="Phone" value={s.phone} />
                  {s.email && <Field label="Email" value={s.email} />}
                  {s.subject && <Field label="Subject" value={s.subject} />}
                  {s.products && s.products.length > 0 && (
                    <Field label="Products" value={s.products.join(", ")} />
                  )}
                </dl>
                {s.message && (
                  <div className="mt-3 rounded-xl bg-beige/40 px-4 py-3 text-sm text-charcoal">
                    {s.message}
                  </div>
                )}
              </article>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex gap-2">
      <dt className="shrink-0 font-semibold text-muted-foreground">{label}:</dt>
      <dd className="break-words text-charcoal">{value}</dd>
    </div>
  );
}
