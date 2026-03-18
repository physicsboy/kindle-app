export async function onRequestGet() {
  // TEMP: in-memory mock
  const items = [
    { id: 1, name: "Milk" },
    { id: 2, name: "Bread" }
  ];

  return new Response(`
    <ul>
      ${items.map(item => `
        <li>
          ${item.name}
          <button 
            hx-delete="/shopping/delete?id=${item.id}"
            hx-target="#list"
            hx-swap="innerHTML"
          >
            ❌
          </button>
        </li>
      `).join("")}
    </ul>
  `, {
    headers: { "Content-Type": "text/html" }
  });
}