# Singleton SD - Design System - Tokens

[![Latest Release](https://gitlab.com/singleton-sd/design-system/tokens/-/badges/release.svg)](https://gitlab.com/singleton-sd/design-system/tokens/-/releases)
[![pipeline status](https://gitlab.com/singleton-sd/design-system/tokens/badges/master/pipeline.svg)](https://gitlab.com/singleton-sd/design-system/tokens/-/commits/master)
[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

[Live Latest Resume Build](https://singleton-sd.gitlab.io/design-system/tokens/)

📌 **Short description of the project.**

This package contains the official design tokens used across Singleton SD projects. It provides a single source of truth for spacing, typography, scales, and theme values, ensuring visual consistency across platforms and tools.

Tokens are distributed in platform-agnostic JSON format and built outputs, ready to be consumed by:

- Frontend frameworks (React, Tailwind, MUI, etc.)
- Design tools (e.g. Figma Tokens Studio via raw URL)
- Any product needing consistent, scalable UI design foundations

## 📁 Structure Overview

font/ → Base font sizes and heading scale
dimension/scale/ → Atomic spacing units based on font.base
spacing/ → Semantic spacing references (xs–xxl)

## 🚀 Usage

### NPM

```bash
npm install @singletonsd/tokens
```

### URL (e.g. for Figma)

[https://gitlab.com/singleton-sd/design-system/tokens/-/raw/main/dist/tokens.json](https://gitlab.com/singleton-sd/design-system/tokens/-/raw/main/dist/tokens.json)

## 📦 Installation

### **Using NPM**

```sh
npm install @singleton-sd/tokens
```

### **Using Yarn**

```sh
yarn add @singleton-sd/tokens
```

### **Local Development**

Clone the repository and install dependencies:

```sh
git clone https://gitlab.com/singleton-sd/design-system/tokens.git
cd tokens
yarn install
```

## 🔄 Versioning

This project follows [Semantic Versioning](https://semver.org/). Releases are tagged as:

- `1.0.0` - Major release (breaking changes)
- `1.1.0` - Minor release (new features, backward compatible)
- `1.1.1` - Patch release (bug fixes, security updates)

## 🤝 Contributing

👨‍💻 We welcome contributions!

### **Steps to Contribute**

1. Fork the repository.
2. Create a new feature branch: `git checkout -b feature-name`
3. Commit your changes: `git commit -m "Add new feature"`
4. Push to the branch: `git push origin feature-name`
5. Create a Merge Request on GitLab.

## 🔧 CI/CD Pipeline

This project uses **GitLab CI/CD** for automated testing and deployment. See the `.gitlab-ci.yml` file for details.

## 📄 License

This project is licensed under the **MIT License**. See the [LICENSE](LICENSE) file for details.

## 📬 Contact

For questions or support, contact:

- 📧 Email: [support@singletonsd.com](mailto:support@singletonsd.com)
- 🏢 Company: [Singleton Software Development](https://singletonsd.com)

--

© [Singleton Software Development](https://singletonsd.com) - All rights reserved.
