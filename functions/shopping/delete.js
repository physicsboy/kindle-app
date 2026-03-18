export async function onRequestDelete({ request }) {
  const url = new URL(request.url);
  const id = url.searchParams.get("id");

  console.log("Delete:", id);

  // TODO: delete from DB

  return fetch(new Request(new URL("/api/shopping/list", request.url)));
}