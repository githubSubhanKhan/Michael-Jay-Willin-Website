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

// ===== Animated credential counters =====
const counters = document.querySelectorAll(".credential-num[data-count-to]");
function animateCounter(el) {
  const target = parseInt(el.dataset.countTo, 10);
  const suffix = el.dataset.suffix || "";
  const duration = 1600;
  let start = null;

  function step(timestamp) {
    if (start === null) start = timestamp;
    const progress = Math.min((timestamp - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const value = Math.round(target * eased);
    el.textContent = value + suffix;
    if (progress < 1) {
      requestAnimationFrame(step);
    } else {
      el.textContent = target + suffix;
    }
  }
  requestAnimationFrame(step);
}

if (counters.length) {
  const counterObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );
  counters.forEach((el) => counterObserver.observe(el));
}

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

// ===== Floating Q&A Chatbot =====
(function () {
  const chatbot = document.getElementById("chatbot");
  const toggle = document.getElementById("chatbotToggle");
  const closeBtn = document.getElementById("chatbotClose");
  const messages = document.getElementById("chatbotMessages");
  const suggestions = document.getElementById("chatbotSuggestions");
  const form = document.getElementById("chatbotForm");
  const input = document.getElementById("chatbotInput");

  if (!chatbot || !toggle) return;

  // Knowledge base: each entry has keywords to match and a canned answer,
  // written from the same facts already on this page.
  const knowledgeBase = [
    {
      keywords: ["style", "styles", "design", "type of home", "architectural style"],
      question: "What architectural styles does Michael design?",
      answer:
        "Michael works across 15+ classical and transitional styles, including Shingle Style, Colonial Revival, Georgian, French Renaissance, Jacobean Tudor, and Craftsman. You can browse examples of each in the Portfolio section above.",
    },
    {
      keywords: ["experience", "years", "background", "history", "founded", "since when", "how long"],
      question: "How long has Michael been practicing?",
      answer:
        "Michael Jay Wallin founded his boutique architectural practice in 1992, following four years as a U.S. Army cartographer in Germany and fifteen years at top Long Island design-build firms. He's been designing custom homes for over three decades.",
    },
    {
      keywords: ["award", "wolf of wall street", "gotham", "movie", "tv", "film", "featured", "press", "recognition"],
      question: "Has his work been featured anywhere?",
      answer:
        "Yes — his work received the 2015 Archi Award for outstanding residential design, and his designs have appeared on screen in The Wolf of Wall Street and the TV drama Gotham.",
    },
    {
      keywords: ["location", "where", "based", "area", "serve", "gold coast", "long island", "office", "address"],
      question: "Where is the practice located?",
      answer:
        "The office is at 69 Roslyn Road, Roslyn Heights, NY 11577. Michael serves the Gold Coast, Huntington, and greater Long Island area.",
    },
    {
      keywords: ["contact", "phone", "call", "email", "reach", "get in touch"],
      question: "How can I contact Michael?",
      answer:
        "You can call (631) 827-0594 or email michael@architectwallin.com. You're also welcome to fill out the consultation request form below and the team will follow up.",
    },
    {
      keywords: ["consult", "consultation", "get started", "start a project", "hire", "quote", "estimate", "cost", "budget", "price"],
      question: "How do I start a project?",
      answer:
        "Request a design consultation using the form in the \"Start Your Project\" section — share your style preferences, site photos, or a survey, and the team will follow up to schedule an introductory call with Michael.",
    },
    {
      keywords: ["philosophy", "approach", "belief", "symmetry", "proportion"],
      question: "What is Michael's design philosophy?",
      answer:
        "His practice is grounded in symmetry, proportion, and historical correctness — drawing on classical principles going back to Pythagoras. Every residence is treated as a unique commission balancing modern amenities with traditional architectural values.",
    },
    {
      keywords: ["education", "degree", "license", "credentials", "r.a.", "nyit", "army", "military"],
      question: "What's Michael's professional background?",
      answer:
        "Michael holds a Bachelor's Degree in Architecture from NYIT and is a Registered Architect (R.A.). Before founding his own practice, he served four years in the U.S. Army as a cartographer in Germany and worked fifteen years at leading Long Island design-build firms.",
    },
    {
      keywords: ["portfolio", "projects", "homes", "work", "examples", "gallery"],
      question: "Can I see examples of past projects?",
      answer:
        "Absolutely — scroll to the Portfolio section to filter 28+ completed homes by style, and check the Renderings section for a look at the design process from concept to blueprint.",
    },
    {
      keywords: ["new construction", "renovation", "addition", "remodel"],
      question: "Does he handle renovations, or only new builds?",
      answer:
        "Both — the practice takes on new construction, renovations, and additions. You can specify which applies to you on the consultation form.",
    },
    {
      keywords: ["hello", "hi", "hey", "help", "who are you", "what can you do"],
      question: "What can I ask?",
      answer:
        "Hi! I can answer questions about Michael's architectural styles, experience, background, portfolio, or how to request a consultation. Try one of the suggestions below, or type your own question.",
    },
  ];

  const fallbackAnswer =
    "I don't have a specific answer for that yet, but I'd be glad to connect you with the team — call (631) 827-0594, email michael@architectwallin.com, or fill out the consultation form below.";

  const defaultSuggestions = [
    "What styles does he design?",
    "How do I request a consultation?",
    "Where are you located?",
    "Has his work been featured anywhere?",
  ];

  function scrollToBottom() {
    messages.scrollTop = messages.scrollHeight;
  }

  function addMessage(text, sender) {
    const el = document.createElement("div");
    el.className = `chat-msg ${sender}`;
    el.textContent = text;
    messages.appendChild(el);
    scrollToBottom();
  }

  function renderSuggestions(list) {
    suggestions.innerHTML = "";
    list.forEach((text) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "suggestion-btn";
      btn.textContent = text;
      btn.addEventListener("click", () => handleUserMessage(text));
      suggestions.appendChild(btn);
    });
    scrollToBottom();
  }

  function findAnswer(rawText) {
    const text = rawText.toLowerCase();
    let best = null;
    let bestScore = 0;
    knowledgeBase.forEach((entry) => {
      const score = entry.keywords.reduce(
        (acc, kw) => (text.includes(kw) ? acc + 1 : acc),
        0
      );
      if (score > bestScore) {
        bestScore = score;
        best = entry;
      }
    });
    return best ? best.answer : fallbackAnswer;
  }

  function handleUserMessage(text) {
    const trimmed = text.trim();
    if (!trimmed) return;
    renderSuggestions([]);
    addMessage(trimmed, "user");
    input.value = "";
    const answer = findAnswer(trimmed);
    setTimeout(() => addMessage(answer, "bot"), 350);
  }

  function openChat() {
    chatbot.classList.add("open");
    toggle.setAttribute("aria-expanded", "true");
    if (!messages.childElementCount) {
      addMessage(
        "Hi, I'm here to help answer questions about Michael Jay Wallin Architect. What would you like to know?",
        "bot"
      );
      renderSuggestions(defaultSuggestions);
    }
    setTimeout(() => input.focus(), 200);
  }

  function closeChat() {
    chatbot.classList.remove("open");
    toggle.setAttribute("aria-expanded", "false");
  }

  toggle.addEventListener("click", () => {
    chatbot.classList.contains("open") ? closeChat() : openChat();
  });
  closeBtn.addEventListener("click", closeChat);

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    handleUserMessage(input.value);
  });
})();
