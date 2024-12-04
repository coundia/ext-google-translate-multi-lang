// Wait for the page to fully load
  
window.addEventListener("load", () => {
  // Create a container for custom buttons
  const buttonContainer = document.createElement("div");
  buttonContainer.style.position = "fixed";
  buttonContainer.style.top = "10px";
  buttonContainer.style.right = "10px";
  buttonContainer.style.zIndex = "9999";
  buttonContainer.style.padding = "10px";
  buttonContainer.style.backgroundColor = "#f8f9fa";
  buttonContainer.style.border = "1px solid #ccc";
  buttonContainer.style.borderRadius = "5px";
  buttonContainer.style.boxShadow = "0 2px 5px rgba(0,0,0,0.2)";

  const TEXT_SOURCE_FR = "Texte source";

  chrome.storage.sync.get({ languages: [], lastLanguage: 'na' }, (data) => {
    let lastLanguage = data.lastLanguage;
    let languages = data.languages;

    // Create a button for each language
    languages.forEach(({ label, value }) => {
      const button = document.createElement("button");
      button.innerText = `Translate to ${value}`;
      button.style.margin = "5px";
      button.style.padding = "10px";
      button.style.border = "none";
      button.style.borderRadius = "3px";
      button.style.cursor = "pointer";
      button.style.backgroundColor = "#007bff";
      button.style.color = "white";
      button.style.transition = "background-color 0.3s";

      if (lastLanguage == label) {
        button.style.backgroundColor = "#0056b3";
      }

      // Add click event to update the translation URL
      button.addEventListener("click", async () => {
        //last click lang
        chrome.storage.sync.set({ lastLanguage: label }, () => { });
        // Locate the textarea using its class
        const input = document.querySelector(`textarea[aria-label="${TEXT_SOURCE_FR}"]`);
        if (input) {
          const text = input.value.trim();
          if (!text) {
            alert("Please enter text to translate.");
            return;
          }

          // Construct the Google Translate URL
          const newUrl = `https://translate.google.com/?sl=en&tl=${label}&text=${encodeURIComponent(text)}&op=translate`;
          window.location.href = newUrl;
        } else {
          alert("Could not find the input field. Please reload the page.");
        }
      });

      button.addEventListener("mouseleave", () => {
        //copyClipBoard();
      });

      buttonContainer.appendChild(button);
    });

    // Add a refresh button
    const refresh = document.createElement("button");
    refresh.innerText = `Refresh`;
    refresh.style.margin = "5px";
    refresh.style.padding = "10px";
    refresh.style.border = "none";
    refresh.style.borderRadius = "3px";
    refresh.style.cursor = "pointer";
    refresh.style.backgroundColor = "#007b00";
    refresh.style.color = "white";
    refresh.style.transition = "background-color 0.3s";

    refresh.addEventListener("click", () => {
      document.location.reload();
    });

    buttonContainer.appendChild(refresh);

    // Append the button container to the body
    document.body.appendChild(buttonContainer);
  });

  // Locate the "Copy translation" button

  function copyClipBoard() {
    const copyButton = document.querySelector(
      'button[aria-label="Copier la traduction"]'
    );

    if (copyButton) {
      copyButton.click();
    }
  }


});

document.on
