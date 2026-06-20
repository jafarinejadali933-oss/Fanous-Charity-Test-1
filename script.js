const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const themeToggle = document.querySelector(".theme-toggle");
const themeKey = "fanous-theme";

const buildSiteFooter = () => {
  const footer = document.querySelector(".footer");
  if (!footer) return;

  const isPersian = document.documentElement.lang === "fa";
  const content = isPersian
    ? {
        name: "موسسه فانوس جاده فردا",
        summary: "همراه زنان آسیب‌دیده در مسیر حمایت اجتماعی، آموزش و اشتغال.",
        linksTitle: "دسترسی سریع",
        links: [
          ["خانه", "index.html"],
          ["درباره ما", "about.html"],
          ["خدمات", "services.html"],
          ["حمایت شغلی", "employment.html"],
          ["تصاویر", "gallery.html"],
          ["تماس", "contact.html"],
        ],
        legalTitle: "ثبت و مجوز",
        registrationLabel: "شماره ثبت",
        registrationNumber: "۴۰۴۳۷",
        supervision: "تحت نظارت و مجوز سازمان بهزیستی استان تهران",
        addressTitle: "نشانی موسسه",
        address: "استان تهران، شهرستان تهران، بخش مرکزی، شهر تهران، طرشت، خیابان شهید غلامرضا بایندریها، خیابان شهید علی حسینمردی، پلاک ۳۸، مجتمع قوه قضاییه، طبقه ۱، واحد ۱",
        postalCode: "کدپستی: ۱۴۵۹۶۳۴۱۵۱",
        copyright: "© موسسه فانوس جاده فردا",
      }
    : {
        name: "Fanous Jadeh Farda Institute",
        summary: "Supporting women affected by social harm through social support, education, and employment pathways.",
        linksTitle: "Quick Links",
        links: [
          ["Home", "index.html"],
          ["About", "about.html"],
          ["Services", "services.html"],
          ["Employment Support", "employment.html"],
          ["Photos", "gallery.html"],
          ["Contact", "contact.html"],
        ],
        legalTitle: "Registration & License",
        registrationLabel: "Registration No.",
        registrationNumber: "40437",
        supervision: "Licensed by and under the supervision of the Tehran Province Welfare Organization",
        addressTitle: "Institute Address",
        address: "No. 38, Judiciary Complex, 1st Floor, Unit 1, Shahid Ali Hosseinmardi St., Shahid Gholamreza Bayandariha St., Tarasht, Tehran, Tehran Province, Iran",
        postalCode: "Postal code: 1459634151",
        copyright: "© Fanous Jadeh Farda Institute",
      };

  const links = content.links
    .map(([label, href]) => `<a href="${href}">${label}</a>`)
    .join("");

  footer.innerHTML = `
    <div class="footer-main page-shell">
      <section class="footer-identity">
        <p class="footer-kicker">${isPersian ? "فانوس جاده فردا" : "Fanous Jadeh Farda"}</p>
        <h2>${content.name}</h2>
        <p>${content.summary}</p>
      </section>
      <nav class="footer-links" aria-label="${content.linksTitle}">
        <h2>${content.linksTitle}</h2>
        <div>${links}</div>
      </nav>
      <section class="footer-legal">
        <h2>${content.legalTitle}</h2>
        <p class="registration-number"><span>${content.registrationLabel}</span><strong>${content.registrationNumber}</strong></p>
        <p>${content.supervision}</p>
      </section>
      <address class="footer-address">
        <h2>${content.addressTitle}</h2>
        <p>${content.address}</p>
        <strong>${content.postalCode}</strong>
      </address>
    </div>
    <div class="footer-bottom page-shell">
      <p>${content.copyright}</p>
      <p>${content.supervision}</p>
    </div>`;
};

buildSiteFooter();

const readSavedTheme = () => {
  try {
    return window.localStorage?.getItem(themeKey);
  } catch {
    return null;
  }
};

const saveTheme = (theme) => {
  try {
    window.localStorage?.setItem(themeKey, theme);
  } catch {
    // Dark mode still works for the current page when storage is unavailable.
  }
};

const getPreferredTheme = () => {
  const savedTheme = readSavedTheme();
  if (savedTheme === "dark" || savedTheme === "light") return savedTheme;
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
};

const applyTheme = (theme) => {
  const isDark = theme === "dark";
  document.documentElement.dataset.theme = isDark ? "dark" : "light";

  if (themeToggle) {
    const isPersian = document.documentElement.lang === "fa";
    themeToggle.setAttribute("aria-pressed", String(isDark));
    themeToggle.textContent = isDark ? (isPersian ? "روشن" : "Light") : (isPersian ? "تیره" : "Dark");
  }
};

applyTheme(getPreferredTheme());

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    const nextTheme = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
    saveTheme(nextTheme);
    applyTheme(nextTheme);
  });
}

document.documentElement.style.scrollBehavior = prefersReducedMotion ? "auto" : "smooth";

const revealItems = document.querySelectorAll(".reveal");

if (prefersReducedMotion || !("IntersectionObserver" in window)) {
  revealItems.forEach((item) => item.classList.add("is-visible"));
} else {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -40px" }
  );

  revealItems.forEach((item) => observer.observe(item));
}
