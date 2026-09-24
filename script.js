document.getElementById("year").textContent = new Date().getFullYear();

if (window.lucide) window.lucide.createIcons();

const viewer = document.getElementById("image-viewer");
const viewerImage = document.getElementById("viewer-image");
const caption = document.getElementById("image-caption");
let imageTrigger;

document.querySelectorAll("[data-lightbox]").forEach((link) => {
  link.addEventListener("click", (event) => {
    if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
    if (typeof viewer.showModal !== "function") return;
    event.preventDefault();
    imageTrigger = link;
    const image = link.querySelector("img");
    viewerImage.src = link.href;
    viewerImage.alt = image.alt;
    caption.textContent = link.closest("figure").querySelector("figcaption").textContent;
    viewer.showModal();
    document.body.classList.add("viewer-open");
  });
});

viewer.querySelector("button").addEventListener("click", () => viewer.close());
viewer.addEventListener("click", (event) => {
  const bounds = viewer.getBoundingClientRect();
  if (event.target === viewer && (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom)) viewer.close();
});
viewer.addEventListener("close", () => {
  document.body.classList.remove("viewer-open");
  imageTrigger?.focus({ preventScroll: true });
});

// Case studies belong to Projects when determining the active navigation link.
const sections = Array.from(document.querySelectorAll("#projects, #research, #experience, #background, #contact"));
const navigation = Array.from(document.querySelectorAll(".nav a"));
let framePending = false;
function updateNavigation() {
  let active;
  sections.forEach((section) => {
    if (section.getBoundingClientRect().top <= 180) active = section.id;
  });
  if (window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 2) active = "contact";
  navigation.forEach((link) => {
    if (link.hash === "#" + active) link.setAttribute("aria-current", "location");
    else link.removeAttribute("aria-current");
  });
  framePending = false;
}
window.addEventListener("scroll", () => {
  if (!framePending) {
    framePending = true;
    requestAnimationFrame(updateNavigation);
  }
}, { passive: true });
updateNavigation();
