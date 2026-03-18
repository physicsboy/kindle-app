export async function onRequestGet(({env}) {
  try {
    // Query DB
    const {results} = await env.DB.prepare("SELECT * FROM items").all();

    const html = `
      <ul>
        ${results.map(item => `
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
  } catch {
    return new Response(`Error fetching items from table`, { status: 500 });
  }
}

export async function onRequestGet({ env }) {
  let results;
  try {
    const res = await env.DB.prepare("SELECT * FROM items ORDER BY id DESC").all();
    results = res.results;
  } catch {
    return new Response(`Error fetching items from table`, { status: 500 });
  }

  const html = `
    <ul style="list-style: none; padding: 0;">
      ${results.map(item => {
        const isDone = item.completed === 1;
        return `
          <li style="margin-bottom: 10px; display: flex; align-items: center;">
            <input 
              type="checkbox" 
              ${isDone ? 'checked' : ''} 
              hx-post="/shopping/toggle?id=${item.id}"
              hx-trigger="change"
              style="margin-right: 10px;"
            >
            
            <span style="${isDone ? 'text-decoration: line-through; color: gray;' : ''}">
              ${item.name}
            </span>

            <button 
              hx-delete="/shopping/delete?id=${item.id}" 
              hx-target="closest li" 
              style="margin-left: auto; background: none; border: none; cursor: pointer;"
            >
              ❌
            </button>
          </li>
        `;
      }).join("")}
    </ul>
  `;

  return new Response(html, {
    headers: { "Content-Type": "text/html" }
  });
}