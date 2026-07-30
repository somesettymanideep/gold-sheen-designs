// Global on/off switch for the site chat bot.
// Stored in localStorage so the admin can toggle it from /admin.

const KEY = "durga-chatbot-enabled";
const EVENT = "durga-chatbot-setting";

export function isChatBotEnabled(): boolean {
  if (typeof window === "undefined") return true;
  try {
    return window.localStorage.getItem(KEY) !== "0";
  } catch {
    return true;
  }
}

export function setChatBotEnabled(enabled: boolean) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(KEY, enabled ? "1" : "0");
  } catch {
    // ignore storage errors
  }
  window.dispatchEvent(new CustomEvent(EVENT));
}

export function subscribeChatBotSetting(cb: () => void) {
  if (typeof window === "undefined") return () => {};
  window.addEventListener(EVENT, cb);
  window.addEventListener("storage", cb);
  return () => {
    window.removeEventListener(EVENT, cb);
    window.removeEventListener("storage", cb);
  };
}
