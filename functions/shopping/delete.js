export async function onRequestDelete({ request }) {
  const url = new URL(request.url);
  const id = url.searchParams.get("id");

  console.log("Deleting ID:", id);

  // We return a 200. Since the button has hx-swap="outerHTML", 
  // returning an empty response will effectively "remove" the <li>.
  return new Response("", { status: 200 });
}