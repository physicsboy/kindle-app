export async function onRequestGet() {
  const events = [
    { title: "Meeting", date: "2026-03-18" },
    { title: "Shopping", date: "2026-03-19" }
  ];

  return new Response(`
    <ul>
      ${events.map(e => `
        <li>${e.title} - ${e.date}</li>
      `).join("")}
    </ul>
  `, {
    headers: { "Content-Type": "text/html" }
  });
}