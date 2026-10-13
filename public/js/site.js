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
          formStatus.classList.remove("hidden", "text-brand-ink");
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
          formStatus.classList.remove("hidden", "text-brand-ink");
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
            formStatus.classList.add("text-brand-ink");
          }
        })
        .catch(function () {
          if (formStatus) {
            formStatus.textContent =
              "Something went wrong. Please email ContactUs@pjrteam.com directly.";
            formStatus.classList.remove("hidden", "text-brand-ink");
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

  var censusForm = document.getElementById("census-form");
  var censusStatus = document.getElementById("census-form-status");
  var censusBtn = censusForm ? censusForm.querySelector('button[type="submit"]') : null;
  var emailOk = function (value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  };

  if (censusForm) {
    censusForm.addEventListener("submit", function (e) {
      e.preventDefault();
      var fd = new FormData(censusForm);
      if (String(fd.get("website") || "").trim()) {
        if (censusStatus) {
          censusStatus.textContent =
            "Got it. We're pulling your facility's data now and will reach out within one business day to book your 20-minute walkthrough.";
          censusStatus.classList.remove("hidden", "text-red-800");
          censusStatus.classList.add("text-brand-ink");
        }
        censusForm.reset();
        return;
      }

      var name = String(fd.get("name") || "").trim();
      var role = String(fd.get("role") || "").trim();
      var facility = String(fd.get("facilityName") || "").trim();
      var state = String(fd.get("state") || "").trim();
      var email = String(fd.get("email") || "").trim();

      if (!name || !role || !facility || !state || !email) {
        if (censusStatus) {
          censusStatus.textContent =
            "Please complete your name, role, facility name, state, and email.";
          censusStatus.classList.remove("hidden", "text-brand-ink");
          censusStatus.classList.add("text-red-800");
        }
        var firstMissing = !name
          ? "census-name"
          : !role
            ? "census-role"
            : !facility
              ? "census-facility"
              : !state
                ? "census-state"
                : "census-email";
        var missingEl = document.getElementById(firstMissing);
        if (missingEl) missingEl.focus();
        return;
      }

      if (!emailOk(email)) {
        if (censusStatus) {
          censusStatus.textContent =
            "Please enter a valid email address (e.g., you@organization.com).";
          censusStatus.classList.remove("hidden", "text-brand-ink");
          censusStatus.classList.add("text-red-800");
        }
        var emailEl = document.getElementById("census-email");
        if (emailEl) emailEl.focus();
        return;
      }

      var endpoint =
        censusForm.getAttribute("data-formspree-endpoint") ||
        censusForm.getAttribute("action") ||
        "";

      if (!endpoint || endpoint.indexOf("xpjrteam") !== -1) {
        if (censusStatus) {
          censusStatus.textContent =
            "Form is not configured yet. Email us at ContactUs@pjrteam.com and we'll respond within one business day.";
          censusStatus.classList.remove("hidden", "text-brand-ink");
          censusStatus.classList.add("text-red-800");
        }
        return;
      }

      fd.set("_subject", "Census check request from " + facility);
      fd.set("_replyto", email);

      if (censusBtn) {
        censusBtn.disabled = true;
        censusBtn.textContent = "Sending…";
      }

      fetch(endpoint, {
        method: "POST",
        body: fd,
        headers: { Accept: "application/json" },
      })
        .then(function (res) {
          if (!res.ok) throw new Error("submit failed");
          censusForm.reset();
          if (censusStatus) {
            censusStatus.textContent =
              "Got it. We're pulling your facility's data now and will reach out within one business day to book your 20-minute walkthrough.";
            censusStatus.classList.remove("hidden", "text-red-800");
            censusStatus.classList.add("text-brand-ink");
          }
          if (typeof window.gtag === "function") {
            window.gtag("event", "census_check_submit");
          }
        })
        .catch(function () {
          if (censusStatus) {
            censusStatus.textContent =
              "Something went wrong. Please email ContactUs@pjrteam.com directly.";
            censusStatus.classList.remove("hidden", "text-brand-ink");
            censusStatus.classList.add("text-red-800");
          }
        })
        .finally(function () {
          if (censusBtn) {
            censusBtn.disabled = false;
            censusBtn.textContent = "Get my free census check";
          }
        });
    });
  }
})();
