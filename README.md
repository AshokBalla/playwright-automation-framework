# playwright-tests

Multi-browser Playwright framework that combines UI and API examples with fixtures, page objects, and maintainable environment controls.

## Highlights

- Playwright Test
- Chromium, Firefox, and WebKit profiles
- API request context examples
- Parallel execution defaults

## Getting Started

```bash
npm install
npm test
npm run test:e2e
```

## Project Structure

- `tests/`
- `pages/`
- `fixtures/`
- `utils/`
- `reports/`
- `test-data/`

## Reporting

- HTML, JSON, and screenshot/video friendly output paths are pre-created.
- CI examples publish artifacts and preserve failure diagnostics.

## Contribution Guide

1. Create a branch from `develop`.
2. Keep helpers reusable and environment-driven.
3. Add or update validation tests with every framework change.
4. Document any new test data, report artifacts, and CI behavior.

## Notes

- - 2023: created focused repository split for Modern Playwright UI and API automation framework.

## Career Evolution & Historical Tests
The `original-tests` directory contains historical test suites and experiments from earlier stages of this project's lifecycle (2023-2025). This folder is preserved to demonstrate the evolution from initial test scripts to the modern, scalable framework architecture seen in the current `tests/` and `src/` directories.
