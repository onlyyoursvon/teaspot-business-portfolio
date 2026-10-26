"use strict";

const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

function closeNavigation() {
  if (!menuToggle || !navLinks) return;
  navLinks.classList.remove("is-open");
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.setAttribute("aria-label", "Open navigation menu");
}

if (menuToggle && navLinks) {
  menuToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("is-open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute("aria-label", isOpen ? "Close navigation menu" : "Open navigation menu");
  });

  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeNavigation);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeNavigation();
      menuToggle.focus();
    }
  });

  window.addEventListener("resize", () => {
    if (window.matchMedia("(min-width: 721px)").matches) closeNavigation();
  });
}

// Mark the current page in the shared navigation.
const currentPage = document.body.dataset.page;
if (currentPage) {
  document.querySelectorAll("[data-page-link]").forEach((link) => {
    if (link.dataset.pageLink === currentPage) {
      link.setAttribute("aria-current", "page");
    }
  });
}

// Keep the footer year current without requiring manual updates.
const year = document.querySelector("#currentYear");
if (year) year.textContent = String(new Date().getFullYear());

// Demo form: validate locally, but never imply that a message was delivered.
const contactForm = document.querySelector("#contactForm");
const formStatus = document.querySelector("#formStatus");
if (contactForm && formStatus) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!contactForm.checkValidity()) {
      contactForm.reportValidity();
      formStatus.textContent = "Please check the required fields and enter a valid email address.";
      formStatus.className = "form-status is-error";
      return;
    }

    formStatus.textContent = "Your fields look valid, but this demo does not send or store messages. Connect a form service before using this form with customers.";
    formStatus.className = "form-status is-success";
  });
}
