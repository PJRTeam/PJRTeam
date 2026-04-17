const form = document.getElementById("contact-form");
const formStatus = document.getElementById("form-status");

function buildMailto(data) {
  const subject = encodeURIComponent(
    `Website inquiry from ${data.company || "PJR Team site"}`
  );
  const body = encodeURIComponent(
    [
      `Name: ${data.firstName} ${data.lastName}`,
      `Company: ${data.company}`,
      `Email: ${data.email}`,
      "",
      data.message || "",
    ].join("\n")
  );
  return `mailto:ContactUs@pjrteam.com?subject=${subject}&body=${body}`;
}

if (form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const fd = new FormData(form);
    const data = {
      firstName: (fd.get("firstName") || "").toString().trim(),
      lastName: (fd.get("lastName") || "").toString().trim(),
      company: (fd.get("company") || "").toString().trim(),
      email: (fd.get("email") || "").toString().trim(),
      message: (fd.get("message") || "").toString().trim(),
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

    window.location.href = buildMailto(data);

    if (formStatus) {
      formStatus.textContent =
        "Your email app should open with your message. If nothing opens, email us at ContactUs@pjrteam.com.";
      formStatus.classList.remove("hidden", "text-red-800");
      formStatus.classList.add("text-emerald-800");
    }
  });
}

const yearEl = document.getElementById("year");
if (yearEl) {
  yearEl.textContent = String(new Date().getFullYear());
}
