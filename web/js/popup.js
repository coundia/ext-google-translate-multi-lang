document.addEventListener("DOMContentLoaded", () => {

    load();

    // Open options 
    document.getElementById("options-link").addEventListener("click", () => {
        chrome.runtime.openOptionsPage();
    });
}); 
