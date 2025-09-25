# QA Externship Test Automation Template

Welcome! This repository is a turnkey template for QA externs to start writing UI and API tests without complex setup.

The goal is simple: you should be able to start writing and running tests within minutes.

## ✨ Quickstart (Codespaces) 
 
This is the recommended way to get started.

1.  **Create a new repository from this template.**
    * Click the green "Use this template" button at the top of this page. 
    * Create a new repository under your own GitHub account.
2.  **Open in GitHub Codespaces.**
    * Navigate to your newly created repository.
    * Click the green "<> Code" button.
    * Go to the "Codespaces" tab and click "Create codespace on main".
    * Wait for the container to build (it may take a few minutes the first time).
3.  **Run the Tests!**
    * The dev container automatically installs everything you need.
    * Open a new terminal in VS Code (`Ctrl` + `~`).
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

That's it! You're ready to start exploring the code and writing your own tests.

## 📚 Learn More

For detailed instructions, including local setup (if you don't want to use Codespaces), check out our full guide:

➡️ **[GETTING_STARTED.md](./GETTING_STARTED.md)**
 
