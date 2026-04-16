console.log("Scraper is running");
setTimeout(() => {
    showAllSearches();
}, 1000);

// Expects to be on the search page
function showAllSearches() {
    // Find the search button
    const searchBtn = document.getElementById("search-go");
    if (searchBtn) {
        searchBtn.click();
    } else {
        console.warn("Unable to find the id=\"search-go\" element. Are you on the search page?");
    }

    // Select the body element which exists on the search and result page as the DOM element to observe
    const body = document.querySelector(".body-content.ui-layout-center");
    if (body === null) {
        throw new Error("Failed to get the body element: .body-content.ui-layout-center");
    }

    let searchLoadObserver = new MutationObserver((changes: MutationRecord[], observer: MutationObserver) => {
        let element = document.querySelector<HTMLElement>(".results-title")
        if (element && element.offsetParent != null) {
            observer.disconnect();
            console.log("Loaded!");
        }
    });
    searchLoadObserver.observe(body, {childList: true, subtree: true});
}