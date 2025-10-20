# 📚 Getting Started: A Detailed Guide

Welcome to the QA Externship! This guide provides detailed steps for setting up your testing environment.

---

### ✅ Option 1: GitHub Codespaces (Recommended)

This is the fastest and most reliable way to begin. Codespaces creates a pre-configured development environment in the cloud.

1.  **Launch Codespaces:** On the repository's main page, click **`< > Code` -> `Codespaces` -> `Create codespace on main`**.
2.  **Wait for Initialization:** The first launch can take 3-5 minutes. The setup is complete when a VS Code editor appears in your browser. All dependencies are installed for you automatically.
3.  **You are ready!** Open a terminal and [run the tests](#-running-the-tests) to verify your setup.

---

### 💻 Option 2: Local Machine Setup (Mac or PC)

Follow these steps if you prefer to work on your own computer.

#### **Prerequisites**
You must have these tools installed first:
* [Node.js](https://nodejs.org/) (v18 or higher)
* [Python](https://www.python.org/) (v3.9 or higher)
* [Git](https://git-scm.com/downloads/)
* **On Mac:** [Homebrew](https://brew.sh/) for installing packages.

#### **Setup Steps**
1.  **Clone the Repository:**
    ```bash
    git clone [https://github.com/tripleten-externships/qa-percruit.git](https://github.com/tripleten-externships/qa-percruit.git)
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
        (Invoke-WebRequest -Uri [https://install.python-poetry.org](https://install.python-poetry.org) -UseBasicParsing).Content | py -
        ```
    * **Install dependencies:**
        ```bash
        cd api_tests
        poetry install
        cd ..
        ```

---

### ▶️ Running the Tests

To run the sample tests, navigate to the correct directory from the project root.

* **Run all UI tests:**
    ```bash
    cd ui_tests
    npm test
    ```
    *Test reports are generated in `ui_tests/playwright-report/`.*

* **Run all API tests:**
    ```bash
    cd api_tests
    poetry run pytest
    ```