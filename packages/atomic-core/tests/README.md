# Tests

This directory contains the test suite for the `@atomic-ehr/core` package.

## Running Tests

To run all tests:

```bash
bun test
```

To run tests with coverage:

```bash
bun test --coverage
```

To run tests in watch mode during development:

```bash
bun test --watch
```

To run a specific test file:

```bash
bun test tests/logger.test.ts
```

## Test Structure

Tests are organized by module and follow the naming convention `<module-name>.test.ts`.

### Current Test Files

- `logger.test.ts` - Tests for the AtomicLogger class

## Testing Framework

We use Bun's built-in test runner, which provides:

- Jest-compatible API
- Fast execution
- Built-in mocking capabilities
- Coverage reporting
- TypeScript support out of the box

## Test Patterns

### Basic Structure

```typescript
import { describe, it, expect, beforeEach } from "bun:test";

describe("ModuleName", () => {
    let instance: ModuleName;
    
    beforeEach(() => {
        // Setup before each test
        instance = new ModuleName();
    });

    describe("methodName", () => {
        it("should do something", () => {
            // Test implementation
            expect(instance.methodName()).toBe(expectedValue);
        });
    });
});
```

### Mocking

```typescript
import { jest } from "bun:test";

const mockFunction = jest.fn();
const mockObject = { method: jest.fn() };
```

## Adding New Tests

1. Create a new test file in the `tests` directory
2. Follow the naming convention `<module-name>.test.ts`
3. Import the necessary testing utilities from `bun:test`
4. Structure your tests using `describe` and `it` blocks
5. Use `beforeEach` or `afterEach` for setup and cleanup
6. Write clear, descriptive test names
7. Add assertions using `expect`

## Best Practices

- Write tests that are independent and can run in any order
- Use descriptive test names that explain what is being tested
- Keep tests focused on a single behavior
- Use setup and teardown hooks to avoid repetition
- Mock external dependencies
- Test both success and failure cases
- Include edge cases and boundary conditions 