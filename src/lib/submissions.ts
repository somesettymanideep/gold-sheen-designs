// Dummy localStorage-based store for contact + quote form submissions.
// NOTE: Data lives only in the current browser. Clearing browser storage
// removes it, and submissions made on other devices are not visible here.

export type SubmissionType = "contact" | "quote";

export type Submission = {
  id: string;
  type: SubmissionType;
  createdAt: string; // ISO string
  name: string;
  phone: string;
  email?: string;
  subject?: string;
  products?: string[];
  message?: string;
};

const STORAGE_KEY = "durga-submissions";

function isBrowser() {
  return typeof window !== "undefined";
}

export function getSubmissions(): Submission[] {
  if (!isBrowser()) return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed as Submission[];
  } catch {
    return [];
  }
}

function saveAll(list: Submission[]) {
  if (!isBrowser()) return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
  } catch {
    // ignore storage errors
  }
}

function makeId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

export function addSubmission(
  data: Omit<Submission, "id" | "createdAt">,
): Submission {
  const submission: Submission = {
    ...data,
    id: makeId(),
    createdAt: new Date().toISOString(),
  };
  const list = getSubmissions();
  list.unshift(submission);
  saveAll(list);
  return submission;
}

export function deleteSubmission(id: string) {
  saveAll(getSubmissions().filter((s) => s.id !== id));
}

export function clearSubmissions() {
  saveAll([]);
}

// ----- CSV helpers -----

const CSV_COLUMNS = [
  "id",
  "type",
  "createdAt",
  "name",
  "phone",
  "email",
  "subject",
  "products",
  "message",
] as const;

function escapeCsv(value: string): string {
  if (/[",\n\r]/.test(value)) {
    return `"${value.replace(/"/g, '""')}"`;
  }
  return value;
}

export function exportCsv(list: Submission[] = getSubmissions()): string {
  const header = CSV_COLUMNS.join(",");
  const rows = list.map((s) =>
    CSV_COLUMNS.map((col) => {
      if (col === "products") return escapeCsv((s.products ?? []).join("; "));
      const v = s[col];
      return escapeCsv(v == null ? "" : String(v));
    }).join(","),
  );
  return [header, ...rows].join("\n");
}

// Minimal RFC-4180-ish CSV parser (handles quotes, commas, newlines).
function parseCsv(text: string): string[][] {
  const rows: string[][] = [];
  let row: string[] = [];
  let field = "";
  let inQuotes = false;
  const src = text.replace(/\r\n/g, "\n").replace(/\r/g, "\n");

  for (let i = 0; i < src.length; i++) {
    const c = src[i];
    if (inQuotes) {
      if (c === '"') {
        if (src[i + 1] === '"') {
          field += '"';
          i++;
        } else {
          inQuotes = false;
        }
      } else {
        field += c;
      }
    } else if (c === '"') {
      inQuotes = true;
    } else if (c === ",") {
      row.push(field);
      field = "";
    } else if (c === "\n") {
      row.push(field);
      rows.push(row);
      row = [];
      field = "";
    } else {
      field += c;
    }
  }
  // last field/row
  if (field !== "" || row.length > 0) {
    row.push(field);
    rows.push(row);
  }
  return rows;
}

export type ImportResult = { added: number; skipped: number };

// Imports CSV and merges into existing submissions. Rows with an id that
// already exists are skipped, so re-importing the same file is safe.
export function importCsv(text: string): ImportResult {
  const rows = parseCsv(text).filter((r) => r.some((c) => c.trim() !== ""));
  if (rows.length === 0) return { added: 0, skipped: 0 };

  const header = rows[0].map((h) => h.trim().toLowerCase());
  const idx = (name: string) => header.indexOf(name);

  const existing = getSubmissions();
  const existingIds = new Set(existing.map((s) => s.id));
  let added = 0;
  let skipped = 0;

  for (let r = 1; r < rows.length; r++) {
    const cols = rows[r];
    const get = (name: string) => {
      const i = idx(name);
      return i >= 0 ? (cols[i] ?? "").trim() : "";
    };

    const type: SubmissionType = get("type") === "contact" ? "contact" : "quote";
    const id = get("id") || makeId();
    if (existingIds.has(id)) {
      skipped++;
      continue;
    }

    const productsRaw = get("products");
    const submission: Submission = {
      id,
      type,
      createdAt: get("createdat") || new Date().toISOString(),
      name: get("name"),
      phone: get("phone"),
      email: get("email") || undefined,
      subject: get("subject") || undefined,
      products: productsRaw
        ? productsRaw.split(";").map((p) => p.trim()).filter(Boolean)
        : undefined,
      message: get("message") || undefined,
    };

    existing.push(submission);
    existingIds.add(id);
    added++;
  }

  // newest first
  existing.sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));
  saveAll(existing);
  return { added, skipped };
}
