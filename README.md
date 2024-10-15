# domaincrafters std 🚀

![License](https://img.shields.io/badge/license-MIT-blue.svg)

![workflow](https://github.com/domaincrafters/ddd_deno_std/actions/workflows/ci.yml/badge.svg)
![GitHub Release](https://img.shields.io/github/v/release/domaincrafters/ddd_deno_std)
[![JSR](https://jsr.io/badges/@domaincrafters/std)](https://jsr.io/@domaincrafters/std)

[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=domaincrafters.deno.std&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=domaincrafters.deno.std)
[![Coverage](https://sonarcloud.io/api/project_badges/measure?project=domaincrafters.deno.std&metric=coverage)](https://sonarcloud.io/summary/new_code?id=domaincrafters.deno.std)
[![Code Smells](https://sonarcloud.io/api/project_badges/measure?project=domaincrafters.deno.std&metric=code_smells)](https://sonarcloud.io/summary/new_code?id=domaincrafters.deno.std)


Domaincrafters/std is a package designed to simplify the development of **educational** Domain-Driven Design (DDD) projects in Deno using TypeScript. It provides essential object constructs that, while not directly tied to DDD, offer robust utilities to streamline your development process. 🛠️

## Changelog

See the [CHANGELOG](CHANGELOG.md) for detailed information about changes in each version.

## Features ✨

- **UUID**: Generate, parse, and manage universally unique identifiers.
- **Guard**: Validate function arguments and maintain consistent state with a fluent API.
- **Exception Hierarchy**:
  - **Exception**: std exception class.
  - **DomainException**: Represents domain-specific exceptions.
  - **IllegalStateException**: Thrown when an object is in an inappropriate state.
  - **NotFoundException**: Thrown when a requested resource is not found.
  - **IllegalArgumentException**: Thrown when an argument passed to a function is invalid.

## Installation 📦

To install the `@domaincrafters/std` package from domaincrafters using JSR, use the following import statement in your TypeScript project:

```typescript
import {
  UUID,
  Guard,
  Exception,
  DomainException,
  IllegalStateException,
  NotFoundException,
  IllegalArgumentException,
  Optional
} from "jsr:@domaincrafters/std";
```

## Contributing 🤝

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch: `git checkout -b feature/YourFeature`.
3. Commit your changes: `git commit -m 'Add some feature'`.
4. Push to the branch: `git push origin feature/YourFeature`.
5. Open a pull request.

Please ensure your code adheres to the project's coding standards and includes relevant tests. 🧪

## Semantic Versioning with conventional commits 🔄

This project follows semantic versioning. To simplify the release process, we use conventional commits. 
Please ensure your commit messages follow the conventional commit format


## License 📝

This project is licensed under the [MIT License](LICENSE).

Happy coding with domaincrafters std! 🚀✨

---

**Emoticon Guide:**

- **🚀**: Represents the project's forward-thinking and dynamic nature.
- **🛠️**: Indicates tools or utilities provided by the package.
- **✨**: Highlights features and important sections.
- **📦**: Symbolizes installation or packaging.
- **🔑**: Relates to UUID functionality.
- **🛡️**: Represents the Guard class and its protective validations.
- **⚠️**: Used for exception handling and warnings.
- **🏛️**: Denotes domain-specific exceptions.
- **🔄**: Indicates state-related exceptions.
- **🔍**: Represents search or not found exceptions.
- **❌**: Symbolizes invalid arguments.
- **🤝**: Signifies collaboration and contributions.
- **🧪**: Relates to testing and quality assurance.
- **📝**: Pertains to licensing information.

Feel free to adjust or add more emojis to better suit your project's personality and documentation style!
