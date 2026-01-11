document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("welcome-modal");
  const title = document.getElementById("modal-title");
  const text = document.getElementById("modal-text");

  document.getElementById("btn-register").addEventListener("click", () => {
    title.innerText = "¡Bienvenido a Macro Fit! 🥗";
    text.innerText = "Regístrate y empieza tu vida saludable.";
    modal.classList.remove("hidden");
  });

  document.getElementById("btn-guest").addEventListener("click", () => {
    title.innerText = "Modo Invitado 👋";
    text.innerText = "Explora nuestros platos saludables sin registrarte.";
    modal.classList.remove("hidden");
  });

  document.getElementById("close-modal").addEventListener("click", () => {
    modal.classList.add("hidden");
  });
});
