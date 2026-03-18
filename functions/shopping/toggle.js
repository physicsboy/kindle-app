export async function onRequestPost({ request, env }) {
  const url = new URL(request.url);
  const id = url.searchParams.get("id");

  try {
	  if (id) {
	    // This SQL flips 0 to 1 and 1 to 0 automatically
	    await env.DB.prepare("UPDATE items SET completed = 1 - completed WHERE id = ?")
	      .bind(id)
	      .run();
	  }

	  // Trigger a reload so the list reflects the new "checked" state
	  return new Response(null, {
	    status: 200,
	    headers: { "HX-Trigger": "reloadList" }
	  });
	} catch {
    	return new Response(`Error toggling item ${id} in table`, { status: 500 });
	}
}