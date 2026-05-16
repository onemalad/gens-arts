// gens.arts — small interactions

document.getElementById("yr").textContent = new Date().getFullYear();

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
