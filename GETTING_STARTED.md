# 📚 Getting Started: A Detailed Guide

Welcome to the QA Externship! This guide provides detailed steps for setting up your testing environment on **GitHub Codespaces** (recommended) or your **local machine** (Mac or Windows).

---

## Table of Contents
- [Option 1: GitHub Codespaces (Recommended)](#-option-1-github-codespaces-recommended)
- [Option 2: Local Machine Setup (Mac or PC)](#-option-2-local-machine-setup-mac-or-pc)
- [Environment Variables](#-environment-variables)
- [Running the Tests](#%EF%B8%8F-running-the-tests)
- [Next Steps](#-next-steps)

---

## ✅ Option 1: GitHub Codespaces (Recommended)

This is the **fastest and most reliable** way to begin. Codespaces creates a pre-configured development environment in the cloud—no local installation required!

### **Why Codespaces?**
- ✅ Everything pre-installed (Node.js, Python, Playwright, Poetry)
- ✅ Consistent environment across all users
- ✅ No "it works on my machine" issues
- ✅ Free for GitHub users (60 hours/month)
- ✅ Access from any computer with a browser

### **Steps:**

1.  **Launch Codespaces:**
    - Go to the repository's main page on GitHub
    - Click the green **`< > Code`** button
    - Select the **`Codespaces`** tab
    - Click **`Create codespace on main`**

2.  **Wait for Initialization:**
    - The first launch takes **3-5 minutes**
    - You'll see a progress log showing:
      - Node.js 20 installation
      - Python 3.11 installation
      - Poetry setup via pipx
      - `npm ci` installing UI test dependencies
      - `npx playwright install --with-deps` downloading browsers
      - `poetry install` setting up API test dependencies
    - Setup is complete when the VS Code editor appears in your browser

3.  **Configure Credentials:**
    Once the terminal is ready, create your `.env` file:
    ```bash
    cp .env.example .env
    ```

    Edit the `.env` file (click on it in the file explorer) and fill in your test credentials:
    ```bash
    STUDENT_EMAIL=your-email@example.com
    STUDENT_PASSWORD=your-password
    MENTOR_EMAIL=mentor-email@example.com
    MENTOR_PASSWORD=mentor-password
    ADMIN_EMAIL=admin-email@example.com
    ADMIN_PASSWORD=admin-password
    BASE_URL=https://stage.tripleten.percruit.com/
    ```

    > **Note:** Your mentor will provide these credentials. The `.env` file is git-ignored and won't be committed.

4.  **Verify Your Setup:**
    Open a terminal (<kbd>Ctrl</kbd> + <kbd>~</kbd> or <kbd>Cmd</kbd> + <kbd>~</kbd>) and run:
    ```bash
    cd ui_tests
    npm test
    ```

    If you see Cucumber tests running, you're all set! 🎉

> **💡 Tip:** The `.devcontainer/post-create.sh` script handles all the setup automatically. You can view this file to see exactly what gets installed.

---

## 💻 Option 2: Local Machine Setup (Mac or PC)

Follow these steps if you prefer to work on your own computer. Local setup gives you more control but requires more initial configuration.

### **Prerequisites**

Before you begin, you need to install the following tools. Click the links for installation instructions:

#### **Required for Everyone:**

**1. Git** - Version control system
* **Mac:** Pre-installed on macOS 10.9+. Verify with:
  ```bash
  git --version
  ```
* **Windows:** Download from [git-scm.com/downloads](https://git-scm.com/downloads) and run the installer
  - During installation, select "Git from the command line and also from 3rd-party software"
  - Use default settings for other options

**2. Node.js** - JavaScript runtime (v20 recommended, v18+ required)
* **Mac:**
  ```bash
  # Option 1: Direct download
  # Download from https://nodejs.org/

  # Option 2: Using Homebrew (recommended)
  brew install node@20
  ```
* **Windows:** Download the Windows installer from [nodejs.org](https://nodejs.org/)
  - Choose the LTS (Long Term Support) version
  - Run the installer and follow the prompts
  - Installation includes npm (Node Package Manager)
* **Verify installation:**
  ```bash
  node --version    # Should show v18 or higher
  npm --version     # Should show 9.0 or higher
  ```

**3. Python** - Programming language (v3.9+ required, v3.11 recommended)
* **Mac:**
  ```bash
  # Python 2.7 comes pre-installed but you need Python 3
  # Install via Homebrew (recommended)
  brew install python@3.11

  # Verify installation
  python3 --version
  ```
* **Windows:** Download from [python.org/downloads](https://www.python.org/downloads/)
  - Download Python 3.11 or 3.12
  - **IMPORTANT:** Check "Add Python to PATH" during installation
  - Also check "Install pip"
* **Verify installation:**
  ```bash
  python --version   # or python3 --version
  pip --version      # or pip3 --version
  ```

#### **Helpful Package Managers:**

**For Mac: Homebrew** (highly recommended)
* Makes installing development tools much easier
* Install with:
  ```bash
  /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
  ```
* After installation, follow the "Next steps" instructions to add Homebrew to your PATH
* Verify: `brew --version`

**For Windows: Chocolatey** (optional but helpful)
* Windows package manager similar to Homebrew
* Install instructions at [chocolatey.org/install](https://chocolatey.org/install)
* Requires running PowerShell as Administrator

---

### **Setup Steps**

#### **Step 1: Clone the Repository**

Open Terminal (Mac) or Command Prompt/PowerShell (Windows) and run:

```bash
git clone https://github.com/tripleten-externships/qa-percruit.git
cd qa-percruit
```

#### **Step 2: Set up UI Tests (Node.js & Playwright)**

From the project root directory:

```bash
cd ui_tests
npm install
npx playwright install --with-deps
cd ..
```

**What this does:**
- `npm install` - Installs all Node.js dependencies from `package.json`
- `npx playwright install --with-deps` - Downloads Chromium, Firefox, and WebKit browsers plus system dependencies

> **⚠️ Windows Users:** If `npx playwright install --with-deps` fails with permission errors:
> 1. Run PowerShell as Administrator
> 2. Try `npx playwright install` (without `--with-deps`)
> 3. See [TROUBLESHOOTING.md](./TROUBLESHOOTING.md) for more solutions

> **⚠️ Mac Users:** If you see permission errors, you may need to run:
> ```bash
> sudo npx playwright install-deps
> ```

#### **Step 3: Set up API Tests (Python & Poetry)**

First, install **Poetry** (Python package manager):

**On Mac:**
```bash
brew install poetry
```

**On Windows (PowerShell):**
```powershell
(Invoke-WebRequest -Uri https://install.python-poetry.org -UseBasicParsing).Content | py -
```

After installation on Windows, you may need to add Poetry to your PATH:
```powershell
# Check if poetry is accessible
poetry --version

# If not found, add this to your PATH:
# %APPDATA%\Python\Scripts
```

**Alternative (works on both Mac and Windows):**
```bash
pip install poetry
# or
pip3 install poetry
```

**Then install the API test dependencies:**
```bash
cd api_tests
poetry install
cd ..
```

**Verify Poetry installation:**
```bash
poetry --version   # Should show Poetry version 1.5+
```

#### **Step 4: Configure Your `.env` File**

Create your environment file from the example:

**Mac/Linux:**
```bash
cp .env.example .env
```

**Windows (Command Prompt):**
```cmd
copy .env.example .env
```

**Windows (PowerShell):**
```powershell
Copy-Item .env.example .env
```

Open the `.env` file in your text editor and fill in the credentials you were given:

```bash
# Required for UI tests
STUDENT_EMAIL=your-student-email@example.com
STUDENT_PASSWORD=your-password

# Required for mentor-specific tests
MENTOR_EMAIL=your-mentor-email@example.com
MENTOR_PASSWORD=your-mentor-password

# Required for admin tests
ADMIN_EMAIL=your-admin-email@example.com
ADMIN_PASSWORD=your-admin-password

# Target environment
BASE_URL=https://stage.tripleten.percruit.com/

# Optional: Control test behavior
PLAYWRIGHT_HEADLESS=false  # Set to false to see browser during tests
ENV=stage                   # Options: dev, stage, prod
```

> **Important Security Note:**
> - The `.env` file contains sensitive credentials
> - It's already in `.gitignore` and will NEVER be committed to git
> - Keep this file at the repository root so both test suites can read it
> - Never share your `.env` file or commit it to version control

Note for Windows users: You will also need to copy this .env file into your ui_tests folder--
On Windows, it must be in both places.

#### **Step 5: Verify Your Setup**

Test that everything is working correctly:

**Check Node.js and npm:**
```bash
node --version    # Should show v18 or v20
npm --version     # Should show 9.0+
```

**Check Python and Poetry:**
```bash
python --version  # or python3 --version - Should show 3.9+
poetry --version  # Should show 1.5+
```

**Run a quick UI test:**
```bash
cd ui_tests
npm test
```

Note for Windows users: You must run **npm test** in PowerShell or the VS Code terminal using PowerShell.
It will not work if you run it from the Command line (CMD).

**Run a quick API test:**
```bash
cd api_tests
poetry run pytest
```

If you see tests running (even if some fail due to missing credentials), your setup is correct! 🎉

---

## 🔐 Environment Variables

Both the UI and API test suites read configuration from a shared `.env` file at the repository root. This approach keeps credentials secure and allows easy switching between environments.

### **Required Variables**

| Variable | Required? | Purpose |
|----------|-----------|---------|
| `STUDENT_EMAIL` | ✅ **Yes** | Primary test user for student flows. Most tests use this account. Tests will fail fast if missing. |
| `STUDENT_PASSWORD` | ✅ **Yes** | Password for the student account |
| `MENTOR_EMAIL` | ⚠️ **Conditional** | Required only for mentor-specific tests (mentor dashboard, events, assignments) |
| `MENTOR_PASSWORD` | ⚠️ **Conditional** | Password for the mentor account |
| `ADMIN_EMAIL` | ⚠️ **Conditional** | Required only for admin dashboard tests |
| `ADMIN_PASSWORD` | ⚠️ **Conditional** | Password for the admin account |
| `BASE_URL` | ✅ **Yes** | Target environment under test. Defaults to `https://stage.tripleten.percruit.com/` |

### **Optional Configuration**

| Variable | Default | Purpose |
|----------|---------|---------|
| `ENV` | `stage` | Switches between configs in `ui_tests/src/config/` (`dev`, `stage`, `prod`) |
| `PLAYWRIGHT_HEADLESS` | `true` | Set to `false` to see the browser during test execution (useful for debugging) |
| `PLAYWRIGHT_SLOWMO` | `0` | Slow down Playwright actions by N milliseconds (e.g., `100` for slower execution) |
| `TEARDOWN_DELAY` | `0` | Wait N milliseconds before closing browser (useful to inspect final state) |

### **Example Configuration Files**

**For Development (watching tests run):**
```bash
STUDENT_EMAIL=student@example.com
STUDENT_PASSWORD=password123
MENTOR_EMAIL=mentor@example.com
MENTOR_PASSWORD=password456
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=password789
BASE_URL=https://stage.tripleten.percruit.com/
ENV=stage
PLAYWRIGHT_HEADLESS=false
PLAYWRIGHT_SLOWMO=100
TEARDOWN_DELAY=2000
```

**For CI/CD (fast execution):**
```bash
STUDENT_EMAIL=student@example.com
STUDENT_PASSWORD=password123
MENTOR_EMAIL=mentor@example.com
MENTOR_PASSWORD=password456
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=password789
BASE_URL=https://stage.tripleten.percruit.com/
PLAYWRIGHT_HEADLESS=true
```

> **💡 Pro Tip:** You can override environment variables at runtime:
> ```bash
> ENV=prod PLAYWRIGHT_HEADLESS=false npm test
> ```

---

## ▶️ Running the Tests

### **UI Tests (Playwright + Cucumber)**

Navigate to the `ui_tests` directory from the project root:

```bash
cd ui_tests
```

**Basic Commands:**
```bash
# Run all tests (excludes @wip tagged scenarios)
npm test

# Run tests with visible browser
PLAYWRIGHT_HEADLESS=false npm test

# Run tests in debug mode with Playwright Inspector
npm run test:debug

# Run tests with slow motion (helpful for debugging)
PLAYWRIGHT_SLOWMO=500 npm test

# Run against a specific environment
ENV=stage npm test
ENV=prod npm test

# Combine multiple options
ENV=stage PLAYWRIGHT_HEADLESS=false PLAYWRIGHT_SLOWMO=100 npm test
```

**Test Reports:**
- HTML reports are generated in `ui_tests/playwright-report/`
- After test run completes, open the report:
  ```bash
  npx playwright show-report
  ```

**Cucumber Tags:**
- Tests marked with `@wip` (work in progress) are excluded from normal runs
- To run only @wip tests:
  ```bash
  npx cucumber-js --tags "@wip"
  ```

### **API Tests (Pytest)**

Navigate to the `api_tests` directory from the project root:

```bash
cd api_tests
```

**Basic Commands:**
```bash
# Run all API tests
poetry run pytest

# Run with verbose output
poetry run pytest -v

# Run with very verbose output (shows print statements)
poetry run pytest -vv -s

# Run a specific test file
poetry run pytest tests/test_sample_api.py

# Run a specific test function
poetry run pytest tests/test_sample_api.py::test_get_posts

# Run tests matching a keyword
poetry run pytest -k "test_get"

# Show test durations
poetry run pytest --durations=10
```

**Test Reports:**
- Pytest outputs results to the console
- For HTML reports, install pytest-html:
  ```bash
  poetry add --dev pytest-html
  poetry run pytest --html=report.html
  ```

### **Running Both Test Suites**

From the repository root:

```bash
# Run UI tests
cd ui_tests && npm test && cd ..

# Run API tests
cd api_tests && poetry run pytest && cd ..

# Run both sequentially
cd ui_tests && npm test && cd .. && cd api_tests && poetry run pytest && cd ..
```

### **Common Test Scenarios**

**Debugging a failing test:**
```bash
cd ui_tests
PLAYWRIGHT_HEADLESS=false PLAYWRIGHT_SLOWMO=500 npm run test:debug
```

**Running tests against production (use with caution!):**
```bash
cd ui_tests
ENV=prod BASE_URL=https://tripleten.percruit.com npm test
```

**Quick smoke test:**
```bash
# Run a subset of critical tests
cd ui_tests
npx cucumber-js --tags "@smoke"
```

---

## 🎯 Next Steps

Now that your environment is set up, here's what to do next:

### **1. Familiarize Yourself with the Codebase**
- **UI Tests:** Browse [ui_tests/features/](./ui_tests/features/) to see domain-organized test scenarios
- **Page Objects:** Check [ui_tests/src/pages/](./ui_tests/src/pages/) to understand the Page Object Model pattern
- **API Tests:** Review [api_tests/tests/](./api_tests/tests/) for API test examples

### **2. Read the Documentation**
- **[TROUBLESHOOTING.md](./TROUBLESHOOTING.md)** - Common issues and solutions
- **[GIT_USAGE.md](./GIT_USAGE.md)** - Git workflow and commands
- **[BRANCHING_GUIDE.md](./BRANCHING_GUIDE.md)** - Branching strategy
- **[EXAMPLE-PR.md](./EXAMPLE-PR.md)** - How to write good pull requests

### **3. Start Writing Tests**
1. Create a new feature branch:
   ```bash
   git checkout -b feature/your-test-name
   ```
2. Write your test following existing patterns
3. Use `@wip` tag while developing:
   ```gherkin
   @wip
   Scenario: Your new test scenario
     Given ...
   ```
4. Test locally before pushing
5. Remove `@wip` tag when ready
6. Push and create a pull request

### **4. Understand the Test Structure**

**UI Test Anatomy (example):**
```
ui_tests/features/auth/
├── login.feature                    # Gherkin scenarios
└── src/step-definitions/
    └── auth.steps.ts                # Step implementations
```

**Page Object Example:**
```typescript
// ui_tests/src/pages/common/LoginPage.ts
export class LoginPage extends BasePage {
  async login(email: string, password: string) {
    await this.page.fill('[name="email"]', email);
    await this.page.fill('[name="password"]', password);
    await this.page.click('button[type="submit"]');
  }
}
```

### **5. Best Practices**
- ✅ Always run tests locally before pushing
- ✅ Use descriptive scenario names
- ✅ Follow existing code patterns
- ✅ Keep tests independent (no test should depend on another)
- ✅ Use Page Objects for UI interactions
- ✅ Add meaningful assertions
- ✅ Clean up test data after tests
- ⛔ Don't commit `.env` file
- ⛔ Don't hardcode credentials in tests
- ⛔ Don't create overly complex test scenarios

### **6. Getting Help**
- **Stuck on setup?** Check [TROUBLESHOOTING.md](./TROUBLESHOOTING.md)
- **Git issues?** See [GIT_USAGE.md](./GIT_USAGE.md)
- **CI/CD failing?** Review [TROUBLESHOOTING.md](./TROUBLESHOOTING.md#failed-automated-tests-on-github)
- **Questions?** Ask your mentor or team

### **7. Useful VS Code Extensions**
- **Cucumber (Gherkin) Full Support** - Syntax highlighting for .feature files
- **Playwright Test for VSCode** - Playwright debugging and test running
- **Python** - Python language support
- **Prettier** - Code formatting (already configured)
- **GitLens** - Enhanced Git capabilities

---

## 🎉 You're Ready!

Congratulations! Your QA testing environment is fully configured. You can now:
- ✅ Write UI tests using Playwright and Cucumber
- ✅ Write API tests using Pytest
- ✅ Run tests locally and in CI/CD
- ✅ Debug failing tests
- ✅ Contribute to the test suite

**Happy Testing!** 🚀
