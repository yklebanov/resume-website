// Copies the contact email to the clipboard and shows brief feedback on
// the button, then reverts to the original label.
const contactBtn = document.getElementById("contact-btn");

if (contactBtn) {
  const originalLabel = contactBtn.textContent;
  const email = contactBtn.dataset.email;

  contactBtn.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(email);
      contactBtn.textContent = "Copied!";
    } catch (err) {
      contactBtn.textContent = "Copy failed";
    } finally {
      setTimeout(() => {
        contactBtn.textContent = originalLabel;
      }, 1500);
    }
  });
}
