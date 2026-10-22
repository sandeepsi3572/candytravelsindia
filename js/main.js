/**
 * Shared UI: navigation, footer, WhatsApp button, config injection, forms.
 * Depends on js/config.js (window.SITE_CONFIG).
 */
(function () {
  const config = window.SITE_CONFIG || {};

  function telHref() {
    return "tel:+91" + String(config.phone || "").replace(/\D/g, "").slice(-10);
  }

  function waHref(extra) {
    const number = config.whatsapp || "919953949960";
    const text = extra || config.whatsappMessage || "";
    return "https://wa.me/" + number + "?text=" + encodeURIComponent(text);
  }

  function mailHref() {
    return "mailto:" + (config.email || "");
  }

  function mapsHref() {
    return "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(config.mapQuery || config.address || "");
  }

  function mapsEmbed() {
    return "https://maps.google.com/maps?q=" + encodeURIComponent(config.mapQuery || config.address || "") + "&output=embed";
  }

  function applyConfig() {
    document.querySelectorAll("[data-config]").forEach(function (el) {
      const key = el.getAttribute("data-config");
      if (config[key]) el.textContent = config[key];
    });

    document.querySelectorAll("[data-href]").forEach(function (el) {
      const type = el.getAttribute("data-href");
      if (type === "tel") el.setAttribute("href", telHref());
      if (type === "mail") el.setAttribute("href", mailHref());
      if (type === "whatsapp") el.setAttribute("href", waHref());
      if (type === "maps") el.setAttribute("href", mapsHref());
    });

    document.querySelectorAll("[data-map-embed]").forEach(function (el) {
      el.setAttribute("src", mapsEmbed());
    });
  }

  function currentPage() {
    const file = (location.pathname.split("/").pop() || "index.html").toLowerCase();
    return file === "" ? "index.html" : file;
  }

  function navLink(href, label) {
    const active = currentPage() === href ? ' aria-current="page"' : "";
    return '<a href="' + href + '"' + active + ">" + label + "</a>";
  }

  function renderHeader() {
    const host = document.getElementById("site-header");
    if (!host) return;
    const name = config.companyName || "Candy Travels India";
    host.innerHTML =
      '<a class="skip-link" href="#main">Skip to content</a>' +
      '<header class="site-header">' +
      '<div class="header-bar">' +
      '<p class="header-meta"><span class="header-desktop-meta"><span data-config="city"></span> · Own Force Urbania 16-seater · Office: </span><span class="header-address" data-config="address"></span></p>' +
      '<a class="header-phone" data-href="tel">Call <span data-config="phoneDisplay"></span></a>' +
      "</div>" +
      '<div class="nav-wrap">' +
      '<a class="brand" href="index.html">' +
      '<img class="brand-logo" src="images/candy-travels-mark.svg" alt="" aria-hidden="true">' +
      '<span class="brand-copy"><strong>' + name + '</strong><em>Group & family tours</em></span>' +
      "</a>" +
      '<a class="mobile-instagram" href="' + (config.instagram || "https://www.instagram.com/candytravelsindia/") + '" target="_blank" rel="noopener noreferrer" aria-label="Candy Travels India on Instagram"><svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="18" cy="6" r="1.2" fill="currentColor"/></svg></a>' +
      '<button class="nav-toggle" type="button" aria-expanded="false" aria-controls="site-nav">Menu</button>' +
      '<nav id="site-nav" class="site-nav">' +
      navLink("index.html", "Home") +
      navLink("about.html", "Our Fleet") +
      navLink("destinations.html", "Destinations") +
      navLink("services.html", "Services") +
      navLink("contact.html", "Enquire") +
      "</nav>" +
      '<a class="btn btn-gold nav-cta" data-href="whatsapp">WhatsApp</a>' +
      "</div></header>";
  }

  function renderFooter() {
    const host = document.getElementById("site-footer");
    if (!host) return;
    const year = new Date().getFullYear();
    const name = config.companyName || "Candy Travels India";
    host.innerHTML =
      '<footer class="site-footer">' +
      '<div class="footer-grid">' +
      '<div><img class="footer-logo" src="images/candy-travels-mark.svg" alt="" aria-hidden="true"><h2>' + name + '</h2>' +
      '<p>Private journeys led by our own Force Urbania 16-seater, with partner-car options for smaller intercity and outstation trips.</p></div>' +
      '<div><h3>Explore</h3><ul>' +
      '<li><a href="about.html">Force Urbania fleet</a></li>' +
      '<li><a href="destinations.html">Mathura & Vrindavan</a></li>' +
      '<li><a href="destinations.html">Lansdowne, Mussoorie, Shimla, Manali</a></li>' +
      '<li><a href="destinations.html">Agra & Bharatpur</a></li>' +
      '<li><a href="services.html">Booking options</a></li>' +
      "</ul></div>" +
      '<div><h3>Contact</h3><ul>' +
      '<li><a data-href="tel"><span data-config="phoneDisplay"></span></a></li>' +
      '<li><a data-href="mail"><span data-config="email"></span></a></li>' +
      '<li><span data-config="address"></span></li>' +
      "</ul></div>" +
      "</div>" +
      '<p class="footer-copy">&copy; ' + year + " " + name + ". All rights reserved.</p>" +
      "</footer>";
  }

  function renderWhatsApp() {
    if (document.querySelector(".wa-float")) return;
    const a = document.createElement("a");
    a.className = "wa-float";
    a.setAttribute("data-href", "whatsapp");
    a.setAttribute("href", waHref());
    a.setAttribute("target", "_blank");
    a.setAttribute("rel", "noopener noreferrer");
    a.setAttribute("aria-label", "Chat on WhatsApp");
    a.innerHTML =
      '<svg viewBox="0 0 32 32" aria-hidden="true"><path fill="currentColor" d="M19.1 17.4c-.3-.1-1.6-.8-1.8-.9-.2-.1-.4-.1-.6.1-.2.3-.7.9-.8 1-.1.1-.3.2-.6.1-.3-.1-1.2-.4-2.3-1.4-1-.8-1.5-1.8-1.7-2.1-.2-.3 0-.4.1-.6.1-.1.3-.3.4-.4.1-.1.2-.3.3-.4.1-.1.1-.3 0-.4-.1-.1-.6-1.4-.8-1.9-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.4.1-.6.3-.2.3-.8.8-.8 1.9s.8 2.2.9 2.3c.1.2 1.6 2.5 3.8 3.5.5.2.9.4 1.3.5.5.2 1 .1 1.3.1.4-.1 1.6-.7 1.8-1.3.2-.6.2-1.2.1-1.3-.1-.1-.3-.2-.6-.3zM16.1 4C9.8 4 4.7 9.1 4.7 15.4c0 2 .5 4 1.5 5.7L4 28l7.1-2.1c1.6.9 3.5 1.4 5.4 1.4 6.3 0 11.4-5.1 11.4-11.4C27.9 9.1 22.8 4 16.1 4zm0 20.8c-1.7 0-3.4-.5-4.8-1.3l-.3-.2-4.2 1.2 1.2-4.1-.2-.3c-1-1.5-1.5-3.2-1.5-5 0-5.2 4.3-9.5 9.5-9.5s9.5 4.3 9.5 9.5-4.2 9.7-9.2 9.7z"/></svg>' +
      "<span>Chat on WhatsApp</span>";
    document.body.appendChild(a);
  }

  function renderInstagram() {
    const a = document.createElement("a");
    a.className = "instagram-float";
    a.href = config.instagram || "https://www.instagram.com/candytravelsindia/";
    a.target = "_blank";
    a.rel = "noopener noreferrer";
    a.setAttribute("aria-label", "Follow Candy Travels India on Instagram");
    a.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="18" cy="6" r="1.2" fill="currentColor"/></svg><span>Instagram</span>';
    document.body.appendChild(a);
  }

  function bindNav() {
    const toggle = document.querySelector(".nav-toggle");
    const nav = document.getElementById("site-nav");
    if (!toggle || !nav) return;
    toggle.addEventListener("click", function () {
      const open = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", String(open));
    });
  }

  function year() {
    const el = document.getElementById("year");
    if (el) el.textContent = String(new Date().getFullYear());
  }

  function validateForm(form) {
    const errors = [];
    const name = form.querySelector('[name="name"]');
    const phone = form.querySelector('[name="phone"]');
    const email = form.querySelector('[name="email"]');
    const startDate = form.querySelector('[name="travel_start_date"]');
    const endDate = form.querySelector('[name="travel_end_date"]');
    const destination = form.querySelector('[name="destination"]');
    const size = form.querySelector('[name="group_size"]');

    if (!name.value.trim()) errors.push("Please enter your name.");
    const phoneDigits = phone.value.replace(/\D/g, "");
    if (phoneDigits.length !== 10) errors.push("Please enter exactly 10 digits for your phone number.");
    if (!email.value.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())) {
      errors.push("Please enter a valid email address.");
    }
    if (!startDate.value) errors.push("Please choose a travel start date.");
    if (!endDate.value) errors.push("Please choose a travel end date.");
    if (startDate.value && endDate.value && endDate.value <= startDate.value) {
      errors.push("Travel end date must be after the start date.");
    }
    if (!destination.value) errors.push("Please select a destination.");
    if (!size.value || Number(size.value) < 1) errors.push("Please enter group size.");
    return errors;
  }

  function formMessageText(form) {
    const data = new FormData(form);
    return [
      config.whatsappMessage || "Hello Candy Travels India, I would like to enquire about a trip.",
      "",
      "Name: " + data.get("name"),
      "Phone: " + data.get("phone"),
      "Email: " + (data.get("email") || "-"),
      "Travel dates: " + data.get("travel_start_date") + " to " + data.get("travel_end_date"),
      "Destination: " + data.get("destination"),
      "Group size: " + data.get("group_size"),
      "Message: " + (data.get("message") || "-"),
    ].join("\n");
  }

  function bindEnquiryForm() {
    const form = document.getElementById("enquiry-form");
    if (!form) return;
    const status = document.getElementById("form-status");
    const startDate = form.querySelector('[name="travel_start_date"]');
    const endDate = form.querySelector('[name="travel_end_date"]');
    startDate.addEventListener("change", function () {
      endDate.min = startDate.value;
    });
    const destinationField = form.querySelector('[name="destination"]');
    const requestedDestination = new URLSearchParams(window.location.search).get("destination");
    if (requestedDestination && Array.from(destinationField.options).some(function (option) { return option.value === requestedDestination || option.textContent === requestedDestination; })) {
      destinationField.value = requestedDestination;
    }

    form.addEventListener("submit", function (event) {
      event.preventDefault();
      const errors = validateForm(form);
      if (errors.length) {
        status.textContent = errors[0];
        status.className = "form-status is-error";
        return;
      }

      const endpoint = (config.formspreeEndpoint || "").trim();
      const payload = Object.fromEntries(new FormData(form).entries());
      payload._subject = "Trip enquiry — " + (config.companyName || "Candy Travels India");

      function fallback(openWhatsApp) {
        if (openWhatsApp !== false) window.open(waHref(formMessageText(form)), "_blank", "noopener");
        window.location.href =
          mailHref() +
          "?subject=" +
          encodeURIComponent("Trip enquiry") +
          "&body=" +
          encodeURIComponent(formMessageText(form));
        status.textContent = "Opening WhatsApp and email so you can send this enquiry.";
        status.className = "form-status is-ok";
      }

      if (!endpoint) {
        fallback();
        return;
      }

      status.textContent = "Sending your enquiry…";
      status.className = "form-status";
      // Open WhatsApp while the user gesture is active so browsers do not block it
      // after the asynchronous email service response.
      window.open(waHref(formMessageText(form)), "_blank", "noopener,noreferrer");

      fetch(endpoint, {
        method: "POST",
        headers: { Accept: "application/json", "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })
        .then(function (res) {
          if (!res.ok) throw new Error("Form service error");
          status.textContent = "Thank you. We have received your enquiry and will reply shortly.";
          status.className = "form-status is-ok";
          form.reset();
          endDate.min = "";
        })
        .catch(function () {
          fallback(false);
        });
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    renderHeader();
    renderFooter();
    renderWhatsApp();
    renderInstagram();
    applyConfig();
    bindNav();
    bindEnquiryForm();
    year();
  });
})();
