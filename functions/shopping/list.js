// export async function onRequestGet() {
//   // TEMP: in-memory mock
//   const items = [
//     { id: 1, name: "Milk" },
//     { id: 2, name: "Bread" }
//   ];

//   return new Response(`
//     <ul>
//       ${items.map(item => `
//         <li>
//           ${item.name}
//           <button 
//             hx-delete="/shopping/delete?id=${item.id}"
//             hx-target="#list"
//             hx-swap="innerHTML"
//           >
//             ❌
//           </button>
//         </li>
//       `).join("")}
//     </ul>
//   `, {
//     headers: { "Content-Type": "text/html" }
//   });
// }

// This is your mock data. In a real app, this would be a D1 or KV query.
export const mockItems = [
  { id: 1, name: "Milk" },
  { id: 2, name: "Bread" }
];

export function renderList(items) {
  return `
    <ul>
      ${items.map(item => `
        <li>
          ${item.name}
          <button 
            hx-delete="/shopping/delete?id=${item.id}" 
            hx-target="#list"
            hx-confirm="Are you sure?"
          >
            ❌
          </button>
        </li>
      `).join("")}
    </ul>
  `;
}

export async function onRequestGet() {
  return new Response(renderList(mockItems), {
    headers: { "Content-Type": "text/html" }
  });
}