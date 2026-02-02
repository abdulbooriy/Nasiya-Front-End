export function checkTelegramInitData(initData: string): number | null {
  if (!initData) return null;

  const params = new URLSearchParams(initData);
  const userJson = params.get("user");

  if (!userJson) return null;

  try {
    const user = JSON.parse(userJson);
    return user?.id || null;
  } catch (err) {
    console.error(" JSON parse xatolik:", err);
    return null;
  }
}
