export async function onRequestGet() {
  // Mock data (In-memory resets every time the function sleeps)
  const items = [
    { id: 1, name: "Milk" },
    { id: 2, name: "Bread" }
  ];

  const html = `
    <ul>
      ${items.map(item => `
        <li>
          ${item.name}
          <button 
            hx-delete="/shopping/delete?id=${item.id}" 
            hx-target="closest li" 
            hx-swap="outerHTML"
            hx-confirm="Delete this item?"
          >
            ❌
          </button>
        </li>
      `).join("")}
    </ul>
  `;

  return new Response(html, {
    headers: { "Content-Type": "text/html" }
  });
}