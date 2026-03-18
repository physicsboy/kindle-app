export async function onRequestPost({ request }) {
  const formData = await request.formData();
  const item = formData.get("item");

  console.log("Add:", item);

  // TODO: save to DB

  return fetch(new Request(new URL("/shopping/list", request.url)));
}