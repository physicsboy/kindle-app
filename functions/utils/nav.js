export async function onRequestGet() {
  const navHtml = `
    <nav style="border-bottom: 2px solid #000; padding-bottom: 10px; margin-bottom: 20px;">
      <a href="/" style="margin-right: 15px; font-weight: bold; text-decoration: none;">🏠 Home</a>
      <a href="/shopping.html" style="margin-right: 15px; text-decoration: none;">🛒 Shopping</a>
      <a href="/calendar.html" style="text-decoration: none;">📅 Calendar</a>
    </nav>
  `;

  return new Response(navHtml, {
    headers: { "Content-Type": "text/html" }
  });
}
