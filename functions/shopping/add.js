export async function onRequestPost({ request, env }) {
  const formData = await request.formData();
  const item = formData.get("item");

  try {
    if (item) {
      console.log("Item to add:", item);
      await env.DB.prepare("INSERT INTO items (name) VALUES (?)");
    }

    // Success response with the HX-Trigger header
    return new Response("Added", {
      status: 200,
      headers: { 
        "HX-Trigger": "reloadList" 
      }
    });
  } catch {
    return new Response(`Error adding item ${item} to table`, { status: 500 });
  }
}