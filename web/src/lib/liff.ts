import liff from "@line/liff";

export type LiffInfo = {
  loggedIn: boolean;
  displayName?: string;
  userId?: string;
  isInClient: boolean;
};

export async function initLiff(): Promise<LiffInfo | null> {
  const id = process.env.NEXT_PUBLIC_LIFF_ID;
  if (!id) return null;
  try {
    await liff.init({ liffId: id });
  } catch (e) {
    console.error("LIFF Init failed", e);
    return null;
  }

  const isInClient = liff.isInClient();
  if (!liff.isLoggedIn()) {
    if (isInClient) {
      // Auto login in LINE client if somehow not logged in (rare)
      liff.login();
    }
    return { loggedIn: false, isInClient };
  }

  const profile = await liff.getProfile();
  return { loggedIn: true, displayName: profile.displayName, userId: profile.userId, isInClient };
}

export function closeWindow() {
  if (liff.isInClient()) liff.closeWindow();
}

export function login() {
  try {
    liff.login();
  } catch {}
}
