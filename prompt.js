async function rap() {
  console.log("started rap generation");
  const prompt = document.getElementById("prompt").value; // Changed to 'password'

  localStorage.setItem("prompt", prompt);
  window.location.href = "loading.html";
}

window.onload = function () {
  localStorage.removeItem("prompt");
  localStorage.removeItem("generatedText");
  localStorage.removeItem("cleanGeneratedText");
};
