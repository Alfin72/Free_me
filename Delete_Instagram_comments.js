/**
 * This script automates the process of deleting your own Instagram comments.
 * It deletes comments in batches to avoid hitting rate limits or breaking the page.
 *
 * WARNING: This function directly manipulates the DOM and depends on the current HTML
 *  structure of Instagram's website to work. If Instagram implements changes to the
 *  activity page layout, structure, or functionality, this script may break or cause
 *  unexpected behavior. Use at your own risk and always review code before running it.
 *
 * How to use:
 * 1. Navigate to the Instagram comments page by going to:
 *    https://www.instagram.com/your_activity/interactions/comments
 * 2. Open the developer console in your web browser:
 *    - Chrome/Firefox: Press Ctrl+Shift+J (Windows/Linux) or Cmd+Option+J (Mac)
 *    - Safari: Enable the Develop menu in Safari's Advanced preferences, then press Cmd+Option+C
 * 3. Copy and paste this entire script into the console and press Enter to run it.
 *
 * How to navigate to the comments page on instagram.com:
 * 1. Log in to Instagram on a desktop browser.
 * 2. Go to your profile by clicking on the profile icon at the bottom right.
 * 3. Click on "Your Activity" in the menu.
 * 4. Select "Interactions" and then "Comments".
 * 5. Follow the usage steps above to run this script.
 */
; (async function () {
    // Constants
    /** @const {number} - The number of comments to delete in each batch. */
    const DELETION_BATCH_SIZE = 3;
    /** @const {number} - The delay between actions in milliseconds. */
    const DELAY_BETWEEN_ACTIONS_MS = 1000;
    /** @const {number} - The delay between clicking the checkboxes in milliseconds. */
    const DELAY_BETWEEN_CHECKBOX_CLICKS_MS = 300;
    /** @const {number} - The maximum number of retries for waiting operations */
    const MAX_RETRIES = 60;

    /** @const {string} - The XPath selector for the "Delete" button at the bottom */
    const XPATH_DELETE_BUTTON = "//span[normalize-space(text())='Delete']/ancestor::div[@role='button'] | //span[normalize-space(text())='Delete']/../../..";
    /** @const {string} - The XPath selector for the "Delete" button in the confirm dialog */
    const XPATH_CONFIRM_DELETE_BUTTON = "//button[.//text()[normalize-space()='Delete']]";

    /** Utility function that delays execution */
    const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

    /** Utility function that waits for an element to appear in the DOM */
    const waitForElementByXpath = async (xpath, timeout = 30000) => {
        const startTime = Date.now();
        while (Date.now() - startTime < timeout) {
            const element = document.evaluate(xpath, document, null, XPathResult.ANY_TYPE, null)?.iterateNext();
            if (element) return element;
            await delay(100);
        }
        // FIXED: Changed 'selector' to 'xpath' to prevent ReferenceError crash
        throw new Error(`Element with xpath "${xpath}" not found within ${timeout}ms`);
    };

    /** Utility function that clicks on a given element. */
    const clickElement = async (element) => {
        if (!element) throw new Error('Element not found');
        element.click();
    };

    /** Helper to find the "Select" button using text content */
    const findSelectButton = () => {
        const allSpans = Array.from(document.querySelectorAll('span'));
        return allSpans.find(span => span.textContent.trim() === 'Select')?.parentElement;
    };

    /** Waits for the "Select" button to reappear after the page loads more comments */
    const waitForSelectButton = async () => {
        for (let i = 0; i < MAX_RETRIES; i++) {
            console.log("Waiting for 'Select' button to reappear...");
            // FIXED: Standardized to use the same logic as the initial click
            const selectBtn = findSelectButton();
            if (selectBtn) return;
            await delay(1000);
        }
        throw new Error('Select button not found after maximum retries');
    };

    /** Deletes the currently selected comments. */
    const deleteSelectedComments = async () => {
        try {
            console.log("Finding main delete button...");
            const deleteButton = await waitForElementByXpath(XPATH_DELETE_BUTTON, 5000);
            await clickElement(deleteButton);
            await delay(DELAY_BETWEEN_ACTIONS_MS);
            
            console.log("Finding confirm delete button...");
            const confirmButton = await waitForElementByXpath(XPATH_CONFIRM_DELETE_BUTTON, 5000);
            await clickElement(confirmButton);
        } catch (error) {
            console.error('Error during comment deletion:', error.message);
            throw error; // Re-throw to restart the loop safely
        }
    };

    /** Deletes all user comments by selecting comments in batches. */
    const deleteActivity = async () => {
        try {
            while (true) {
                const selectButton = findSelectButton();
                if (!selectButton) {
                    console.log('Select button not found. Assuming no more comments or page structure changed.');
                    break;
                }

                await clickElement(selectButton);
                await delay(DELAY_BETWEEN_ACTIONS_MS);

                const checkboxes = document.querySelectorAll('[aria-label="Toggle checkbox"], input[type="checkbox"]');
                if (checkboxes.length === 0) {
                    console.log('No more comments to delete.');
                    break;
                }

                const limit = Math.min(DELETION_BATCH_SIZE, checkboxes.length);
                console.log(`Selecting ${limit} comments...`);
                
                for (let i = 0; i < limit; i++) {
                    await clickElement(checkboxes[i]);
                    await delay(DELAY_BETWEEN_CHECKBOX_CLICKS_MS);
                }

                await delay(DELAY_BETWEEN_ACTIONS_MS);
                await deleteSelectedComments();
                await delay(DELAY_BETWEEN_ACTIONS_MS);
                await waitForSelectButton();
                await delay(DELAY_BETWEEN_ACTIONS_MS);
            }
        } catch (error) {
            console.error('Error in deleteActivity loop:', error.message);
        }
    };

    // Start the deletion process
    try {
        console.log('Starting comment deletion script...');
        await deleteActivity();
        console.log('Activity deletion completed or stopped.');
    } catch (error) {
        console.error('Fatal error:', error.message);
    }
})();
