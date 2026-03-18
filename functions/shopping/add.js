export async function onRequestPost({ request }) {
  const formData = await request.formData();
  const item = formData.get("item");

  console.log("Item to add:", item);

  // Success response with the HX-Trigger header
  return new Response("Success", {
    status: 200,
    headers: { 
      "HX-Trigger": "reloadList" 
    }
  });
}