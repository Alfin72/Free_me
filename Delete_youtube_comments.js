/**
 * This script automates the process of deleting your own youtube comments.
 *
 * WARNING: This function directly manipulates the DOM and depends on the current HTML
 *  structure of youtube website to work. If youtube implements changes to the
 *  activity page layout, structure, or functionality, this script may break or cause
 *  unexpected behavior. Use at your own risk and always review code before running it.
 *
 * How to use:
 * 1. Navigate to the youtube comments page by going to:
 *    https://www.youtube.com/feed/history/comment_history
 * 2. Open the developer console in your web browser:
 *    - Chrome/Firefox: Press Ctrl+Shift+J (Windows/Linux) or Cmd+Option+J (Mac)
 *    - Safari: Enable the Develop menu in Safari's Advanced preferences, then press Cmd+Option+C
 * 3. Copy and paste this entire script into the console and press Enter to run it.
 */


let sleep = time => new Promise(res => setTimeout(res, time, "done sleeping"));

async function work() {

let buttons = [...document.querySelectorAll("c-wiz .GqCJpe.u2cbPc.LDk2Pd .VfPpkd-Bz112c-LgbsSe.yHy1rc.eT1oJ.mN1ivc")];

console.log("Deleting " + buttons.length + " comments");

for (let b of buttons) {
console.log("Hit");

b.click();

await sleep(2000);

}

console.log("End. Scrolling...")

window.scrollTo(0, document.body.scrollHeight);

}

async function run() {

while (true) {

await work();

await sleep(10000);

}

}

run();
