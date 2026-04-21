import { ParserErrorHandler } from "./ParserErrorHandler";
import { isMeetingDay } from "./types/courseData";
import type { CourseRow, Instructor, Meeting, MeetingDays } from "./types/courseData";
import { finder } from '@medv/finder';

setTimeout(() => {
    main();
}, 1000);

async function main() {
    const pe = new ParserErrorHandler();

    await showAllCourses(); // Wait for the new page to load
    const data = grabCourseDataTable(pe);

    pe.flush();
}

/**
 * Expects to be called on the results page.
 * @returns an array of objects containing the extracted data
 */
function grabCourseDataTable() {
    let table = document.getElementById("table1");
    if (!table) {
        pe.newError({
            errorType: "MissingElement",
            message: "Unable to find the table1 element in the <body>. Skipping page",
            received: "null",
            expected: "element of ID table1",
            elementPath: finder(document.body),
            html: `Full document scanned (Size: ${document.body.getHTML.length})`,
            stackTrace: getStackTrace(), 
        });
        return []
    }

    let tbodyGet = table.getElementsByTagName("tbody");
    let tbody = tbodyGet.item(0);
    if (!tbody) {
        pe.newError({
            errorType: "UnexpectedState",
            message: "<tbody> elements inside the #table1 element should always be > 0",
            received: "null",
            expected: "<tbody> element",
            elementPath: finder(table),
            html: table.getHTML(),
            stackTrace: getStackTrace(), 
        })
        return []
    }

    let ctr = 0;
    tbody.querySelectorAll("tr").forEach(tr => {
        ctr++;
    });

    return ctr;
}

/**
 * Helper method to await pause until the results page loads.
 * @returns a promise that is only accepted once the results element is made visible.
 */
async function waitForResultPage(): Promise<void> {
    return new Promise<void>((resolve) => {
        // Select the body element which exists on the search and result page as the DOM element to observe
        const body = document.querySelector(".body-content.ui-layout-center");
        if (body === null) {
            throw new Error("Failed to get the body element: .body-content.ui-layout-center");
        }

        let searchLoadObserver = new MutationObserver((changes: MutationRecord[], observer: MutationObserver) => {
            let element = document.querySelector<HTMLElement>(".results-title")
            if (element && element.offsetParent != null) {
                observer.disconnect();
                resolve();
            }
        });

        searchLoadObserver.observe(body, {childList: true, subtree: true});
    });
}

/**
 * Helper function to click the search button then wait for results page. Only returns once the results page has loaded.
 */
async function showAllCourses() {
    // Find the search button
    const searchBtn = document.getElementById("search-go");
    if (searchBtn) {
        searchBtn.click();
    } else {
        console.warn("Unable to find the id=\"search-go\" element. Are you on the search page?");
    }

    // Wait for the results page elements to load
    await waitForResultPage();
}

/**
 * Helper script to get the total number of pages. Should be called on the results page.
 * @returns the total number of pages else -1
 */
function getTotalPages(): number {
    const span = document.querySelector<HTMLElement>(".paging-text.total-pages");
    if (!span) {
        console.warn("Unable to find the total page number element. Are we on the results page?");
        return -1;
    }

    let totalPages = Number.parseInt(span.innerText);
    return totalPages;
}

/**
 * Helper method to find the pagination input field and extract the vaue of it. Should be called on the results page.
 * @returns the page number else -1
 */
function getCurrentPage(): number {
    const input = document.querySelector<HTMLInputElement>('.page-number.enabled');
    if (!input) {
        console.log("Unable to find the pagination input field");
        return -1;
    }

    return Number.parseInt(input.value);
}

function getStackTrace(): string {
    const stackError = new Error("error made with the purpose to retreive the stack trace")
    return stackError.stack ?? "";
}