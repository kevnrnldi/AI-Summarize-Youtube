// simpan id unik dari localstorage browser
export function getSessionId(): string {
  if (typeof window === "undefined") return "";

  let sessionId: string | null = localStorage.getItem("sessionId");

  //jika belum ada session id coba buat session id baru
  if (!sessionId) {
    sessionId = crypto.randomUUID();

    //simpan ke storage
    localStorage.setItem("sessionId", sessionId);
  }

  return sessionId;
}
