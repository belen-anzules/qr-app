function openWelcome(type) {
  const modal = document.getElementById("welcome-modal");
  const title = document.getElementById("modal-title");
  const text = document.getElementById("modal-text");

  if (type === "register") {
    title.innerText = "¡Bienvenido a Macro Fit! 🥗";
    text.innerText = "Regístrate y empieza tu vida saludable.";
  } else {
    title.innerText = "Modo Invitado 👋";
    text.innerText = "Explora nuestros platos saludables sin registrarte.";
  }

  modal.classList.remove("hidden");
}

function closeWelcome() {
  document.getElementById("welcome-modal").classList.add("hidden");
}
