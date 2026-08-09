/* ============================================================
   Holz- & Elektrobau Schröder — shared interactions
   Vanilla JS, no dependencies. Works without a build step.
   ============================================================ */
(function () {
  "use strict";

  /* ---------- 1. Sticky header: add blur background after scroll ---------- */
  var header = document.querySelector(".site-header");
  function onScroll() {
    if (!header) return;
    header.classList.toggle("scrolled", window.scrollY > 24);
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------- 2. Mobile hamburger menu (fullscreen overlay) ---------- */
  var toggle = document.querySelector(".nav-toggle");
  var body = document.body;

  function closeMenu() { body.classList.remove("nav-open"); if (toggle) toggle.setAttribute("aria-expanded", "false"); }
  function toggleMenu() {
    var open = body.classList.toggle("nav-open");
    if (toggle) toggle.setAttribute("aria-expanded", open ? "true" : "false");
  }
  if (toggle) toggle.addEventListener("click", toggleMenu);

  // Close menu when a link is tapped or Escape pressed
  document.querySelectorAll(".mobile-menu a").forEach(function (a) {
    a.addEventListener("click", closeMenu);
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") closeMenu();
  });
  // Close menu if viewport grows to desktop
  window.matchMedia("(min-width: 900px)").addEventListener("change", function (e) {
    if (e.matches) closeMenu();
  });

  /* ---------- 3. Scroll reveal via IntersectionObserver ---------- */
  var revealEls = document.querySelectorAll(".reveal, .reveal-x");
  if ("IntersectionObserver" in window && revealEls.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("in");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("in"); });
  }

  /* ---------- 4. Tabs (generic: services + gallery share the pattern) ----------
     Markup contract:
       <div class="tabs" role="tablist" data-tabs="GROUP"> <button class="tab" data-tab="KEY" ...>
       Panels: <div class="tab-panel" data-panel="KEY" data-tabs="GROUP">
  --------------------------------------------------------------- */
  document.querySelectorAll('[data-tabs]').forEach(function (tablist) {
    if (!tablist.classList.contains("tabs")) return; // only the button row carries .tabs
    var group = tablist.getAttribute("data-tabs");
    var tabs = tablist.querySelectorAll(".tab");

    tabs.forEach(function (tab) {
      tab.addEventListener("click", function () {
        var key = tab.getAttribute("data-tab");
        // toggle buttons
        tabs.forEach(function (t) { t.setAttribute("aria-selected", t === tab ? "true" : "false"); });
        // toggle panels in the same group
        document.querySelectorAll('.tab-panel[data-tabs="' + group + '"]').forEach(function (panel) {
          panel.classList.toggle("active", panel.getAttribute("data-panel") === key);
        });
      });
    });
  });

  /* ---------- 5. Gallery filter (category chips) ----------
     Chips: <button class="tab" data-filter="all|holzbau|elektro|referenzen">
     Items: <figure class="gitem" data-cat="holzbau">
  --------------------------------------------------------------- */
  var galleryFilter = document.querySelector("[data-gallery-filter]");
  if (galleryFilter) {
    var chips = galleryFilter.querySelectorAll(".tab");
    var items = document.querySelectorAll(".gitem");
    chips.forEach(function (chip) {
      chip.addEventListener("click", function () {
        var f = chip.getAttribute("data-filter");
        chips.forEach(function (c) { c.setAttribute("aria-selected", c === chip ? "true" : "false"); });
        items.forEach(function (item) {
          var show = f === "all" || item.getAttribute("data-cat") === f;
          item.classList.toggle("hide", !show);
        });
      });
    });
  }

  /* ---------- 6. Contact form (preview: client-side success message) ---------- */
  var form = document.querySelector("[data-contact-form]");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!form.checkValidity()) { form.reportValidity(); return; }
      var success = document.querySelector(".form-success");
      if (success) {
        success.classList.add("show");
        success.scrollIntoView({ behavior: "smooth", block: "center" });
      }
      form.reset();
    });
  }

  /* ---------- 7. Footer year ---------- */
  var y = document.querySelector("[data-year]");
  if (y) y.textContent = new Date().getFullYear();
})();
