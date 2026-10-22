/**
 * Home page image slider
 * ------------------------------------------------
 * HOW TO ADD A NEW SLIDE
 * 1. Put the image file in the /images folder (jpg, png, or webp).
 * 2. Open images.json and add a new object inside "slides":
 *      { "src": "images/your-file.jpg", "alt": "Short description", "kicker": "Label", "caption": "Headline" }
 * 3. Refresh the page. The slider reads images.json automatically.
 *
 * Static HTML cannot list a folder by itself, so images.json is the
 * build-free source of truth for which files appear in the carousel.
 */
(function () {
  const INTERVAL_MS = 2000;

  function createSlider(root, slides) {
    if (!slides.length) {
      root.innerHTML = "<p class='slider-empty'>Add images in images.json to start the carousel.</p>";
      return;
    }

    root.innerHTML =
      '<div class="slider-track"></div>' +
      '<button class="slider-arrow prev" type="button" aria-label="Previous slide">‹</button>' +
      '<button class="slider-arrow next" type="button" aria-label="Next slide">›</button>' +
      '<div class="slider-dots" role="tablist" aria-label="Slide navigation"></div>';

    const track = root.querySelector(".slider-track");
    const dots = root.querySelector(".slider-dots");

    slides.forEach(function (slide, index) {
      const item = document.createElement("article");
      item.className = "slide" + (index === 0 ? " is-active" : "");
      item.setAttribute("aria-hidden", index === 0 ? "false" : "true");
      item.innerHTML =
        '<img src="' + slide.src + '" alt="' + (slide.alt || "") + '">' +
        '<div class="slide-copy">' +
        (slide.kicker ? "<p class='eyebrow'>" + slide.kicker + "</p>" : "") +
        "<h2>" + (slide.caption || "") + "</h2>" +
        "</div>";
      if (slide.credit && slide.credit.url) {
        const credit = document.createElement("p");
        credit.className = "slide-credit";
        const sourceLink = document.createElement("a");
        sourceLink.href = slide.credit.url;
        sourceLink.target = "_blank";
        sourceLink.rel = "noopener noreferrer";
        sourceLink.textContent = slide.credit.text;
        credit.appendChild(sourceLink);
        if (slide.credit.license && slide.credit.licenseUrl) {
          credit.appendChild(document.createTextNode(" · "));
          const licenseLink = document.createElement("a");
          licenseLink.href = slide.credit.licenseUrl;
          licenseLink.target = "_blank";
          licenseLink.rel = "noopener noreferrer";
          licenseLink.textContent = slide.credit.license;
          credit.appendChild(licenseLink);
        }
        item.appendChild(credit);
      }
      track.appendChild(item);

      const dot = document.createElement("button");
      dot.type = "button";
      dot.className = "slider-dot" + (index === 0 ? " is-active" : "");
      dot.setAttribute("aria-label", "Go to slide " + (index + 1));
      dots.appendChild(dot);
    });

    let index = 0;
    let timer = null;
    const items = Array.from(root.querySelectorAll(".slide"));
    const dotButtons = Array.from(root.querySelectorAll(".slider-dot"));

    function go(next) {
      items[index].classList.remove("is-active");
      items[index].setAttribute("aria-hidden", "true");
      dotButtons[index].classList.remove("is-active");
      index = (next + items.length) % items.length;
      items[index].classList.add("is-active");
      items[index].setAttribute("aria-hidden", "false");
      dotButtons[index].classList.add("is-active");
    }

    function start() {
      stop();
      timer = setInterval(function () {
        go(index + 1);
      }, INTERVAL_MS);
    }

    function stop() {
      if (timer) clearInterval(timer);
      timer = null;
    }

    root.querySelector(".next").addEventListener("click", function () {
      go(index + 1);
      start();
    });
    root.querySelector(".prev").addEventListener("click", function () {
      go(index - 1);
      start();
    });
    dotButtons.forEach(function (dot, i) {
      dot.addEventListener("click", function () {
        go(i);
        start();
      });
    });

    root.addEventListener("mouseenter", stop);
    root.addEventListener("mouseleave", start);
    root.addEventListener("focusin", stop);
    root.addEventListener("focusout", function (event) {
      if (!root.contains(event.relatedTarget)) start();
    });

    start();
  }

  document.addEventListener("DOMContentLoaded", function () {
    const root = document.getElementById("home-slider");
    if (!root) return;

    fetch("images.json")
      .then(function (res) {
        if (!res.ok) throw new Error("Could not load images.json");
        return res.json();
      })
      .then(function (data) {
        createSlider(root, data.slides || []);
      })
      .catch(function () {
        /* Fallback list if images.json cannot be fetched (file:// protocol). */
        createSlider(root, [
          { src: "images/mussoorie.jpg", alt: "Mussoorie hills", kicker: "Hill station", caption: "Mussoorie mountain air" },
          { src: "images/Mathura_ghats.jpg", alt: "Mathura ghats", kicker: "Temple & river", caption: "Mathura’s riverside temples" },
          { src: "images/shimla.jpg", alt: "Shimla hills", kicker: "Hill station", caption: "A refreshing Shimla escape" },
          { src: "images/vrindavan.jpg", alt: "Prem Mandir in Vrindavan", kicker: "Sacred Braj", caption: "Vrindavan’s temple lanes", credit: { text: "Photo: Shubhamanand2580 / Wikimedia Commons", url: "https://commons.wikimedia.org/wiki/File:Prem_mandir,_Vrindavan.jpg", license: "CC BY-SA 4.0", licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/" } },
          { src: "images/manali.jpg", alt: "Manali mountains", kicker: "Himalayan holiday", caption: "Manali with your whole group" },
          { src: "images/Mathura_Vrindavan.jpg", alt: "Mathura and Vrindavan pilgrimage", kicker: "Family pilgrimage", caption: "Mathura & Vrindavan together" },
          { src: "images/Nainital.jpg", alt: "Nainital lake and hills", kicker: "Kumaon hills", caption: "Nainital lake views" },
          { src: "images/Golu_Devta_Temple.jpg", alt: "Golu Devta Temple", kicker: "Temple journey", caption: "Golu Devta Temple" },
          { src: "images/Lansdowne.jpg", alt: "Lansdowne mountain scenery", kicker: "Garhwal hills", caption: "A peaceful escape to Lansdowne" },
          { src: "images/Kainchi_Dham.jpg", alt: "Kainchi Dham Mandir", kicker: "Spiritual getaway", caption: "Kainchi Dham Mandir" },
          { src: "images/Rishikesh.jpg", alt: "Rishikesh by the Ganges", kicker: "Foothills & river", caption: "Rishikesh by the Ganges" },
          { src: "images/Khatu_Shyam.jpg", alt: "Khatu Shyam temple", kicker: "Pilgrimage", caption: "A journey to Khatu Shyam" },
          { src: "images/hero-mountains.jpg", alt: "Colorful mountain scenery", kicker: "Hill country", caption: "Find your own mountain moment" },
          { src: "images/Haridwar.jpg", alt: "Haridwar ghats", kicker: "Ganga darshan", caption: "Haridwar’s sacred ghats" },
          { src: "images/hero-hills.jpg", alt: "Himalayan hills", kicker: "Mountain escapes", caption: "Take the scenic road together" },
          { src: "images/Agra_Bharatpur.jpg", alt: "Agra and Bharatpur in one combined travel image", kicker: "Heritage & nature route", caption: "Agra & Bharatpur Bird Sanctuary", credit: { text: "Photos: Yann Forget and DC10DD / Wikimedia Commons", url: "https://commons.wikimedia.org/wiki/File:Taj_Mahal,_Agra,_India_edit2.jpg", license: "CC BY-SA 4.0", licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/" } }
        ]);
      });
  });
})();
