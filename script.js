// gens.arts — small interactions

document.getElementById("yr").textContent = new Date().getFullYear();

// add ?preview to any URL to replay the popup + toast on every reload, sped up
const PREVIEW = location.search.includes("preview");

// --- "we're open for orders" announcement bar + one-time popup ---
(() => {
  const KEY   = "ga_open_popup_v1";      // once per visit — the bar does the repeat reminding
  const WA    = "https://wa.me/918454020425?text=" +
                encodeURIComponent("Hi Gen! I saw you're open for orders — I'd like to order a candle.");

  // slim bar, always on
  const bar = document.createElement("div");
  bar.className = "annbar";
  bar.innerHTML =
    '<span class="dot" aria-hidden="true"></span>' +
    "We’re now <strong>open for candle orders</strong> " +
    '<a href="/candles">See the candle designs &rarr;</a>';
  document.body.prepend(bar);

  if (sessionStorage.getItem(KEY) && !PREVIEW) return;

  const pop = document.createElement("div");
  pop.className = "popup";
  pop.hidden = true;
  pop.setAttribute("role", "dialog");
  pop.setAttribute("aria-modal", "true");
  pop.setAttribute("aria-label", "We are open for candle orders");
  pop.innerHTML = `
    <div class="popup-card">
      <button class="popup-close" aria-label="Close">&times;</button>
      <div class="popup-art">
        <img src="/images/candles/open-for-orders.jpg"
             alt="We're open for orders — handmade candles by Gen's Arts" />
      </div>
      <div class="popup-copy">
        <p class="eyebrow">Gen&rsquo;s Arts</p>
        <h2>We&rsquo;re <em>open</em><br/>for orders!</h2>
        <p class="popup-lede">
          After a beautiful journey into motherhood, I&rsquo;m so happy to share
          that we are now open for candle orders.
        </p>
        <ul class="popup-points">
          <li>Handcrafted with love</li>
          <li>Gifts, weddings, hampers &amp; occasions</li>
          <li>Custom orders welcome</li>
        </ul>
        <div class="popup-cta">
          <a href="/candles" class="btn small">See candle designs</a>
          <a href="${WA}" target="_blank" rel="noopener" class="btn small wa">Order on WhatsApp</a>
        </div>
        <button class="popup-later">Maybe later</button>
      </div>
    </div>`;
  document.body.appendChild(pop);

  const dismiss = () => {
    pop.hidden = true;
    document.body.classList.remove("no-scroll");
    sessionStorage.setItem(KEY, "1");
  };
  pop.querySelector(".popup-close").addEventListener("click", dismiss);
  pop.querySelector(".popup-later").addEventListener("click", dismiss);
  pop.querySelectorAll(".popup-cta a").forEach(a => a.addEventListener("click", dismiss));
  pop.addEventListener("click", (e) => { if (e.target === pop) dismiss(); });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !pop.hidden) dismiss();
  });

  setTimeout(() => {
    pop.hidden = false;
    document.body.classList.add("no-scroll");
    pop.querySelector(".popup-close").focus();
  }, 1200);
})();

// --- follow-up toast: a quieter second nudge, 2 min in ---
(() => {
  const KEY  = "ga_toast_v1";
  const WA   = "https://wa.me/918454020425?text=" +
               encodeURIComponent("Hi Gen! We have an occasion coming up — can you check if the date is free?");
  if (sessionStorage.getItem(KEY) && !PREVIEW) return;

  setTimeout(() => {
    if (sessionStorage.getItem(KEY) && !PREVIEW) return;

    const t = document.createElement("aside");
    t.className = "toast";
    t.setAttribute("role", "complementary");
    t.setAttribute("aria-label", "Ordering a candle");
    t.innerHTML = `
      <button class="toast-close" aria-label="Dismiss">&times;</button>
      <p class="toast-kicker">Have a date in mind?</p>
      <p class="toast-body">
        Tell us when your baptism, communion or wedding is and we&rsquo;ll
        confirm we can have it ready in time &mdash; with a mockup to approve
        before you pay a rupee.
      </p>
      <a href="${WA}" target="_blank" rel="noopener" class="btn small wa">Check my date</a>`;
    document.body.appendChild(t);
    requestAnimationFrame(() => t.classList.add("in"));

    const close = () => {
      t.classList.remove("in");
      sessionStorage.setItem(KEY, "1");
      setTimeout(() => t.remove(), 400);
    };
    t.querySelector(".toast-close").addEventListener("click", close);
    t.querySelector("a").addEventListener("click", close);
  }, PREVIEW ? 4000 : 120000);   // 2 minutes
})();

// --- gallery filter + lightbox ---
const filters = document.getElementById("filters");
const masonry = document.getElementById("masonry");
const lb      = document.getElementById("lightbox");

if (filters && masonry) {
  filters.addEventListener("click", (e) => {
    const b = e.target.closest("button[data-filter]");
    if (!b) return;
    filters.querySelectorAll("button").forEach(x => x.classList.remove("on"));
    b.classList.add("on");
    const tag = b.dataset.filter;
    masonry.querySelectorAll("figure").forEach(f => {
      f.classList.toggle("hide", tag !== "all" && f.dataset.tag !== tag);
    });
  });
}

// --- order form -> whatsapp ---
const orderForm = document.getElementById("orderForm");
if (orderForm) {
  orderForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const d = new FormData(orderForm);
    const lines = [
      "Hi Gen! I'd like to enquire about an order.",
      "",
      "Name: "       + (d.get("name")     || "—"),
      "Product: "    + (d.get("product")  || "—"),
      "Quantity: "   + (d.get("quantity") || "—"),
      "Needed by: "  + (d.get("date")     || "—"),
      "",
      "Details:",
      (d.get("message") || "—"),
    ];
    const url = "https://wa.me/918454020425?text=" +
                encodeURIComponent(lines.join("\n"));
    window.open(url, "_blank", "noopener");
  });
}

if (masonry && lb) {
  const img = document.getElementById("lb-img");
  const cap = document.getElementById("lb-cap");
  masonry.addEventListener("click", (e) => {
    const f = e.target.closest("figure");
    if (!f) return;
    img.src = f.querySelector("img").src;
    cap.textContent = f.querySelector("figcaption")?.textContent || "";
    lb.hidden = false;
  });
  const close = () => { lb.hidden = true; img.src = ""; };
  lb.querySelector(".close").addEventListener("click", close);
  lb.addEventListener("click", (e) => { if (e.target === lb) close(); });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") close(); });
}
