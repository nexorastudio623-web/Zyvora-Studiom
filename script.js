document.addEventListener("DOMContentLoaded", () => {
  /* ===============================
   MENÚ RESPONSIVE
================================ */

const menuToggle = document.querySelector(".menu-toggle");
const navMenu = document.querySelector(".nav-links");

if (menuToggle && navMenu) {
    menuToggle.addEventListener("click", () => {
        menuToggle.classList.toggle("active");
        navMenu.classList.toggle("active");

        const menuAbierto = navMenu.classList.contains("active");

        menuToggle.setAttribute(
            "aria-expanded",
            menuAbierto ? "true" : "false"
        );
    });

    const navLinks = navMenu.querySelectorAll("a");

    navLinks.forEach((link) => {
        link.addEventListener("click", () => {
            menuToggle.classList.remove("active");
            navMenu.classList.remove("active");
            menuToggle.setAttribute("aria-expanded", "false");
        });
    });
}

    /* ===============================
       FAQ ACORDEÓN
    ================================ */

    const faqItems = document.querySelectorAll(".faq-item");

    faqItems.forEach((item) => {
        const question = item.querySelector(".faq-question");
        const answer = item.querySelector(".faq-answer");

        if (!question || !answer) return;

        question.addEventListener("click", () => {
            const estaAbierto = item.classList.contains("active");

            faqItems.forEach((otherItem) => {
                otherItem.classList.remove("active");

                const otherAnswer =
                    otherItem.querySelector(".faq-answer");

                if (otherAnswer) {
                    otherAnswer.style.maxHeight = null;
                }
            });

            if (!estaAbierto) {
                item.classList.add("active");
                answer.style.maxHeight = `${answer.scrollHeight}px`;
            }
        });
    });

    /* ===============================
       SCROLL SUAVE
    ================================ */

    const enlacesInternos =
        document.querySelectorAll('a[href^="#"]');

    enlacesInternos.forEach((enlace) => {
        enlace.addEventListener("click", (event) => {
            const destinoId = enlace.getAttribute("href");

            if (!destinoId || destinoId === "#") return;

            const destino = document.querySelector(destinoId);

            if (!destino) return;

            event.preventDefault();

            const alturaHeader =
                document.querySelector("header")?.offsetHeight || 0;

            const posicion =
                destino.getBoundingClientRect().top +
                window.scrollY -
                alturaHeader;

            window.scrollTo({
                top: posicion,
                behavior: "smooth"
            });
        });
    });

    /* ===============================
       HEADER AL HACER SCROLL
    ================================ */

    const header = document.querySelector("header");

    const actualizarHeader = () => {
        if (!header) return;

        if (window.scrollY > 40) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }
    };

    actualizarHeader();

    window.addEventListener("scroll", actualizarHeader);

    /* ===============================
       ANIMACIONES AL APARECER
    ================================ */

    const elementosAnimados =
        document.querySelectorAll(
            ".service-card, .project-card, .stat-card, .process-card, .benefit-card, .faq-item"
        );

    if ("IntersectionObserver" in window) {
        const observer = new IntersectionObserver(
            (entries, observerInstance) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("visible");
                        observerInstance.unobserve(entry.target);
                    }
                });
            },
            {
                threshold: 0.15
            }
        );

        elementosAnimados.forEach((elemento) => {
            elemento.classList.add("reveal");
            observer.observe(elemento);
        });
    } else {
        elementosAnimados.forEach((elemento) => {
            elemento.classList.add("visible");
        });
    }

    /* ===============================
       AÑO AUTOMÁTICO DEL FOOTER
    ================================ */

    const yearElement = document.querySelector("#current-year");

    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
});