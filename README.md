# Build Tool Showcase

A web application to showcase popular build tools, featuring filtering, searching, and theme toggling functionalities. Built with TypeScript, SCSS, Webpack, and tested with Jest.

## Features

Dynamic Tool Listing: Displays build tools from data.json with details like version, downloads, and homepage links.
Filtering: Filter tools by status (All, Active, Inactive).
Search: Search tools by name.
Theme Toggling: Switch between light and dark themes, with preferences saved in localStorage.
Responsive Design: Styled with SCSS for a clean, responsive UI.
Testing: Unit tests for core functionality using Jest.
Deployment: Deployed to GitHub Pages.

## Tech Stack

Frontend: TypeScript, SCSS
Build Tool: Webpack
Traspiling: Babel(babel-loader)
Testing: Jest, ts-jest, jest-environment-jsdom
Linting/Formatting: ESLint, Prettier
Deployment: GitHub Pages
Dependencies: Lodash (for filtering and sorting)

## Project Structure

build-tools-project/
├── src/
│   ├── __mocks__/
│   │   └── data.json
│   ├── styles/
│   │   └── main.scss
|   |   └── _variables.scss
|   |   └──_mixin.scss
│   ├── extensionsManager.ts
│   ├── themeManager.ts
│   ├── types.ts
│   ├── index.ts
│   ├── themeManager.test.ts
│   └── extensionsManager.test.ts
├── data/
│   └── data.json
├── dist/
├── index.html
├── package.json
├── webpack.dev.js
├── webpack.prod.js
├── jest.config.js
└── jest.setup.ts

## Prerequisites

Node.js (v18 or higher)
npm (v9 or higher)

## Setup

Clone the Repository:
git clone <https://github.com/your-username/build-tools-project.git>
cd build-tools-project

Switch to Development Branch:
git checkout development

Install Dependencies:
npm install

Run Locally:
npm run dev

Opens at <http://localhost:8080> (or another port if configured differently in webpack.dev.js).

Build
To generate production-ready files:
npm run build

Outputs to the dist/ folder.

Testing
Run unit tests with Jest:
npm test

Tests are located in themeManager.test.ts and extensionsManager.test.ts.

Code Quality
Ensure code quality with linting and formatting:
npm run check

Runs ESLint (npm run lint) and Prettier (npm run format).

Deployment
GitHub Pages

Deployed from the development branch to the gh-pages branch.
URL: [https://your-username.github.io/build-tools-project/](https://your-username.github.io/build-tools-project/)
Deploy Command:npm run deploy

Continuous deployment is set up via GitHub Actions (see .github/workflows/deploy.yml).

## Usage

Filter Tools: Click the "All", "Active", or "Inactive" buttons to filter tools.
Search Tools: Use the search bar to find tools by name or description.
Toggle Theme: Click the theme toggle button to switch between light and dark modes.
Visit Homepages: Click "Visit Homepage" to open a tool’s website in a new tab.

## Contributing

Fork the repository.
Create a feature branch (git checkout -b feature/your-feature).
Commit changes (git commit -m "Add your feature").
Push to the branch (git push origin feature/your-feature).
Open a pull request against the development branch.

License
No License
