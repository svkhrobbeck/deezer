

elThemeToggler.addEventListener("click", () => {
  if (elBody.classList.contains("dark-mode")) {
    document.body.classList.remove("dark-mode")
    localStorage.setItem("theme", "light")
  } else {
    document.body.classList.add("dark-mode")
    localStorage.setItem("theme", "dark")
  }
})