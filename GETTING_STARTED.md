# 📚 Getting Started: A Detailed Guide

Welcome to the QA Externship! This guide provides detailed steps for setting up your testing environment.

---

### ✅ Option 1: GitHub Codespaces (Recommended)

This is the fastest and most reliable way to begin. Codespaces creates a pre-configured development environment in the cloud.

1.  **Launch Codespaces:** On the repository's main page, click **`< > Code` -> `Codespaces` -> `Create codespace on main`**.
2.  **Wait for Initialization:** The first launch can take 3-5 minutes. The setup is complete when a VS Code editor appears in your browser.
3.  **Setup Secrets:**
    * Open the terminal (`Ctrl` + `~`).
    * Navigate to the UI tests folder: `cd ui_tests`.
    * Copy the environment template: `cp .env.template .env`.
    * Open the new `.env` file and fill in your credentials.
4.  **You are ready!** Run `npm test` to verify your setup.

---

### 💻 Option 2: Local Machine Setup (Mac or PC)

Follow these steps if you prefer to work on your own computer.

#### **Prerequisites**
* [Git](https://git-scm.com/downloads/)
* [Python](https://www.python.org/) (v3.9 or higher)
* **[Volta](https://volta.sh/)** (The Hassle-Free Node Manager)
    * **Mac/Linux:** `curl https://get.volta.sh | bash`
    * **Windows:** [Download and run the Windows Installer](https://github.com/volta-cli/volta/releases/download/v2.0.1/volta-2.0.1-windows-x86_64.msi)

> **Why Volta?** Once you install Volta, it will automatically detect that this project needs Node v20 and switch to it for you instantly.

#### **Setup Steps**
1.  **Clone the Repository:**
    ```bash
    git clone https://github.com/tripleten-externships/qa-percruit.git
    cd qa-percruit
    ```

2.  **Set up UI Tests (Node.js):**
    ```bash
    cd ui_tests
    npm install
    npx playwright install --with-deps
    cd ..
    ```

3.  **Set up API Tests (Python):**
    * **On Mac:**
        ```bash
        brew install poetry
        ```
    * **On Windows (in PowerShell):**
        ```powershell
        (Invoke-WebRequest -Uri https://install.python-poetry.org -UseBasicParsing).Content | py -
        ```
    * **Install dependencies:**
        ```bash
        cd api_tests
        poetry install
        cd ..
        ```

---

### ▶️ Running the Tests

To run the tests, navigate to the correct directory from the project root.

* **Run UI tests:** `cd ui_tests` then `npm test`
* **Run API tests:** `cd api_tests` then `poetry run pytest`
