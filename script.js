(() => {
  "use strict";

  // Footer year
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Mark the nav link for the section currently in view
  const navLinks = document.querySelectorAll('.site-nav a[href^="#"]');
  const sections = Array.from(navLinks)
    .map((link) => document.querySelector(link.getAttribute("href")))
    .filter(Boolean);

  if ("IntersectionObserver" in window && sections.length) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          navLinks.forEach((link) => link.removeAttribute("aria-current"));
          const active = document.querySelector(
            '.site-nav a[href="#' + entry.target.id + '"]'
          );
          if (active) active.setAttribute("aria-current", "true");
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    sections.forEach((section) => observer.observe(section));
  }

  // Hero name: size it to fill a set share of the width (--title-fill in the CSS),
  // so it stays on one line whichever font loads and on every screen size
  const hero = document.querySelector(".hero");
  const heroTitle = document.getElementById("hero-title");
  if (hero && heroTitle) {
    const fitTitle = () => {
      hero.style.removeProperty("--title-fs");
      const fill = parseFloat(getComputedStyle(hero).getPropertyValue("--title-fill")) || 0.97;
      const range = document.createRange();
      range.selectNodeContents(heroTitle);
      const textWidth = range.getBoundingClientRect().width;
      const avail = heroTitle.clientWidth;
      if (!textWidth || !avail) return;
      const current = parseFloat(getComputedStyle(heroTitle).fontSize);
      const size = Math.min(Math.max((current * avail * fill) / textWidth, 14), 144);
      hero.style.setProperty("--title-fs", size.toFixed(2) + "px");
    };
    let frame = 0;
    const queueFit = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(fitTitle);
    };
    fitTitle();
    window.addEventListener("resize", queueFit);
    if (document.fonts) {
      if (document.fonts.ready) document.fonts.ready.then(queueFit);
      document.fonts.addEventListener("loadingdone", queueFit);
    }
  }

  // Contact form
  const form = document.getElementById("contact-form");
  if (!form) return;

  const status = document.getElementById("form-status");
  const button = form.querySelector('button[type="submit"]');
  const nameField = form.elements["name"];
  const emailField = form.elements["email"];
  const messageField = form.elements["message"];
  const fields = [nameField, emailField, messageField];

  const setStatus = (text, kind) => {
    status.textContent = text;
    status.dataset.kind = kind || "";
  };

  const isEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

  const listFormat = (items) =>
    typeof Intl !== "undefined" && Intl.ListFormat
      ? new Intl.ListFormat("en", { style: "long", type: "conjunction" }).format(items)
      : items.join(", ");

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    // Bots fill the hidden field; pretend it worked and do nothing
    if (form.elements["_gotcha"] && form.elements["_gotcha"].value) return;

    fields.forEach((field) => field.removeAttribute("aria-invalid"));

    const name = nameField.value.trim();
    const email = emailField.value.trim();
    const message = messageField.value.trim();

    const problems = [];
    if (!name) problems.push([nameField, "your name"]);
    if (!isEmail(email)) problems.push([emailField, "a valid email address"]);
    if (!message) problems.push([messageField, "a message"]);

    if (problems.length) {
      problems.forEach(([field]) => field.setAttribute("aria-invalid", "true"));
      setStatus(
        "Please add " + listFormat(problems.map(([, label]) => label)) + ".",
        "error"
      );
      problems[0][0].focus();
      return;
    }

    // No Formspree ID yet: open the visitor's email app instead
    if (form.action.indexOf("YOUR_FORM_ID") !== -1) {
      const to = form.dataset.fallbackEmail;
      const subject = encodeURIComponent("Message from " + name + " via AJR Dev Log");
      const body = encodeURIComponent(message + "\n\nFrom: " + name + " (" + email + ")");
      setStatus("Opening your email app with your message ready to send.", "success");
      window.location.href = "mailto:" + to + "?subject=" + subject + "&body=" + body;
      return;
    }

    button.disabled = true;
    setStatus("Sending your message...", "");

    try {
      const response = await fetch(form.action, {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" },
      });
      if (!response.ok) throw new Error("Request failed with status " + response.status);
      form.reset();
      setStatus("Message sent. I'll reply by email.", "success");
    } catch (error) {
      setStatus("Your message didn't send. Try again, or email me directly.", "error");
    } finally {
      button.disabled = false;
    }
  });
})();
