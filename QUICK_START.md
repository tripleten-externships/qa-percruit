# Quick Start - Refactoring

## To Complete the Refactoring

Run this single command from the repository root:

```bash
bash complete_refactoring.sh
```

This will:
- ✅ Rename all feature files to kebab-case
- ✅ Rename folders for consistency
- ✅ Show you the git status

## After Running the Script

1. **Verify changes:**
   ```bash
   git status
   ```

2. **Test that everything works:**
   ```bash
   cd ui_tests
   npm test
   ```

3. **Commit the changes:**
   ```bash
   git add .
   git commit -m "refactor: clean up folder structure and add multi-externship support"
   ```

4. **Push to remote:**
   ```bash
   git push -u origin refactor/folder-structure-cleanup
   ```

## What Was Done Automatically

✅ Removed `master-list/` directory
✅ Consolidated duplicate login features
✅ Moved docs to `ui_tests/docs/`
✅ Created multi-externship env templates (`.env.ex20.template`, etc.)
✅ Added npm scripts: `npm run test:ex20`, `npm run test:ex21`, `npm run test:ex22`
✅ Updated `.gitignore`

## What Needs Manual Completion

⏳ File renames (run `complete_refactoring.sh`)
⏳ Folder renames (run `complete_refactoring.sh`)
⏳ Test verification (run `npm test`)

## Documentation

- 📄 [REFACTORING_SUMMARY.md](./REFACTORING_SUMMARY.md) - Complete summary of all changes
- 📄 [REFACTORING_MANUAL_STEPS.md](./REFACTORING_MANUAL_STEPS.md) - Individual commands (if you prefer manual)
- 📄 [ui_tests/docs/MULTI_EXTERNSHIP_SETUP.md](./ui_tests/docs/MULTI_EXTERNSHIP_SETUP.md) - How to use multi-externship feature

## Using Multi-Externship Configuration

### Setup
```bash
cd ui_tests
cp .env.ex20.template .env.ex20
# Edit .env.ex20 with your EX20 credentials
```

### Run Tests
```bash
npm run test:ex20  # Run EX20 tests
npm run test:ex21  # Run EX21 tests
npm run test:ex22  # Run EX22 tests
npm test           # Run default tests (uses .env)
```

## Need Help?

- See [REFACTORING_SUMMARY.md](./REFACTORING_SUMMARY.md) for detailed information
- Check [ui_tests/docs/MULTI_EXTERNSHIP_SETUP.md](./ui_tests/docs/MULTI_EXTERNSHIP_SETUP.md) for multi-externship usage
