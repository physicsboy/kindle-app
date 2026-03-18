export async function onRequestGet({ env }) {
  try {
    // 1. Fetch items from D1. 
    // We order by 'completed' so active items stay at the top.
    const { results } = await env.DB.prepare(
      "SELECT * FROM items ORDER BY completed ASC, id DESC"
    ).all();

    // Create a simple timestamp (e.g., 21:45)
    const now = new Date();
    const timestamp = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    // 2. Handle the empty state
    if (results.length === 0) {
      return new Response(
        '<p style="text-align: center; color: gray;">Your list is empty.</p>', 
        { headers: { "Content-Type": "text/html" } }
      );
    }

    // 3. Build the HTML list
    const html = `
      <ul style="list-style: none; padding: 0; margin: 0;">
        ${results.map(item => {
          const isDone = item.completed === 1;
          return `
            <li style="
              display: flex; 
              align-items: center; 
              padding: 12px 0; 
              border-bottom: 1px solid #eee;
            ">
              <input 
                type="checkbox" 
                ${isDone ? 'checked' : ''} 
                hx-post="/shopping/toggle?id=${item.id}"
                hx-trigger="change"
                style="width: 20px; height: 20px; margin-right: 15px;"
              >
              
              <span style="
                flex-grow: 1;
                font-size: 1.1rem;
                ${isDone ? 'text-decoration: line-through; color: #888;' : ''}
              ">
                ${item.name}
              </span>

              <button 
                hx-delete="/shopping/delete?id=${item.id}" 
                hx-target="closest li" 
                hx-swap="outerHTML"
                hx-confirm="Delete '${item.name}'?"
                style="
                  background: none; 
                  border: 1px solid #ccc; 
                  padding: 5px 10px; 
                  font-size: 0.8rem;
                  cursor: pointer;
                "
              >
                Delete
              </button>
            </li>
          `;
        }).join("")}
      </ul>
      <div style="font-size: 0.8rem; color: #666; text-align: center; margin-top: 20px;">
        Last updated: ${timestamp}
      </div>
    `;

    return new Response(html, {
      headers: { "Content-Type": "text/html" }
    });

  } catch (error) {
    // Helpful for debugging in the Cloudflare Logs
    console.error("Database Error:", error);
    return new Response(
      `<p style="color: red;">Error loading list: ${error.message}</p>`, 
      { status: 500, headers: { "Content-Type": "text/html" } }
    );
  }
}