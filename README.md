# Free_me 🕊️

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Contributions Welcome](https://img.shields.io/badge/contributions-welcome-brightgreen.svg?style=flat)](https://github.com/Alfin72/Free_me/issues)

**Free_me** is a collection of libraries and automation scripts designed to help you reclaim your digital privacy. This toolkit allows you to systematically remove your online footprints, including comments, posts, and interactions across major social media platforms.

---

## ⭐ Show Your Support

If you find this repository helpful in taking back your digital privacy, please consider giving it a **star**! 

Tracking the number of stars helps us see how many people find this toolkit useful, boosts the project's visibility, and motivates us to keep maintaining and adding support for new platforms and features.


## ⚠️ Disclaimer & Warning
These scripts directly manipulate the Document Object Model (DOM) and depend entirely on the current HTML structures of the respective websites. If Instagram or YouTube implements changes to their activity page layouts, element structures, or overall functionalities, these scripts may break or cause unexpected behavior. 

**Use at your own risk and always review the code before running it** .

---

## 🚀 Features

*   **Automated Instagram Comment Deletion:** Automatically removes your own Instagram comments directly from the interactions activity page . The script is designed to process deletions in small batches to help avoid hitting rate limits or breaking the page .
*   **Automated YouTube Comment Deletion:** Automatically clicks through and deletes your YouTube comments directly from your YouTube comment history feed .
*   **Zero Installation Required:** The scripts are written in pure JavaScript and are designed to be executed directly within your web browser's developer console . You do not need to install any external software or browser extensions.
*   **Multi-Platform Footprint Removal:** The repository aims to be a comprehensive 

## Available Scripts

### 1. Delete Instagram Comments (`Delete_Instagram_comments.js`)
This script automates the process of deleting your own Instagram comments . It processes the deletions in batches to avoid hitting rate limits or breaking the page .

**How to use:**
1. Log in to Instagram on a desktop browser . 
2. Navigate to your comments activity page. You can do this by going to your profile > "Your Activity" > "Interactions" > "Comments", or by navigating directly to: `https://www.instagram.com/your_activity/interactions/comments`.
3. Open your browser's developer console :
   - **Chrome/Firefox:** Press `Ctrl+Shift+J` (Windows/Linux) or `Cmd+Option+J` (Mac) .
   - **Safari:** Enable the Develop menu in Advanced preferences, then press `Cmd+Option+C` .
4. Copy the entire contents of `Delete_Instagram_comments.js`, paste it into the console, and press `Enter` to run it .

### 2. Delete YouTube Comments (`Delete_youtube_comments.js`)
This script automates the process of deleting your own YouTube comments [4].

**How to use:**
1. Navigate directly to the YouTube comments history page: `https://www.youtube.com/feed/history/comment_history` .
2. Open your browser's developer console using the same keyboard shortcuts mentioned above [4].
3. Copy the entire contents of `Delete_youtube_comments.js`, paste it into the console, and press `Enter` to execute .

🤝 Contributing
Contributions make the open-source community an amazing place to learn, inspire, and create. Any contributions you make are greatly appreciated.

Fork the Project

Create your Feature Branch (git checkout -b feature/AmazingFeature)

Commit your Changes (git commit -m 'Add some AmazingFeature')

Push to the Branch (git push origin feature/AmazingFeature)

Open a Pull Request
---
📝 License
This repository is licensed under the **Apache-2.0 License** .

💬 Contact
Project Link: https://github.com/Alfin72/Free_me
linkedin : www.linkedin.com/in/alfin72
