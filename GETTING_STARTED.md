# Getting Started: A Detailed Guide

Welcome to the QA Externship! This guide provides detailed steps for setting up your testing environment, both with GitHub Codespaces (recommended) and on your local machine.

## Table of Contents

1.  [Technology Stack](#-technology-stack)
2.  [Option 1: GitHub Codespaces Setup (Recommended)](#-option-1-github-codespaces-setup-recommended)
3.  [Option 2: Local Machine Setup](#-option-2-local-machine-setup)
4.  [Running Tests](#-running-tests)
5.  [Directory Structure Explained](#-directory-structure-explained)
6.  [Working with GitHub Issues](#-working-with-github-issues)

---

### 🚀 Technology Stack

This repository contains two separate "lanes" for testing:

* **UI Testing:**
    * **Framework:** [Playwright](https://playwright.dev/)
    * **Language:** [TypeScript](https://www.typescriptlang.org/)
    * **BDD/Gherkin:** [Cucumber.js](https://cucumber.io/)
    * **Location:** `/ui_tests` directory

* **API Testing:**
    * **Framework:** [pytest](https://docs.pytest.org/)
    * **Language:** [Python](https://www.python.org/)
    * **Dependency Management:** [Poetry](https://python-poetry.org/)
    * **Location:** `/api_tests` directory

---

### 💻 Option 1: GitHub Codespaces Setup (Recommended)

GitHub Codespaces creates a development environment in the cloud, pre-configured with everything you need. This is the fastest and most reliable way to get started.

1.  **Create a repo from this template:** Click the "Use this template" button on the main repository page.
2.  **Launch Codespaces:** On your new repository's page, click `<> Code` -> `Codespaces` -> `Create codespace on main`.
3.  **Wait for initialization:** The first time you do this, it will build the developer container. This can take 3-5 minutes. The process is finished when a VS Code editor appears in your browser and the terminal prompt is available. The setup script will automatically install all Node.js and Python dependencies and the Playwright browsers.

You are now ready to [run the tests](#-running-tests)!

---

### 🛠️ Option 2: Local Machine Setup

If you prefer to work locally, you'll need to install the required tools.

**Prerequisites:**

* [Node.js](https://nodejs.org/) (version 18.x or higher)
* [Python](https://www.python.org/downloads/) (version 3.9 or higher)
* [Poetry](https://python-poetry.org/docs/#installation) for Python dependency management.
* [Git](https://git-scm.com/downloads/)

**Setup Steps:**

1.  **Clone the repository:**
    ```bash
    git clone <your-repository-url>
    cd <your-repository-name>
    ```

2.  **Set up UI Tests:**
    ```bash
    cd ui_tests
    npm install
    npx playwright install --with-deps
    cd ..
    ```

3.  **Set up API Tests:**
    ```bash
    cd api_tests
    poetry install
    cd ..
    ```

You are now ready to run the tests locally.

---

### ✅ Running Tests

To run tests, open a terminal and navigate to the correct directory.

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

---

### 📂 Directory Structure Explained

* `.devcontainer/`: Configuration for GitHub Codespaces. It automates your setup.
* `.github/`: Contains GitHub-specific files, like Actions workflows (`/workflows`) and predefined issue labels (`labels.yml`).
* `api_tests/`: All Python API tests and their dependencies live here.
    * `pyproject.toml`: Defines the Python project and its dependencies (managed by Poetry).
    * `tests/`: Where your pytest test files go.
* `ui_tests/`: All Playwright/Cucumber UI tests and their dependencies live here.
    * `package.json`: Defines the Node.js project and its dependencies.
    * `features/`: Contains human-readable `.feature` files written in Gherkin.
    * `features/step_definitions/`: Contains the TypeScript code that implements the steps from the `.feature` files.
* `README.md`: The quickstart guide you're reading now.

---

### 🏷️ Working with GitHub Issues

This project comes with pre-configured labels to help you learn how to triage issues like a professional QA engineer. When you create a new issue, you can assign labels like:

* `bug`: For confirmed defects.
* `priority: high`: For critical issues that need immediate attention.
* `status: in-progress`: To show that you are actively working on the issue.
* `blocked`: If you cannot proceed without help or another task being completed.

Familiarize yourself with the available labels and use them to communicate the status and priority of your work.
