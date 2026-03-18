// export async function onRequestDelete({ request }) {
//   const url = new URL(request.url);
//   const id = url.searchParams.get("id");

//   console.log("Delete:", id);

//   // TODO: delete from DB

//   return fetch(new Request(new URL("/shopping/list", request.url)));
// }

export async function onRequestDelete({ request }) {
  const url = new URL(request.url);
  const id = url.searchParams.get("id");

  console.log("Deleting ID:", id);

  return new Response("", {
    status: 200,
    headers: { 
      "HX-Trigger": "reloadList" 
    }
  });
}