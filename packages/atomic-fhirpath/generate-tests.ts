#!/usr/bin/env bun

import { readdir, readFile, writeFile, mkdir } from "fs/promises";
import { parse } from "yaml";
import { join } from "path";

interface TestCase {
  name: string;
  description?: string;
  difficulty?: string;
  categories?: string[];
  expression: string;
  expressions?: string[];
  expected?: any[];
  error?: {
    type: string;
    message: string;
  };
  fixture?: any;
}

interface TestFile {
  name: string;
  description: string;
  tests: TestCase[];
}

// Helper function to escape backticks in template literals
function escapeBackticks(str: string): string {
  // First escape any existing backslashes before backticks
  return str.replace(/\\`/g, '\\\\`').replace(/`/g, '\\`').replace(/\${/g, '\\${');
}

// Helper function to format fixture objects
function formatFixture(fixture: any): string {
  const json = JSON.stringify(fixture, null, 2);
  // Split and rejoin to maintain indentation
  return json.split('\n').map((line, i) => i === 0 ? line : '      ' + line).join('\n');
}

// Helper function to format expected values
function formatExpected(expected: any): string {
  // Handle special date/time values
  if (Array.isArray(expected) && expected.length === 1 && typeof expected[0] === 'string') {
    // Check if it's a date/time value
    if (/^\d{4}-\d{2}-\d{2}/.test(expected[0])) {
      return `["${expected[0]}"]`;
    }
  }
  
  // Handle quantity objects
  if (Array.isArray(expected) && expected.length === 1 && typeof expected[0] === 'object' && expected[0].value !== undefined && expected[0].unit !== undefined) {
    return JSON.stringify(expected);
  }
  
  return JSON.stringify(expected);
}

// Convert YAML test structure to TypeScript test code
function generateTestCode(testFile: TestFile, fileName: string): string {
  const testSuiteName = testFile.name;
  const description = testFile.description;
  
  // Generate imports
  let code = `import { describe, it, expect } from "bun:test";
import { fhirpath } from "../src/index";

// Test file generated from ${fileName}
// ${description}

describe("${testSuiteName}", () => {
`;

  // Group tests by category or difficulty
  const groupedTests: { [key: string]: TestCase[] } = {};
  
  testFile.tests.forEach(test => {
    // Group by first category if available, otherwise by difficulty
    const groupKey = test.categories?.[0] || test.difficulty || "general";
    if (!groupedTests[groupKey]) {
      groupedTests[groupKey] = [];
    }
    groupedTests[groupKey].push(test);
  });

  // Generate test groups
  Object.entries(groupedTests).forEach(([group, tests]) => {
    code += `
  describe("${group}", () => {`;

    tests.forEach(test => {
      const testName = test.name.replace(/"/g, '\\"');
      const hasError = !!test.error;
      const expressions = test.expressions || [test.expression];
      
      if (hasError) {
        // Error test case
        code += `
    it("${testName}", () => {
      ${test.fixture ? `const fixture = ${formatFixture(test.fixture)};` : 'const fixture = {};'}
      ${test.description ? `// ${test.description}` : ''}
      expect(() => {
        fhirpath({}, \`${escapeBackticks(expressions[0] || '')}\`, fixture);
      }).toThrow(${test.error?.message ? `"${test.error.message?.replace(/"/g, '\\"') || ''}"` : ''});
    });`;
      } else {
        // Normal test case
        expressions.forEach((expr, index) => {
          const testSuffix = expressions.length > 1 ? ` (expression ${index + 1})` : '';
          code += `
    it("${testName}${testSuffix}", () => {
      ${test.fixture ? `const fixture = ${formatFixture(test.fixture)};` : 'const fixture = {};'}
      ${test.description && index === 0 ? `// ${test.description}` : ''}
      const result = fhirpath({}, \`${escapeBackticks(expr)}\`, fixture);
      expect(result).toEqual(${formatExpected(test.expected)});
    });`;
        });
      }
    });

    code += `
  });`;
  });

  code += `
});
`;

  return code;
}

// Main generator function
async function generateTests() {
  console.log("🚀 Starting test generation...");
  
  const yamlDir = join(process.cwd(), "fhirpath-tests");
  const outputDir = join(process.cwd(), "tests");
  
  // Create output directory
  await mkdir(outputDir, { recursive: true });
  
  // Read all YAML files
  const files = await readdir(yamlDir);
  const yamlFiles = files.filter(f => f.endsWith('.yaml')).sort();
  
  console.log(`📁 Found ${yamlFiles.length} YAML test files`);
  
  for (const file of yamlFiles) {
    console.log(`📄 Processing ${file}...`);
    
    try {
      // Read and parse YAML
      const yamlContent = await readFile(join(yamlDir, file), 'utf-8');
      const testData = parse(yamlContent) as TestFile;
      
      // Generate TypeScript code
      const tsCode = generateTestCode(testData, file);
      
      // Write TypeScript file
      const outputFile = file.replace('.yaml', '.test.ts');
      await writeFile(join(outputDir, outputFile), tsCode);
      
      console.log(`✅ Generated ${outputFile}`);
    } catch (error) {
      console.error(`❌ Error processing ${file}:`, error);
    }
  }
  
  // Generate index file that imports all tests
  const indexContent = yamlFiles
    .map(f => `import "./${f.replace('.yaml', '.test')}";`)
    .join('\n');
  
  await writeFile(join(outputDir, "index.ts"), indexContent + '\n');
  
  console.log("✨ Test generation complete!");
  console.log(`📊 Generated ${yamlFiles.length} test files in ${outputDir}`);
}

// Run the generator
if (import.meta.main) {
  generateTests().catch(console.error);
}