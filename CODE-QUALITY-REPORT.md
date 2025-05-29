# Code Quality Report - Build Tool Showcase

## Overview

This report summarizes the code quality status of the "Build Tool Showcase" project. The project is a modern web application built with TypeScript, SCSS, and Font Awesome, featuring a responsive UI with light/dark themes. The goal is to maintain high code quality through linting, testing, and addressing critical issues.

## Code Quality Practices

### Linting

Tool: ESLint (@eslint/js, typescript-eslint)

- Configuration:

Enforces TypeScript best practices.

Integrated with Prettier for consistent formatting.

- Command:

npm run lint

- Outcome: Ensures code adheres to style guidelines and catches potential errors (e.g., unused variables).

### Formatting

- Tool: Prettier

- Configuration:

Formats TypeScript, SCSS, and HTML files.

Runs automatically with npm run format.

- Command:

npm run format

- Outcome: Maintains consistent code style across the project.

### Testing

- Tool: Jest (jest, ts-jest, jest-environment-jsdom)

- Coverage:

Unit tests for themeManager.ts and extensionsManager.ts.

Tests cover theme toggling, filtering, searching, and DOM interactions.

- Command:

npm test

### Git Hooks

- Tool: Husky

- Configuration:

Runs npm run check (linting and formatting) before commits.

- Outcome: Prevents commits with linting or formatting issues.

## Issues Identified and Fixes Applied

1 . Incorrect Import Path for data.json

    Issue: extensionsManager.ts imported data.json from an incorrect path (./data/data.json instead of /data.json).

    Caused build failures in production as the file couldn’t be found.

    Fix: Updated the import to /data.json and moved data.json to the public/ folder for Webpack to copy to dist/.

2 . Jest Setup Errors

    Issue: jest.setup.ts had an unused mocked import from ts-jest/utils, causing linting errors ('mocked' is declared but its value is never read).

    Prevented clean test runs.

    Fix: Removed the unused import and updated the Lodash mock to use jest.mock directly.

3 . An error was encountered in themeManager.ts
    Issue: 19:5  error  Expected an assignment or function call and instead saw an expression  @typescript-eslint/no-unused-expressions

    The issue occurred in the initializeTheme method due to a ternary operator (currentTheme === 'light' ? this.setLightTheme() : this.setDarkTheme()) being flagged as an unused expression.

    Fix: The ternary operator was replaced with an if-else statement to satisfy the @typescript-eslint/no-unused-expressions rule.

4 . Encounter an error of wrong indentation, and missing semicolons

    Issue: This occured because I was not following the proper formatting rules which was enforced by the Eslint and Prettier

    Fix: Resolved by correcting my maintaining proper formatting and ending my statements with semicolons.

5 . An error encountered in themeManager.test.ts

    Isue: 4: 'themeManager' is assigned a value but never used.eslint@typescript-eslint/no-unused-vars

    The is occured because of the rules set for my eslint where a value assigned should be used
    And since this was something implemented in the eslint configuration then I can't go and change the configuration, then
    it will be like breaking rules that I sent for my application
    
    Fix: So therefore, for just that error to be resolved for the tests to run, I added a comment just above the 'themeManger': HTMLElement = ThemeManger;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    this just disables the rule for only the code it is placed above of.

6 . Encountered warning when I tried using console logs within my code

    Fix: Actually this did not prevent my application from building but I was warned to remove such logs from my codebase
