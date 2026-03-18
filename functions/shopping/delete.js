export async function onRequestDelete({ request, env }) {
  const url = new URL(request.url);
  const id = url.searchParams.get("id");

  try {
    if (id) {
      console.log("Deleting ID:", id);
      await env.DB.prepare("DELETE FROM items WHERE id = ?")
        .bind(id)
        .run();
    }

    // We return a 200. Since the button has hx-swap="outerHTML", 
    // returning an empty response will effectively "remove" the <li>.
    return new Response("", { status: 200 });
  } catch {
    return new Response(`Error removing item from table`, { status: 500 });
  }
}