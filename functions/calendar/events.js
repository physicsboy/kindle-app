export async function onRequestGet({env}) {

  const CALENDAR_URL = env.['google-calendar'];
  if (!CALENDAR_URL) {
    return new Response("Secret CALENDAR_URL not found", { status: 500 });
  }


  try {
    const response = await fetch(CALENDAR_URL);
    const text = await response.text();

    // 2. Simple Parser: Find SUMMARY (Title) and DTSTART (Date)
    // This looks for lines starting with SUMMARY: or DTSTART;VALUE=DATE:
    const events = [];
    const lines = text.split('\n');
    let currentEvent = {};

    for (let line of lines) {
      if (line.startsWith('BEGIN:VEVENT')) currentEvent = {};
      if (line.startsWith('SUMMARY:')) currentEvent.title = line.replace('SUMMARY:', '').trim();
      if (line.startsWith('DTSTART')) {
        // Extracts the date part (YYYYMMDD)
        const dateMatch = line.match(/\d{8}/);
        if (dateMatch) {
          const d = dateMatch[0];
          currentEvent.date = `${d.slice(0,4)}-${d.slice(4,6)}-${d.slice(6,8)}`;
        }
      }
      if (line.startsWith('END:VEVENT')) {
        // Only keep upcoming events (simplistic check)
        if (currentEvent.date >= new Date().toISOString().split('T')[0]) {
          events.push(currentEvent);
        }
      }
    }

    // Sort by date and take the top 5
    const upcoming = events.sort((a, b) => a.date.localeCompare(b.date)).slice(0, 5);

    // 3. Generate Kindle-friendly HTML
    const html = `
      <div style="font-family: sans-serif;">
        ${upcoming.map(e => `
          <div style="padding: 10px 0; border-bottom: 1px solid #000;">
            <div style="font-size: 0.9rem; font-weight: bold;">${e.date}</div>
            <div style="font-size: 1.2rem;">${e.title}</div>
          </div>
        `).join('')}
        ${upcoming.length === 0 ? '<p>No upcoming events found.</p>' : ''}
      </div>
    `;

    return new Response(html, { headers: { "Content-Type": "text/html" } });

  } catch (err) {
    return new Response(`<p>Error loading Google Calendar: ${err.message}</p>`, { status: 500 });
  }
}