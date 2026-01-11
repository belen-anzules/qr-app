document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("welcome-modal");
  const title = document.getElementById("modal-title");
  const text = document.getElementById("modal-text");

  document.getElementById("btn-register").addEventListener("click", () => {
    title.textContent = "¡Bienvenido a Macro Fit! 🥗";
    text.textContent = "Regístrate y empieza tu vida saludable.";
    modal.classList.remove("hidden");
  });

  document.getElementById("btn-guest").addEventListener("click", () => {
    title.textContent = "Modo Invitado 👋";
    text.textContent = "Explora nuestros platos saludables sin registrarte.";
    modal.classList.remove("hidden");
  });

  document.getElementById("close-modal").addEventListener("click", () => {
    modal.classList.add("hidden");
  });
});
