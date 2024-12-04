// Append language to the list
function apendItem(language) {
    const languagesId = document.getElementById("languagesId");
    const li = document.createElement("li");
    li.textContent = `${language.label} - ${language.value}`;

    const removeBtn = document.createElement("span");
    removeBtn.textContent = "Remove";
    removeBtn.classList.add("remove-btn");
    removeBtn.addEventListener("click", () => removeItem(language));

    li.appendChild(removeBtn);
    languagesId.appendChild(li);
  
}

// Handle removing an language
function removeItem(itemToRemove) {

    const languagesId = document.getElementById("languagesId");

    if (confirm("Do you confirm ?")) {
        chrome.storage.sync.get("languages", (data) => {
            const languages = data.languages.filter((language) => language.value !== itemToRemove.value);

            chrome.storage.sync.set({ languages: languages }, () => {
                languagesId.innerHTML = "";
                languages.forEach((language) => apendItem(language));
                document.location.reload();
                alert("Engine removed successfully!");
            });
        });
    }

}

// Handle adding a new language
document.getElementById("formId").addEventListener("submit", (e) => {
    e.preventDefault();

    const labelId = document.getElementById("labelId");
    const valueId = document.getElementById("valueId");

    const label = labelId.value.trim();
    const uri = valueId.value.trim();

    if (label && uri) {
        const newEngine = { label, value: uri };

        chrome.storage.sync.get("languages", (data) => {
            const languages = data.languages || [];
            languages.push(newEngine);

            chrome.storage.sync.set({ languages: languages }, () => {
                apendItem(newEngine);
                labelId.value = "";
                valueId.value = "";
                alert("Engine added successfully!"); 
            });
        });
    }
});

//reset 
document.getElementById("options-reset").addEventListener("click", (e) => {

    if (confirm("Reset default languages.")) {
        chrome.storage.sync.set({ languages: DEFAULT_LANGUAGES }, () => {
            alert("Default languages have been reset.");
            document.location.reload();
        });
    }

});

// Load existing languages
function load() {
    chrome.storage.sync.get("languages", (data) => {
        const languages = data.languages || [];
        languages.forEach((language) => apendItem(language));
    });

}