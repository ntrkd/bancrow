console.log("Scraper is running");
setTimeout(() => {
    main();
}, 1000);

function main() {
    showAllCourses();
}

// Needs to be called once we are the results page. Returns an array of objects containing all available data.
function grabCourseDataTable() {
    let table = document.getElementById("table1");
    if (!table) {
        console.log("Unable to find the #table1 element. Skipping data extraction for page.");
        return []
    }

    let tbodyGet = table.getElementsByTagName("tbody");
    let tbody = tbodyGet.item(0);
    if (!tbody) {
        console.log("IllegalState: <tbody> elements inside #table1 was 0.")
        return []
    }

    let ctr = 0;
    tbody.querySelectorAll("tr").forEach(tr => {
        ctr++;
    });
    console.log(ctr);
}

// Expects to be on the search page
function showAllCourses() {
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
            grabCourseDataTable();
        }
    });
    searchLoadObserver.observe(body, {childList: true, subtree: true});
}