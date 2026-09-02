(function () {
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  var toggle = document.querySelector("[data-nav-toggle]");
  var panel = document.getElementById("mobile-panel");
  if (toggle && panel) {
    var setOpen = function (open) {
      toggle.setAttribute("aria-expanded", String(open));
      toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
      panel.classList.toggle("is-open", open);
      panel.hidden = !open;
    };
    toggle.addEventListener("click", function () {
      setOpen(toggle.getAttribute("aria-expanded") !== "true");
    });
    panel.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        setOpen(false);
      });
    });
  }

  var clientsLogos = document.getElementById("clients-logos");
  var clientsTrack = clientsLogos
    ? clientsLogos.closest(".clients-marquee-track")
    : null;
  if (clientsLogos && clientsTrack && !clientsTrack.querySelector("[data-clients-clone]")) {
    var clientsClone = clientsLogos.cloneNode(true);
    clientsClone.setAttribute("aria-hidden", "true");
    clientsClone.setAttribute("data-clients-clone", "true");
    clientsClone.removeAttribute("id");
    clientsClone.querySelectorAll("img").forEach(function (img) {
      img.alt = "";
    });
    clientsTrack.appendChild(clientsClone);
  }

  var form = document.getElementById("contact-form");
  var formStatus = document.getElementById("form-status");
  var submitBtn = form ? form.querySelector('button[type="submit"]') : null;

  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var fd = new FormData(form);
      var data = {
        firstName: String(fd.get("firstName") || "").trim(),
        lastName: String(fd.get("lastName") || "").trim(),
        company: String(fd.get("company") || "").trim(),
        email: String(fd.get("email") || "").trim(),
        message: String(fd.get("message") || "").trim(),
      };

      if (!data.firstName || !data.company || !data.email) {
        if (formStatus) {
          formStatus.textContent =
            "Please complete first name, company, and email so we can respond.";
          formStatus.classList.remove("hidden", "text-emerald-800");
          formStatus.classList.add("text-red-800");
        }
        return;
      }

      var endpoint =
        form.getAttribute("data-formspree-endpoint") ||
        form.getAttribute("action") ||
        "";

      if (!endpoint || endpoint.indexOf("xpjrteam") !== -1) {
        if (formStatus) {
          formStatus.textContent =
            "Form is not configured yet. Email us at ContactUs@pjrteam.com and we'll respond within one business day.";
          formStatus.classList.remove("hidden", "text-emerald-800");
          formStatus.classList.add("text-red-800");
        }
        return;
      }

      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = "Sending…";
      }

      fetch(endpoint, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName: data.firstName,
          lastName: data.lastName,
          company: data.company,
          email: data.email,
          message: data.message,
          _subject: "Website inquiry from " + data.company,
          _replyto: data.email,
        }),
      })
        .then(function (res) {
          if (!res.ok) throw new Error("submit failed");
          form.reset();
          if (formStatus) {
            formStatus.textContent =
              "Thank you — we received your message and will reply within one business day.";
            formStatus.classList.remove("hidden", "text-red-800");
            formStatus.classList.add("text-emerald-800");
          }
        })
        .catch(function () {
          if (formStatus) {
            formStatus.textContent =
              "Something went wrong. Please email ContactUs@pjrteam.com directly.";
            formStatus.classList.remove("hidden", "text-emerald-800");
            formStatus.classList.add("text-red-800");
          }
        })
        .finally(function () {
          if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.textContent = "Submit";
          }
        });
    });
  }
})();
