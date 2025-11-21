# QA Externship Test Automation Template

[![Run QA Tests](https://github.com/tripleten-externships/qa-percruit/actions/workflows/ci.yml/badge.svg)](https://github.com/tripleten-externships/qa-percruit/actions/workflows/ci.yml)

Welcome! This repository is a turnkey template for QA externs to start writing UI and API tests without complex setup. The goal is simple: you should be able to start writing and running tests within minutes.

---

## ✨ Quickstart: The Easy Way (GitHub Codespaces)

This is the **fastest and most reliable** way to get started. No local installation required!

1.  **Open in Codespaces:** Click the green **`< > Code`** button, go to the **Codespaces** tab, and click **"Create codespace on main"**.
2.  **Wait for Setup:** The container will build automatically (3-5 minutes first time). The dev container automatically:
    - Installs Node.js 20
    - Installs Python 3.11 and Poetry
    - Runs `npm ci` for UI test dependencies
    - Runs `npx playwright install --with-deps` for browser automation
    - Runs `poetry install` for API test dependencies
3.  **Configure Credentials:** Once the VS Code editor loads in your browser:
    ```bash
    cp .env.example .env
    ```
    Edit `.env` and fill in your test credentials (provided by your mentor).
4.  **Run the Tests!** Open a new terminal (<kbd>Ctrl</kbd> + <kbd>~</kbd>):

    **UI tests:**
    ```bash
    cd ui_tests
    npm test
    ```

    **API tests:**
    ```bash
    cd api_tests
    poetry run pytest
    ```

---

## 🚀 What's Inside?

This repository contains two complete testing suites with 60+ test scenarios:

### **UI Testing** ([/ui_tests](./ui_tests))
* **Framework:** Playwright & Cucumber.js (BDD)
* **Language:** TypeScript
* **Node Version:** 20 (managed via `.nvmrc`)
* **Test Organization:**
  - Feature files in [features/master-list/](./ui_tests/features/master-list/)
  - Page Object Model in [src/pages/](./ui_tests/src/pages/)
  - Multi-environment configs (dev, stage, prod)
* **Test Coverage:**
  - Login & Authentication
  - Student/Mentor/Admin Dashboards
  - Profile Management
  - Mentor Assignments & Events
  - Interview Questions & Coding Problems
  - Resume Reviews & Student Readiness
  - Usage Metrics & Expert Interviews
  - System Health Monitoring

### **API Testing** ([/api_tests](./api_tests))
* **Framework:** Pytest & Requests
* **Language:** Python 3.9+
* **Package Manager:** Poetry
* **Test Pattern:** Arrange-Act-Assert
* **Sample Tests:** Ready to expand with Percruit API endpoints

### **Additional Features**
* **GitHub Actions CI/CD:** Automated testing on every push/PR
* **Dev Container:** One-click Codespaces setup with all dependencies
* **Pre-commit Hooks:** Husky + Prettier for code quality
* **Commit Linting:** CommitLint for standardized commit messages
* **Multi-Role Testing:** Support for Student, Mentor, and Admin user flows

---

## 🧪 Running Tests

### **UI Tests**
```bash
cd ui_tests
npm test                    # Run all tests (excludes @wip)
npm run test:debug          # Debug mode with Playwright Inspector
```

Test reports are generated in [ui_tests/playwright-report/](./ui_tests/playwright-report/)

### **API Tests**
```bash
cd api_tests
poetry run pytest           # Run all API tests
poetry run pytest -v        # Verbose output
poetry run pytest -k "test_name"  # Run specific test
```

### **Environment-Specific Tests**
```bash
ENV=stage npm test          # Run against staging
ENV=prod npm test           # Run against production
PLAYWRIGHT_HEADLESS=false npm test  # Run with visible browser
```

---

## 🔐 Environment Variables

Both test suites use a shared `.env` file at the repository root. Required variables:

| Variable | Required? | Purpose |
|----------|-----------|---------|
| `STUDENT_EMAIL` | ✅ | Primary test user for student flows |
| `STUDENT_PASSWORD` | ✅ | Student account password |
| `MENTOR_EMAIL` | ⚠️ | Required for mentor-specific tests |
| `MENTOR_PASSWORD` | ⚠️ | Mentor account password |
| `ADMIN_EMAIL` | ⚠️ | Required for admin dashboard tests |
| `ADMIN_PASSWORD` | ⚠️ | Admin account password |
| `BASE_URL` | ✅ | Target environment (defaults to stage) |
| `ENV` | Optional | Config selector: `dev`, `stage`, or `prod` |
| `PLAYWRIGHT_HEADLESS` | Optional | `true` or `false` - show browser during tests |

**Example `.env` file:**
```bash
STUDENT_EMAIL=student@example.com
STUDENT_PASSWORD=your-password
MENTOR_EMAIL=mentor@example.com
MENTOR_PASSWORD=your-password
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=your-password
BASE_URL=https://stage.tripleten.percruit.com/
```

---

## 📚 Documentation & Guides

### **Setup & Configuration**
* **[GETTING_STARTED.md](./GETTING_STARTED.md)** - Complete setup guide for Mac and Windows
* **[TROUBLESHOOTING.md](./TROUBLESHOOTING.md)** - Solutions to common problems
* **[MENTOR_SETUP.md](./MENTOR_SETUP.md)** - Repository setup checklist for mentors

### **Git Workflow**
* **[GIT_USAGE.md](./GIT_USAGE.md)** - Git commands and workflows
* **[BRANCHING_GUIDE.md](./BRANCHING_GUIDE.md)** - Branching strategy
* **[EXAMPLE-PR.md](./EXAMPLE-PR.md)** - Pull request best practices
* **[PULL_REQUEST_TEMPLATE.md](./.github/PULL_REQUEST_TEMPLATE.md)** - PR template

---

## 🛠️ Technology Stack

**UI Tests:**
- Playwright 1.56+
- Cucumber.js 12.2+
- TypeScript 5.5+
- Node.js 20

**API Tests:**
- Pytest 8.2+
- Requests 2.32+
- Python 3.9+
- Poetry

**Dev Tools:**
- Husky (Git hooks)
- Prettier (Code formatting)
- CommitLint (Commit message validation)
- GitHub Actions (CI/CD)

---

## 🤝 Contributing

1. Create a feature branch from `main`
2. Write your tests following existing patterns
3. Use `@wip` tag for work-in-progress tests
4. Run tests locally before pushing
5. Open a PR using the template
6. Ensure CI checks pass

**Branch Protection:** The `main` branch requires:
- UI tests to pass
- API tests to pass
- At least one approval

---

## 📦 Project Structure

```
qa-percruit/
├── .devcontainer/          # Codespaces configuration
├── .github/
│   ├── workflows/          # CI/CD workflows
│   └── labels.yml          # Issue labels
├── api_tests/              # Python API tests
│   ├── tests/
│   ├── pyproject.toml
│   └── poetry.lock
├── ui_tests/               # TypeScript UI tests
│   ├── features/           # Cucumber feature files
│   │   └── master-list/    # Organized test scenarios
│   ├── src/
│   │   ├── config/         # Environment configs
│   │   ├── pages/          # Page Object Models
│   │   └── utils/          # Helper functions
│   ├── package.json
│   └── playwright.config.ts
├── .env.example            # Environment template
├── .nvmrc                  # Node version (20)
├── README.md               # This file
└── GETTING_STARTED.md      # Setup instructions
```

---

## 💡 Need Help?

- **Setup Issues?** Check [TROUBLESHOOTING.md](./TROUBLESHOOTING.md)
- **Git Questions?** See [GIT_USAGE.md](./GIT_USAGE.md)
- **CI/CD Failing?** Review [TROUBLESHOOTING.md](./TROUBLESHOOTING.md#failed-automated-tests-on-github)
- **Ask Your Mentor** for credentials and access
