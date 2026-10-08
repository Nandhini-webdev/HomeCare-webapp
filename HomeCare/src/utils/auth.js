export function isAdmin(user) {
  if (!user) return false;
  if (user.publicMetadata?.role === "admin") return true;
  const configured = import.meta.env.VITE_ADMIN_EMAIL?.trim().toLowerCase();
  const email = user.primaryEmailAddress?.emailAddress?.trim().toLowerCase();
  return Boolean(configured && email === configured);
}
