export async function onRequestDelete({ env }) {
  try {
    // Delete only the checked items
    await env.DB.prepare("DELETE FROM items WHERE completed = 1").run();

    // Trigger the list to reload so the checked items vanish
    return new Response("Cleared Completed", {
      status: 200,
      headers: { 
        "HX-Trigger": "reloadList" 
      }
    });
  } catch (e) {
    return new Response("Error deleting completed items", { status: 500 });
  }
}