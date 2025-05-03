# zod-to-json-online

> **Disclaimer:** This README and approximately 95% of this project were written by AI.(Even this README.md)

## Overview

zod-to-json-online is a web application built with React and TypeScript, designed to provide code conversion and schema generation utilities. The project leverages Vite for fast development, Tailwind CSS for styling, and PostCSS for CSS processing.

## Features

- **Code Conversion:** Convert code between different formats using a user-friendly interface.
- **Schema Generation:** Execute user code and generate schemas dynamically.
- **Live Editing:** Edit code and see real-time results.
- **Example Selector:** Choose from predefined code examples to get started quickly.
- **Format Selector:** Easily switch between different code formats.

## Technologies Used

- [React](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [PostCSS](https://postcss.org/)

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v16 or higher recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd project\ 3
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open your browser and navigate to `http://localhost:5173` (default Vite port).

## Project Structure

```
project 3/
├── src/
│   ├── components/         # React components (Layout, Editor, ConversionTool, etc.)
│   ├── examples/           # Example code files
│   ├── types/              # TypeScript type definitions
│   └── utils/              # Utility functions (converter, code execution, etc.)
├── index.html              # Main HTML file
├── package.json            # Project metadata and scripts
├── tailwind.config.js      # Tailwind CSS configuration
├── postcss.config.js       # PostCSS configuration
├── tsconfig*.json          # TypeScript configuration files
└── vite.config.ts          # Vite configuration
```

## License

This project is provided as-is without any warranty. Please refer to the LICENSE file for more information.
