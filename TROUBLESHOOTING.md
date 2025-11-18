# QA Externship Troubleshooting Guide

This guide covers common issues you might encounter when setting up your environment, running tests, or working with Git and GitHub. Solutions are organized by category with platform-specific instructions where needed.

---

## Table of Contents
- [Setup & Installation Issues](#setup--installation-issues)
- [Environment & Configuration](#environment--configuration)
- [Test Execution Problems](#test-execution-problems)
- [Git & GitHub Issues](#git--github-issues)
- [CI/CD & Automation](#cicd--automation)
- [Platform-Specific Issues](#platform-specific-issues)
- [Still Stuck?](#still-stuck)

---

## Setup & Installation Issues

### Problem: Command Not Found (e.g., `poetry`, `node`, `brew`) 🔍

**Symptoms:**
```bash
$ poetry --version
bash: poetry: command not found
```

**This is almost always a PATH issue** - your terminal doesn't know where to find the program.

**Solutions:**

1. **First Step - Restart Terminal:**
   - Completely close and reopen your terminal/command prompt
   - This solves the problem 50% of the time

2. **Verify Installation:**
   ```bash
   # Check if the tool is actually installed
   which poetry    # Mac/Linux
   where poetry    # Windows
   ```

3. **Check PATH (Mac/Linux):**
   ```bash
   echo $PATH
   # Should include directories like /usr/local/bin or ~/.local/bin
   ```

4. **Check PATH (Windows):**
   ```cmd
   echo %PATH%
   # Should include Python Scripts directory
   ```

5. **Add to PATH Manually:**

   **Mac/Linux (add to `~/.zshrc` or `~/.bash_profile`):**
   ```bash
   export PATH="$HOME/.local/bin:$PATH"
   export PATH="/usr/local/bin:$PATH"
   ```

   **Windows:**
   - Search "Environment Variables" in Start Menu
   - Click "Environment Variables"
   - Edit "Path" under "User variables"
   - Add: `%APPDATA%\Python\Scripts`

6. **Reinstall the Tool:**
   ```bash
   # Mac
   brew install poetry

   # Windows (PowerShell as Admin)
   pip install poetry
   ```

---

### Problem: Node.js Version Mismatch ⚠️

**Symptoms:**
```bash
$ node --version
v16.14.0  # Too old! Need v18+
```

**Solution:**

**Mac:**
```bash
# Using Homebrew
brew uninstall node
brew install node@20

# Verify
node --version  # Should show v20.x.x
```

**Windows:**
1. Uninstall current Node.js via Control Panel
2. Download Node.js 20 LTS from [nodejs.org](https://nodejs.org/)
3. Run installer and restart terminal
4. Verify: `node --version`

---

### Problem: Python Not Found or Wrong Version 🐍

**Symptoms:**
```bash
$ python --version
Python 2.7.18  # Too old!
# or
python: command not found
```

**Solution:**

**Mac:**
```bash
# Install Python 3
brew install python@3.11

# Use python3 command
python3 --version
pip3 --version

# Create alias (optional)
echo 'alias python=python3' >> ~/.zshrc
echo 'alias pip=pip3' >> ~/.zshrc
source ~/.zshrc
```

**Windows:**
1. Download Python 3.11+ from [python.org](https://www.python.org/downloads/)
2. **IMPORTANT:** Check "Add Python to PATH" during installation
3. Restart terminal
4. Verify: `python --version`

---

### Problem: `npm install` Fails with EACCES Error 🔒

**Symptoms:**
```bash
npm ERR! code EACCES
npm ERR! syscall access
npm ERR! path /usr/local/lib/node_modules
```

**Solution:**

**Mac:**
```bash
# Fix npm permissions
sudo chown -R $(whoami) ~/.npm
sudo chown -R $(whoami) /usr/local/lib/node_modules

# Or reinstall Node via Homebrew (preferred)
brew uninstall node
brew install node@20
```

**Windows:**
- Run PowerShell or Command Prompt as Administrator
- Navigate to project: `cd path\to\qa-percruit\ui_tests`
- Run: `npm install`

---

### Problem: Playwright Browser Installation Fails 🎭

**Symptoms:**
```bash
$ npx playwright install --with-deps
Failed to install browsers
```

**Solutions:**

**Mac:**
```bash
# Try installing system dependencies with sudo
sudo npx playwright install-deps

# Then install browsers
npx playwright install
```

**Windows:**
```powershell
# Run PowerShell as Administrator
npx playwright install

# If --with-deps fails, install browsers only:
npx playwright install chromium firefox webkit
```

**Both Platforms:**
```bash
# If all else fails, install just Chromium
npx playwright install chromium

# Update playwright.config.ts to use only Chromium
```

---

### Problem: Poetry Installation Fails on Windows 💻

**Symptoms:**
```powershell
The term 'poetry' is not recognized...
```

**Solution:**

1. **Try official installer:**
   ```powershell
   (Invoke-WebRequest -Uri https://install.python-poetry.org -UseBasicParsing).Content | py -
   ```

2. **Add Poetry to PATH:**
   - Press Win + R, type `sysdm.cpl`, press Enter
   - Go to "Advanced" tab → "Environment Variables"
   - Under "User variables", edit "Path"
   - Add: `%APPDATA%\Python\Scripts`
   - Restart terminal

3. **Alternative - Use pip:**
   ```powershell
   pip install poetry
   poetry --version
   ```

---

## Environment & Configuration

### Problem: `.env` File Not Found 📄

**Symptoms:**
```bash
Error: Cannot find module 'dotenv'
Tests fail with "STUDENT_EMAIL is not defined"
```

**Solution:**

1. **Create `.env` from example:**
   ```bash
   # Mac/Linux
   cp .env.example .env

   # Windows (Command Prompt)
   copy .env.example .env

   # Windows (PowerShell)
   Copy-Item .env.example .env
   ```

2. **Verify file location:**
   ```bash
   ls -la .env          # Mac/Linux
   dir .env             # Windows
   ```
   Should be in repository root (same level as `ui_tests/` and `api_tests/`)

3. **Fill in credentials:**
   - Open `.env` in your text editor
   - Add the email/password credentials provided by your mentor

---

### Problem: Tests Fail with "Missing Required Environment Variables" 🔑

**Symptoms:**
```
Error: STUDENT_EMAIL is required but not set
Error: STUDENT_PASSWORD is required but not set
```

**Solution:**

1. **Check `.env` file exists** at repository root

2. **Verify credentials are set:**
   ```bash
   cat .env  # Mac/Linux
   type .env # Windows
   ```

3. **Ensure proper format:**
   ```bash
   STUDENT_EMAIL=your-email@example.com
   STUDENT_PASSWORD=your-password
   # No quotes, no spaces around =
   ```

4. **Check for typos in variable names** (case-sensitive)

5. **Restart your terminal** after editing `.env`

---

### Problem: Tests Run Against Wrong Environment 🌐

**Symptoms:**
- Tests run against production instead of staging
- Wrong BASE_URL being used

**Solution:**

1. **Check `.env` file:**
   ```bash
   BASE_URL=https://stage.tripleten.percruit.com/
   ENV=stage
   ```

2. **Override at runtime:**
   ```bash
   ENV=stage BASE_URL=https://stage.tripleten.percruit.com/ npm test
   ```

3. **Verify environment config:**
   - Check `ui_tests/src/config/stage.env.ts`
   - Ensure correct environment is selected

---

## Test Execution Problems

### Problem: Tests Won't Run - "Command Not Found" ⚙️

**Symptoms:**
```bash
$ npm test
npm: command not found

$ poetry run pytest
poetry: command not found
```

**Solution:**

**For UI Tests:**
1. Navigate to correct directory:
   ```bash
   cd ui_tests
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run tests:
   ```bash
   npm test
   ```

**For API Tests:**
1. Navigate to correct directory:
   ```bash
   cd api_tests
   ```

2. Install dependencies:
   ```bash
   poetry install
   ```

3. Run tests:
   ```bash
   poetry run pytest
   ```

---

### Problem: Tests Fail with "Browser Not Found" 🌐

**Symptoms:**
```
Error: browserType.launch: Executable doesn't exist
```

**Solution:**

```bash
cd ui_tests

# Install Playwright browsers
npx playwright install

# Or install specific browser
npx playwright install chromium
```

---

### Problem: Tests Timeout or Hang ⏱️

**Symptoms:**
- Tests run forever and never complete
- "Timeout 30000ms exceeded" errors

**Solutions:**

1. **Check internet connection** - tests need to access the application

2. **Verify BASE_URL is accessible:**
   ```bash
   curl https://stage.tripleten.percruit.com/
   ```

3. **Increase timeout in test:**
   - Look for `timeout` configuration in `playwright.config.ts`
   - Temporarily increase for debugging

4. **Run with visible browser:**
   ```bash
   PLAYWRIGHT_HEADLESS=false npm test
   ```
   Watch what's happening during test execution

5. **Check for `@wip` tags:**
   ```bash
   # @wip tests are excluded by default
   # Run them separately:
   npx cucumber-js --tags "@wip"
   ```

---

### Problem: Flaky Tests (Sometimes Pass, Sometimes Fail) 🎲

**Symptoms:**
- Test passes locally but fails in CI
- Test results are inconsistent

**Solutions:**

1. **Add explicit waits:**
   ```typescript
   await page.waitForSelector('[data-testid="login-button"]');
   await page.click('[data-testid="login-button"]');
   ```

2. **Use stable selectors:**
   - Prefer `data-testid` attributes
   - Avoid text-based selectors that might change

3. **Check for race conditions:**
   - Ensure page is fully loaded before interactions
   - Wait for network requests to complete

4. **Run with slower execution:**
   ```bash
   PLAYWRIGHT_SLOWMO=500 npm test
   ```

---

### Problem: "All Tests Are Skipped" 🚫

**Symptoms:**
```
0 scenarios (0 skipped)
0 steps
```

**Solution:**

1. **Check for `@wip` tag:**
   - Tests with `@wip` are excluded by default
   - Remove `@wip` from your feature file

2. **Verify feature file location:**
   - Should be in `ui_tests/features/master-list/`

3. **Check Cucumber configuration:**
   - Review `ui_tests/cucumber.js`
   - Ensure correct tags filter

---

## Git & GitHub Issues

### Problem: "My Changes Don't Show Up in My PR" 😕

**Symptoms:**
- You made changes but they're not in the pull request
- PR shows no files changed

**Solution:**

1. **Check which branch you're on:**
   ```bash
   git branch
   # Asterisk (*) shows current branch
   ```

2. **If on `main`, switch to your feature branch:**
   ```bash
   git checkout yourname/feature-description
   ```

3. **If you made changes on wrong branch:**
   ```bash
   # Stash changes
   git stash

   # Switch to correct branch
   git checkout yourname/feature-description

   # Apply changes
   git stash pop
   ```

4. **Verify and push:**
   ```bash
   git status
   git add .
   git commit -m "test: add feature description"
   git push
   ```

---

### Problem: `git push` Rejected with "fetch first" Error 🚫

**Symptoms:**
```
! [rejected] main -> main (fetch first)
error: failed to push some refs
```

**Solution:**

```bash
# Pull the latest changes first
git pull origin yourname/feature-branch

# Resolve any conflicts if they appear
# Then push again
git push
```

---

### Problem: Merge Conflict in Pull Request ⚔️

**Symptoms:**
- PR shows "This branch has conflicts that must be resolved"
- Red "X" with conflict warning

**Solution:**

**Option 1: Use GitHub UI (Easier for Beginners)**
1. Click "Resolve conflicts" button on GitHub
2. Edit the file to keep the correct code
3. Remove conflict markers (`<<<<<<<`, `=======`, `>>>>>>>`)
4. Click "Mark as resolved"
5. Click "Commit merge"

**Option 2: Resolve Locally**
```bash
# 1. Update main
git checkout main
git pull origin main

# 2. Switch to your branch
git checkout yourname/feature-description

# 3. Merge main into your branch
git merge main

# 4. Open conflicted files
# Look for conflict markers and resolve manually

# 5. Mark as resolved and push
git add .
git commit -m "merge: resolve conflicts with main"
git push
```

---

### Problem: Can't Push to `main` Branch 🔒

**Symptoms:**
```
! [remote rejected] main -> main (protected branch hook declined)
```

**Solution:**

**This is intentional!** The `main` branch is protected.

1. **Create a feature branch:**
   ```bash
   git checkout -b yourname/feature-description
   ```

2. **Make your changes and push:**
   ```bash
   git add .
   git commit -m "test: your changes"
   git push -u origin yourname/feature-description
   ```

3. **Create a Pull Request on GitHub**

---

### Problem: Git Authentication Failed 🔐

**Symptoms:**
```
remote: Support for password authentication was removed
fatal: Authentication failed
```

**Solution:**

**Use Personal Access Token (PAT):**

1. Go to GitHub Settings → Developer settings → Personal access tokens
2. Generate new token with `repo` permissions
3. Use token as password when pushing:
   ```bash
   git push
   Username: your-github-username
   Password: [paste your token here]
   ```

**Or switch to HTTPS:**
```bash
git remote set-url origin https://github.com/tripleten-externships/qa-percruit.git
```

---

## CI/CD & Automation

### Problem: GitHub Actions Tests Fail (Red ❌) 🔴

**Symptoms:**
- PR shows red X next to checks
- "Some checks were not successful"

**Solution:**

1. **Click "Details" link** next to the failed check

2. **Read the error log** to identify the issue

3. **Common CI failures:**

   **`npm ci` failed:**
   ```bash
   # Regenerate lock file locally
   cd ui_tests
   rm package-lock.json
   npm install
   git add package-lock.json
   git commit -m "fix: regenerate package-lock.json"
   git push
   ```

   **`poetry install` failed:**
   - Check `api_tests/pyproject.toml` for errors
   - Ensure `package-mode = false` is set

   **Tests failed:**
   - Run tests locally first: `npm test`
   - Check for missing `.env` variables
   - Review test output for specific errors

   **Linting/formatting failed:**
   ```bash
   cd ui_tests
   npm run format
   git add .
   git commit -m "style: format code with prettier"
   git push
   ```

---

### Problem: CI Passes Locally But Fails on GitHub 🤔

**Symptoms:**
- Tests pass on your machine
- Same tests fail in GitHub Actions

**Common Causes & Solutions:**

1. **Missing environment variables:**
   - Ensure GitHub Secrets are configured
   - Ask your mentor to verify repository secrets

2. **Platform differences:**
   - CI runs on Ubuntu Linux
   - Test might work on Mac/Windows but not Linux

3. **Timing issues:**
   - CI might be slower
   - Add explicit waits in tests

4. **File path differences:**
   - Use `path.join()` for cross-platform compatibility
   - Avoid hardcoded paths with backslashes

---

## Platform-Specific Issues

### Mac-Specific Problems 🍎

**Problem: "Operation not permitted" when running commands**

**Solution:**
```bash
# Give terminal full disk access
# System Preferences → Security & Privacy → Privacy → Full Disk Access
# Add Terminal or iTerm
```

**Problem: Homebrew not found after installation**

**Solution:**
```bash
# Add Homebrew to PATH
echo 'eval "$(/opt/homebrew/bin/brew shellenv)"' >> ~/.zprofile
eval "$(/opt/homebrew/bin/brew shellenv)"
```

**Problem: `sudo` password required repeatedly**

**Solution:**
```bash
# Use Homebrew instead of sudo
brew install poetry
brew install node@20
```

---

### Windows-Specific Problems 🪟

**Problem: PowerShell execution policy blocks scripts**

**Symptoms:**
```
... cannot be loaded because running scripts is disabled
```

**Solution:**
```powershell
# Run PowerShell as Administrator
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

**Problem: `npx` commands fail with "Access is denied"**

**Solution:**
- Run PowerShell as Administrator
- Or use Command Prompt instead

**Problem: Line endings cause Git to show all files as changed**

**Solution:**
```bash
# Configure Git to handle line endings
git config --global core.autocrlf true

# Reset repository
git rm --cached -r .
git reset --hard
```

**Problem: Path too long errors**

**Solution:**
```bash
# Enable long paths in Git
git config --system core.longpaths true
```

**Problem: All Tests Fail**
If you run `npm test` on your Windows device and all tests fail--the browser launches but never navigates
to the home page--the test is not finding `.env` file in the `ui_tests` folder.

```
npm test

> ui_tests@1.0.0 test
> cucumber-js --require-module dotenv/config --tags "not @wip"

[dotenv@17.2.3] injecting env (0) from .env -- tip: :gear:  suppress all logs with { quiet: true }
....F-Waiting 1000ms before closing browser...
.....F------Waiting 1000ms before closing browser...
.....F----Waiting 1000ms before closing browser...
.....F----Waiting 1000ms before closing browser...
.....F----Waiting 1000ms before closing browser...
.....F----Waiting 1000ms before closing browser...
```

**Solution:**
Copy your `.env` file to the `ui_tests` folder.

**Tests do not run with `You're calling functions (e.g. "setWorldConstructor") on an instance of Cucumber that isn't running` error**
If you run `npm test` and see this error:

```
npm test

> ui_tests@1.0.0 test
> cucumber-js --require-module dotenv/config --tags "not @wip"

[dotenv@17.2.3] injecting env (0) from .env -- tip: :hammer_and_wrench:  run anywhere with `dotenvx run -- yourcommand`
Error:
          You're calling functions (e.g. "setWorldConstructor") on an instance of Cucumber that isn't running (status: PENDING).
          This means you may have an invalid installation, potentially due to:
          - Cucumber being installed globally
          - A project structure where your support code is depending on a different instance of Cucumber
          Either way, you'll need to address this in order for Cucumber to work.
          See https://github.com/cucumber/cucumber-js/blob/main/docs/installation.md#invalid-installations

    at checkInstall (C:\TripleTen\qa-percruit\ui_tests\node_modules\@cucumber\cucumber\src\support_code_library_builder\index.ts:129:15)
    at C:\TripleTen\qa-percruit\ui_tests\node_modules\@cucumber\cucumber\src\support_code_library_builder\index.ts:147:11
    at Object.<anonymous> (C:\TripleTen\qa-percruit\ui_tests\src\config\world.ts:118:20)
    at Module._compile (node:internal/modules/cjs/loader:1730:14)
    at Module.m._compile (c:\TripleTen\qa-percruit\ui_tests\node_modules\ts-node\src\index.ts:1618:23)
    at node:internal/modules/cjs/loader:1895:10
    at Object.require.extensions.<computed> [as .ts] (c:\TripleTen\qa-percruit\ui_tests\node_modules\ts-node\src\index.ts:1621:12)
    at Module.load (node:internal/modules/cjs/loader:1465:32)
    at Function._load (node:internal/modules/cjs/loader:1282:12)
    at TracingChannel.traceSync (node:diagnostics_channel:322:14)
```
You are probably running the test suite from the Windows command line (CMD application) instead of PowerShell.

**Solution:**
Run the test suite using PowerShell.  This is available in the terminal in VS Code or by pressing Windows+R and then typing PowerShell.

---

### Codespaces-Specific Problems ☁️

**Problem: Codespace won't start or times out**

**Solution:**
1. Wait a few minutes and try again
2. Delete the codespace and create a new one
3. Check GitHub status page for outages

**Problem: Changes not persisting in Codespace**

**Solution:**
- Ensure changes are committed before closing Codespace
- Check if you're editing in `/tmp` or `/workspaces`

**Problem: Out of Codespaces hours**

**Solution:**
- GitHub Free: 60 hours/month
- Use local setup as alternative
- Contact GitHub support for educational access

---

## Still Stuck?

If none of these solutions work:

### 1. Gather Information 📋

Before asking for help, collect:
- **Exact error message** (copy full output)
- **Command you ran** (exact command)
- **Your environment:**
  ```bash
  node --version
  npm --version
  python --version
  poetry --version
  git --version
  ```
- **Operating system:** Mac, Windows, Linux?
- **What you've tried so far**

### 2. Check Existing Resources 📚

- **[GETTING_STARTED.md](./GETTING_STARTED.md)** - Setup instructions
- **[GIT_USAGE.md](./GIT_USAGE.md)** - Git workflow guide
- **[EXAMPLE-PR.md](./EXAMPLE-PR.md)** - PR examples
- **Repository Issues:** Check if someone else had the same problem

### 3. Ask for Help 🆘

1. **Ask your mentor** - They have the credentials and context
2. **Ask team lead** - For Git/GitHub issues
3. **Ask peers** - Someone might have solved it already
4. **Create a GitHub issue** - For repository-specific problems

### 4. Include Helpful Details ✅

When asking for help:
```
**Problem:** Brief description

**What I'm trying to do:**
- Install Poetry on Windows

**Error message:**
[paste full error here]

**What I've tried:**
- Restarted terminal
- Ran as Administrator
- Checked PATH

**Environment:**
- Windows 11
- Python 3.11
- PowerShell 7.3
```

---

## Quick Fixes Summary 🚀

| Problem | Quick Fix |
|---------|-----------|
| Command not found | Restart terminal, check PATH |
| Can't install packages | Run as admin (Windows) or use `sudo` (Mac) |
| Tests won't run | Check you're in correct directory, run install commands |
| Wrong branch | `git checkout your-branch-name` |
| Can't push | Create feature branch, don't push to `main` |
| Merge conflict | Use GitHub "Resolve conflicts" button |
| CI failing | Click "Details", read error log, fix locally first |
| `.env` not found | `cp .env.example .env` from repository root |

---

## Prevention Tips 🛡️

**To avoid common issues:**

✅ **Always:**
- Work on feature branches, never `main`
- Pull latest changes before starting work
- Test locally before pushing
- Read error messages carefully
- Restart terminal after installing tools

⛔ **Never:**
- Commit `.env` file with real credentials
- Push directly to `main`
- Ignore error messages
- Skip running tests before creating PR
- Use `sudo` unless necessary (Mac)

---

**Remember:** Most problems have been solved before. Search the error message, check documentation, and don't hesitate to ask for help! 🤝
