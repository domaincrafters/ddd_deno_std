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
} from "jsr:@domaincrafters/std";
```

## Usage 🛠️

### UUID 🔑

Generate, parse, and compare UUIDs effortlessly.

```typescript
import { UUID, IllegalArgumentException } from "jsr:@domaincrafters/std";

// Creating a new UUID
const newUuid = UUID.create();
console.log(newUuid.toString()); // Outputs a UUID, e.g., '123e4567-e89b-12d3-a456-426614174000'

// Parsing an existing UUID string
try {
  const parsedUuid = UUID.parse("123e4567-e89b-12d3-a456-426614174000");
  console.log(parsedUuid.value); // Outputs: '123e4567-e89b-12d3-a456-426614174000'
} catch (error) {
  if (error instanceof IllegalArgumentException) {
    console.error(error.message); // Outputs: 'Invalid UUID'
  }
}

// Comparing UUIDs
const uuid1 = UUID.create();
const uuid2 = UUID.parse(uuid1.toString());
console.log(uuid1.equals(uuid2)); // Outputs: true

const uuid3 = UUID.create();
console.log(uuid1.equals(uuid3)); // Outputs: false
```

### Guard 🛡️

Ensure your functions receive valid arguments and maintain consistent state using a fluent API.

```typescript
import {
  Guard,
  IllegalArgumentException,
  IllegalStateException,
} from "jsr:@domaincrafters/std";

// Example function using Guard to validate arguments
function createUser(name: string, age: number) {
  Guard.check(name, "name").againstNullOrUndefined().againstWhitespace();
  Guard.check(age, "age").againstNullOrUndefined().againstNegative();

  // Function implementation
  return { name, age };
}

try {
  const user = createUser("Alice", 30);
  console.log(user);
} catch (error) {
  if (error instanceof IllegalArgumentException) {
    console.error(error.message);
  }
}

// Example class using Guard to maintain state
class UserService {
  private user: { id: UUID; name: string } | null = null;

  setUser(id: UUID, name: string) {
    Guard.check(id, "id").againstNullOrUndefined();
    Guard.check(name, "name").againstNullOrUndefined().againstWhitespace();

    this.user = { id, name };
  }

  updateUserName(newName: string) {
    Guard.check(newName, "newName").againstNullOrUndefined().againstWhitespace();

    if (!this.user) {
      throw new IllegalStateException("User is not set.");
    }

    this.user.name = newName;
  }
}

const userService = new UserService();
const userId = UUID.create();
userService.setUser(userId, "Bob");

try {
  userService.updateUserName("  "); // This will throw an exception
} catch (error) {
  if (error instanceof IllegalArgumentException || error instanceof IllegalStateException) {
    console.error(error.message);
  }
}
```

### Exception Handling ⚠️

Leverage a structured exception hierarchy for better error management.

```typescript
import {
  IllegalArgumentException,
  NotFoundException,
  IllegalStateException,
} from "jsr:@domaincrafters/std";

class UserService {
  getUser(id: UUID): User {
    if (!id || !UUID.validate(id.value)) {
      throw new IllegalArgumentException("Invalid user ID.");
    }

    const user = /* fetch user logic */;
    if (!user) {
      throw new NotFoundException("User not found.");
    }

    return user;
  }

  updateUser(user: User) {
    if (!user.isValid()) {
      throw new IllegalStateException("Cannot update user with invalid state.");
    }

    // Update logic
  }
}

try {
  const userService = new UserService();
  const user = userService.getUser(UUID.parse("invalid-uuid")); // Throws IllegalArgumentException
} catch (error) {
  if (error instanceof IllegalArgumentException) {
    console.error(error.message);
  } else if (error instanceof NotFoundException) {
    console.error(error.message);
  }
}
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
