export async function onRequestDelete({ env }) {
  try {
    // 1. Wipe the entire table
    await env.DB.prepare("DELETE FROM items").run();

    // 2. Return the 'reloadList' trigger so the UI updates to show an empty list
    return new Response("Table Cleared", {
      status: 200,
      headers: { 
        "HX-Trigger": "reloadList" 
      }
    });
  } catch (e) {
    return new Response("Error clearing table", { status: 500 });
  }
}