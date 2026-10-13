// Demo booking inquiry: change this to your real contact email before publishing.
const CONTACT_EMAIL = 'your-email@example.com';
const form = document.getElementById('bookingForm');
if (form) {
  const params = new URLSearchParams(window.location.search);
  const wanted = params.get('package');
  if (wanted) { const select = document.getElementById('package'); for (const option of select.options) { if (option.text.toLowerCase() === wanted.toLowerCase()) select.value = option.text; } }
  const arrival = document.getElementById('arrival');
  if (arrival) { const today = new Date(); const local = new Date(today.getTime() - today.getTimezoneOffset()*60000).toISOString().slice(0,10); arrival.min = local; }
  form.addEventListener('submit', function(event) {
    event.preventDefault();
    if (!form.reportValidity()) return;
    const data = new FormData(form);
    const subject = encodeURIComponent('Boracay trip inquiry — ' + data.get('package'));
    const body = encodeURIComponent(`Hello Explore Boracay,

I would like to ask about a trip.

Name: ${data.get('name')}
Email: ${data.get('email')}
Arrival date: ${data.get('arrival')}
Guests: ${data.get('guests')}
Experience: ${data.get('package')}
Additional requests: ${data.get('message') || 'None'}

Please let me know availability and final pricing. Thank you.`);
    document.getElementById('formStatus').textContent = 'Opening your email app. Review the details and press Send to submit your inquiry.';
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
  });
}
