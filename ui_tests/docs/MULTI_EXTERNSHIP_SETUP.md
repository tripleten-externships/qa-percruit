# Multi-Externship Configuration

This repository now supports running tests for multiple externships (EX20, EX21, EX22, etc.) with separate configurations and credentials.

## How It Works

Each externship has its own environment file that contains externship-specific credentials and configuration:

```
.env.ex20  (for EX20 externship)
.env.ex21  (for EX21 externship)
.env.ex22  (for EX22 externship)
```

## Setup Instructions

### 1. Create Externship-Specific Environment Files

For each externship, copy the template and fill in the credentials:

```bash
# For EX20
cp .env.ex20.template .env.ex20
# Edit .env.ex20 with EX20-specific credentials

# For EX21
cp .env.ex21.template .env.ex21
# Edit .env.ex21 with EX21-specific credentials

# For EX22
cp .env.ex22.template .env.ex22
# Edit .env.ex22 with EX22-specific credentials
```

### 2. Edit Environment Files

Each `.env.exNN` file should contain:

```bash
# Externship Identifier
EXTERNSHIP=EX20

# User Credentials (specific to this externship)
STUDENT_EMAIL=student-ex20@example.com
STUDENT_PASSWORD=password123
MENTOR_EMAIL=mentor-ex20@example.com
MENTOR_PASSWORD=password123
ADMIN_EMAIL=admin-ex20@example.com
ADMIN_PASSWORD=password123
BASE_URL=https://stage.tripleten.percruit.com/

# Playwright Configuration
PLAYWRIGHT_HEADLESS=true
PLAYWRIGHT_SLOWMO=100
TEARDOWN_DELAY=8000
```

### 3. Run Tests for Specific Externship

Use the externship-specific npm scripts:

```bash
# Run tests for EX20
npm run test:ex20

# Run tests for EX21
npm run test:ex21

# Run tests for EX22
npm run test:ex22
```

### 4. Run Tests for Default/Current Externship

The standard test command uses the default `.env` file:

```bash
npm test
```

## Advanced Usage

### Run Specific Tags for an Externship

You can combine externship environment with specific tags:

```bash
# Run only smoke tests for EX20
DOTENV_CONFIG_PATH=.env.ex20 npm test -- --tags "@smoke"

# Run login tests for EX21
DOTENV_CONFIG_PATH=.env.ex21 npm test -- --tags "@login"
```

### Debug Mode for Specific Externship

```bash
# Debug EX20 tests
cross-env DOTENV_CONFIG_PATH=.env.ex20 PWDEBUG=1 npm run test:debug
```

### CI/CD Integration

In GitHub Actions or other CI/CD systems, you can set secrets for each externship:

```yaml
# .github/workflows/ex20-tests.yml
env:
  STUDENT_EMAIL: ${{ secrets.EX20_STUDENT_EMAIL }}
  STUDENT_PASSWORD: ${{ secrets.EX20_STUDENT_PASSWORD }}
  EXTERNSHIP: EX20
```

## File Structure

```
ui_tests/
├── .env                      # Default environment (backwards compatible)
├── .env.template             # Template for default .env
├── .env.ex20                 # EX20 credentials (gitignored)
├── .env.ex20.template        # Template for EX20
├── .env.ex21                 # EX21 credentials (gitignored)
├── .env.ex21.template        # Template for EX21
├── .env.ex22                 # EX22 credentials (gitignored)
├── .env.ex22.template        # Template for EX22
└── docs/
    └── MULTI_EXTERNSHIP_SETUP.md  # This file
```

## Security Notes

- **NEVER** commit `.env.ex*` files (they are gitignored)
- Only commit `.env.ex*.template` files (without real credentials)
- Each externship mentor should receive their own credentials separately
- Store sensitive credentials in a password manager

## Backward Compatibility

The standard `.env` file and `npm test` command continue to work as before. This ensures existing workflows are not broken.

## Troubleshooting

### Tests are using wrong credentials

Make sure you're using the correct npm script:
- `npm run test:ex20` for EX20
- `npm run test:ex21` for EX21
- NOT just `npm test` (uses default .env)

### Environment file not found

Ensure you've copied the template and created the `.env.exNN` file:
```bash
ls -la .env.ex*
```

You should see both `.env.exNN.template` and `.env.exNN` files.

### Tests still failing with authentication

1. Verify credentials in your `.env.exNN` file
2. Check that `EXTERNSHIP` variable matches (e.g., `EXTERNSHIP=EX20`)
3. Ensure BASE_URL is correct for your environment
4. Check with your mentor that the credentials are still valid

## Future Enhancements

Potential improvements for multi-externship support:

1. **Tagging Features by Externship**
   ```gherkin
   @ex20 @smoke
   Feature: Login for EX20
   ```

2. **Externship-Specific Test Data**
   ```
   test-data/
   ├── ex20/
   ├── ex21/
   └── ex22/
   ```

3. **Separate Reporting by Externship**
   ```
   playwright-report/
   ├── ex20/
   ├── ex21/
   └── ex22/
   ```

4. **Monorepo Approach** (if externships diverge significantly)
   ```
   packages/
   ├── core/
   ├── ex20-tests/
   ├── ex21-tests/
   └── ex22-tests/
   ```
