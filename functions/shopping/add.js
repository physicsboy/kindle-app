// export async function onRequestPost({ request }) {
//   console.log('/// add', {request})
//   const formData = await request.formData();
//   const item = formData.get("item");

//   console.log("Add:", item);

//   // TODO: save to DB

//   return fetch(new Request(new URL("/shopping/list", request.url)));
// }

// export async function onRequestPost({ request }) {
//   const formData = await request.formData();
//   const item = formData.get("item");

//   // TODO: Save to DB here (D1, KV, etc.)
//   console.log("Add:", item);

//   // Instead of fetch(), we redirect HTMX to fetch the list 
//   // OR we just return the updated list HTML directly.
//   // To keep it simple, let's trigger a refresh via a Header:
//   return new Response("Added!", {
//     status: 200,
//     headers: { 
//       "Content-Type": "text/html",
//       "HX-Trigger": "load" // This tells HTMX to trigger the 'load' event on your list div!
//     }
//   });
// }

export async function onRequestPost({ request }) {
  const formData = await request.formData();
  const item = formData.get("item");

  console.log("Saving to DB:", item);

  // After saving to DB, we don't send back HTML. 
  // We send a 200 OK and tell HTMX to "refresh" the list.
  return new Response("", {
    status: 200,
    headers: { 
      "HX-Trigger": "reloadList" 
    }
  });
}