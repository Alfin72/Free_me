```markdown
# Facebook Mass Comment Deleter 🗑️ (Free_me Toolkit)

Automate the removal of your digital footprint on Facebook. This script uses Playwright to bulk-delete comments directly from your Facebook Activity Log. 

By hooking into an active, human-driven Chrome session, this tool successfully bypasses Facebook's aggressive anti-bot detection (which usually blocks automated scripts with a blank white screen or 2FA loops).

---

## ⚠️ Disclaimer & Rate Limits
* **Use Responsibly:** This script interacts with the live Facebook DOM. Facebook frequently changes their layout, which may occasionally break the script.
* **Rate Limits:** Facebook allows roughly ~500-1000 deletions per day. If the script keeps clicking "Remove" but the comments don't disappear, **Facebook has temporarily rate-limited your account**. Stop the script and try again in 24 hours.

## 🛠️ Prerequisites
1. **Python 3.8+** installed on your system.
2. **Google Chrome** installed.
3. Windows Operating System (commands below are for Windows PowerShell).

## 🚀 Installation

1. **Clone or Download** this repository to your local machine.
2. **Open PowerShell** and navigate to the folder containing the script.
3. **Install Playwright:**
   ```powershell
   pip install playwright
   ```
*(Note: You do not need to run `playwright install` because this script uses your existing Google Chrome browser).*

---

## ⚙️ How to Use (Step-by-Step)

Because Facebook blocks standard automated browsers, you must launch Chrome in **Debug Mode** first, then attach the script to it.

### Step 1: Kill Background Chrome Processes
Playwright cannot connect if Chrome is running silently in the background. Close all Chrome windows, then run this command in PowerShell:
```powershell
taskkill /F /IM chrome.exe /T
```

### Step 2: Launch Chrome in Debug Mode
Run this exact command in PowerShell to open a fresh, isolated Chrome window with the debugging port open:
```powershell
Start-Process "chrome.exe" -ArgumentList "--remote-debugging-port=9222", "--user-data-dir=C:\ChromeDebugProfile"
```

### Step 3: Log in & Prepare Facebook
1. In the new Chrome window that just opened, go to [Facebook](https://www.facebook.com) and log in.
2. Navigate directly to your **Activity Log -> Comments**. You can usually find it at this URL:
   `https://www.facebook.com/me/allactivity/?category_key=COMMENTSCLUSTER`
3. Make sure you can see your list of comments with the checkboxes next to them.

### Step 4: Run the Script
Open a **new tab** or split your PowerShell window, navigate to where the script is located, and run it:
```powershell
python delete_facebook_comments.py
```

### Step 5: Press Enter
The terminal will pause and say: `Waiting for you to press Enter...`
Once your Facebook Activity log is fully loaded on the screen, go back to the terminal and press **Enter**. The script will take over and begin batch-deleting!

---

## 🐛 Troubleshooting

| Issue | Solution |
| :--- | :--- |
| **"Failed to connect / Connection refused"** | You missed Step 1. Chrome was still running in the background. Run the `taskkill` command and try the launch sequence again. |
| **Strict Mode Violation / "resolved to 2 elements"** | Facebook left hidden "ghost" popups on the screen. The script is designed to handle this by filtering for the active modal, but if it happens, just restart the script. |
| **Script scrolls but doesn't select anything** | Ensure your Facebook language is set to **English (US)**. The script specifically looks for the English words "All" and "Remove". |
| **Checkboxes aren't appearing on Facebook** | Refresh the Facebook page or resize the browser window. Sometimes Facebook loads a different layout if the window is too narrow. |

## 👨‍💻 How it Works (For Nerds)
This script utilizes `playwright.chromium.connect_over_cdp("http://127.0.0.1:9222")` to attach to an active browser session. It targets the "Select All" checkbox to process up to 25 comments at a time, searches the DOM for specific text nodes (like `get_by_text("Remove")`), and carefully navigates the nested `div` structures of Facebook's confirmation modals using strict text-filtering to avoid element ambiguity.
```
