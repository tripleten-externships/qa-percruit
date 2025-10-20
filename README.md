# QA Externship Test Automation Template

![QA Automation Banner](https://i.imgur.com/your-banner-image.png) [![Run QA Tests](https://github.com/tripleten-externships/qa-percruit/actions/workflows/ci.yml/badge.svg)](https://github.com/tripleten-externships/qa-percruit/actions/workflows/ci.yml)

Welcome! This repository is a turnkey template for QA externs to start writing UI and API tests without complex setup. The goal is simple: you should be able to start writing and running tests within minutes.

---

## ✨ Quickstart: The Easy Way (GitHub Codespaces)

This is the fastest and most reliable way to get started.

1.  **Open in Codespaces:** Click the green **`< > Code`** button, go to the **Codespaces** tab, and click **"Create codespace on main"**.
2.  **Wait for Setup:** The container will build automatically. This might take a few minutes the first time.
3.  **Run the Tests!** Once the VS Code editor loads, open a new terminal (`Ctrl` + `~`) and run the sample tests to confirm everything works:
    * **To run UI tests:**
        ```bash
        cd ui_tests
        npm test
        ```
    * **To run API tests:**
        ```bash
        cd api_tests
        poetry run pytest
        ```

---

## 🚀 What's Inside?

This repository contains two complete testing lanes:

* **UI Testing (`/ui_tests`)**
    * **Framework:** Playwright & Cucumber.js
    * **Language:** TypeScript
* **API Testing (`/api_tests`)**
    * **Framework:** Pytest & Requests
    * **Language:** Python

It also includes:
* **GitHub Actions** for automated CI testing.
* A **Devcontainer** for a one-click Codespaces setup.
* **Pre-configured issue labels** for professional project management.

---

## 📚 Detailed Setup & Guides

For more detailed instructions, including how to set up your **local Mac or PC environment**, please see our comprehensive guides:

* **[GETTING_STARTED.md](./GETTING_STARTED.md)**: The full setup manual.
* **[TROUBLESHOOTING.md](./TROUBLESHOOTING.md)**: Solutions to common problems.
* **[PULL_REQUEST_TEMPLATE.md](./.github/PULL_REQUEST_TEMPLATE.md)**: Best practices for submitting your work.