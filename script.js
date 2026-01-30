const btn = document.getElementById("darkModeBtn");
 
btn.addEventListener("click", () => {

  document.body.classList.toggle("light");
 
  if (document.body.classList.contains("light")) {

    document.body.style.background = "white";

    document.body.style.color = "black";

    btn.textContent = "☀️";

  } else {

    document.body.style.background = "#0a0a0a";

    document.body.style.color = "white";

    btn.textContent = "🌙";

  }

});

 
