// =====================================================================
// Real photography, loaded from local files in images/ (see images/README.md
// or run download_images.sh / download_images.py once to populate that folder).
// These are AI-generated concept photos standing in for Michael's own project
// photography — swap the files in images/ for his real project photos any time,
// keeping the same filenames, and the page updates automatically.
// =====================================================================

// ===== Data: sample projects (representative of the 28+ style-grouped portfolio) =====
const projects = [
  { title: "Stonebridge Manor", style: "shingle", styleLabel: "Shingle Style", loc: "Cold Spring Harbor, NY", img: "images/hero.jpg" },
  { title: "The Rosewood Residence", style: "colonial", styleLabel: "Colonial Revival", loc: "Huntington, NY", img: "images/colonial.jpg" },
  { title: "Whitestone Georgian", style: "georgian", styleLabel: "Georgian", loc: "Lloyd Harbor, NY", img: "images/georgian.jpg" },
  { title: "Maison Fontaine", style: "french", styleLabel: "French Renaissance", loc: "Old Westbury, NY", img: "images/french.jpg" },
  { title: "Ashford Hall", style: "tudor", styleLabel: "Jacobean Tudor", loc: "Locust Valley, NY", img: "images/tudor.jpg" },
  { title: "Craftsman on the Sound", style: "craftsman", styleLabel: "Craftsman", loc: "Centerport, NY", img: "images/craftsman.jpg" },
  { title: "Seabreeze Shingle Estate", style: "shingle", styleLabel: "Shingle Style", loc: "Bayville, NY", img: "images/hero.jpg" },
  { title: "Heritage Colonial", style: "colonial", styleLabel: "Colonial Revival", loc: "Northport, NY", img: "images/colonial.jpg" },
  { title: "Kensington Georgian", style: "georgian", styleLabel: "Georgian", loc: "Muttontown, NY", img: "images/georgian.jpg" },
];

const grid = document.getElementById("projectGrid");
if (grid) {
  grid.innerHTML = projects
    .map(
      (p) => `
      <div class="project-card" data-style="${p.style}">
        <img class="project-thumb" src="${p.img}" alt="${p.title} — ${p.styleLabel} residence in ${p.loc}" loading="lazy" onerror="this.closest('.project-card').classList.add('img-missing')">
        <div class="project-info">
          <span class="p-style">${p.styleLabel}</span>
          <h3>${p.title}</h3>
          <span class="p-loc">${p.loc}</span>
        </div>
      </div>`
    )
    .join("");
}

// ===== Renderings grid =====
const renderingStyles = [
  { label: "Georgian", img: "images/georgian.jpg" },
  { label: "Beaux-Arts", img: "images/georgian.jpg" },
  { label: "Craftsman", img: "images/craftsman.jpg" },
  { label: "Colonial Revival", img: "images/colonial.jpg" },
  { label: "Shingle Style", img: "images/hero.jpg" },
  { label: "Jacobean Tudor", img: "images/tudor.jpg" },
  { label: "Chateauesque", img: "images/french.jpg" },
  { label: "Dutch Colonial", img: "images/colonial.jpg" },
];

const renderingGrid = document.getElementById("renderingGrid");
if (renderingGrid) {
  renderingGrid.innerHTML = renderingStyles
    .map(
      (r) => `
      <div class="rendering-card">
        <img src="${r.img}" alt="${r.label} style reference" loading="lazy" onerror="this.closest('.rendering-card').classList.add('img-missing')">
        <div class="overlay"><span>${r.label}</span></div>
      </div>`
    )
    .join("");
}

// ===== Filter bar =====
const filterButtons = document.querySelectorAll(".filter-btn");
const cards = () => document.querySelectorAll(".project-card");

filterButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    filterButtons.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    const filter = btn.dataset.filter;
    cards().forEach((card) => {
      const match = filter === "all" || card.dataset.style === filter;
      card.classList.toggle("hidden", !match);
    });
  });
});

// ===== Sticky top bar on scroll =====
const topbar = document.getElementById("topbar");
const onScroll = () => {
  if (window.scrollY > 40) {
    topbar.classList.add("scrolled");
  } else {
    topbar.classList.remove("scrolled");
  }
};
window.addEventListener("scroll", onScroll);
onScroll();

// ===== Mobile nav toggle =====
const navToggle = document.getElementById("navToggle");
const mainNav = document.getElementById("mainNav");
navToggle.addEventListener("click", () => {
  mainNav.classList.toggle("open");
});
mainNav.querySelectorAll("a").forEach((link) =>
  link.addEventListener("click", () => mainNav.classList.remove("open"))
);

// ===== Upload zone (drag & drop UX only — no backend in this concept) =====
const uploadZone = document.getElementById("uploadZone");
const uploadInput = document.getElementById("upload");
const uploadText = document.getElementById("uploadText");

uploadZone.addEventListener("click", () => uploadInput.click());

["dragenter", "dragover"].forEach((evt) =>
  uploadZone.addEventListener(evt, (e) => {
    e.preventDefault();
    uploadZone.classList.add("dragover");
  })
);
["dragleave", "drop"].forEach((evt) =>
  uploadZone.addEventListener(evt, (e) => {
    e.preventDefault();
    uploadZone.classList.remove("dragover");
  })
);
uploadZone.addEventListener("drop", (e) => {
  const files = e.dataTransfer.files;
  if (files.length) {
    uploadInput.files = files;
    updateUploadText(files);
  }
});
uploadInput.addEventListener("change", () => updateUploadText(uploadInput.files));

function updateUploadText(files) {
  uploadText.textContent =
    files.length === 1 ? files[0].name : `${files.length} files selected`;
}

// ===== Consultation form (demo submit handler — wire to backend/API in production) =====
const consultForm = document.getElementById("consultForm");
const formNote = document.getElementById("formNote");
consultForm.addEventListener("submit", (e) => {
  e.preventDefault();
  formNote.textContent =
    "Thank you — your request has been received. We'll be in touch shortly to schedule your consultation.";
  consultForm.reset();
  uploadText.textContent = "Drag & drop files, or click to browse";
});

// ===== Footer year =====
document.getElementById("year").textContent = new Date().getFullYear();
