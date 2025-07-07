#!/usr/bin/env python3
"""
Script to convert YAML test cases to TypeScript tests using Bun test framework.
"""

import yaml
import json
import os
import argparse
from pathlib import Path
from typing import Dict, List, Any, Optional


def sanitize_test_name(name: str) -> str:
    """Convert a test name to a valid TypeScript test name."""
    # Escape special characters for TypeScript strings
    sanitized = name.replace("\\", "\\\\")  # Escape backslashes first
    sanitized = sanitized.replace('"', '\\"')  # Escape double quotes
    sanitized = sanitized.replace("\n", "\\n")  # Escape newlines
    sanitized = sanitized.replace("\r", "\\r")  # Escape carriage returns
    sanitized = sanitized.replace("\t", "\\t")  # Escape tabs
    return sanitized


def format_result(result: Any) -> str:
    """Format a result value for TypeScript."""
    if isinstance(result, list):
        if not result:
            return "[]"
        # Format array elements
        formatted_items = []
        for item in result:
            if isinstance(item, str):
                # Properly escape strings
                escaped_item = item.replace("\\", "\\\\").replace('"', '\\"').replace("\n", "\\n").replace("\r", "\\r").replace("\t", "\\t")
                formatted_items.append(f'"{escaped_item}"')
            elif isinstance(item, dict):
                formatted_items.append(json.dumps(item))
            elif isinstance(item, bool):
                formatted_items.append("true" if item else "false")
            elif item is None:
                formatted_items.append("null")
            else:
                formatted_items.append(str(item))
        return f"[{', '.join(formatted_items)}]"
    elif isinstance(result, dict):
        return json.dumps(result)
    elif isinstance(result, str):
        # Properly escape strings
        escaped_result = result.replace("\\", "\\\\").replace('"', '\\"').replace("\n", "\\n").replace("\r", "\\r").replace("\t", "\\t")
        return f'"{escaped_result}"'
    elif isinstance(result, bool):
        return "true" if result else "false"
    elif result is None:
        return "null"
    else:
        return str(result)


def process_test_items(items: List[Any], indent: str = "  ") -> str:
    """Recursively process test items, handling groups and individual tests."""
    content = ""
    
    for item in items:
        if not item:  # Skip empty items
            continue
            
        if isinstance(item, dict):
            # Check if this is a group
            group_key = None
            for key in item.keys():
                if key.startswith('group:') or key.startswith('group '):
                    group_key = key
                    break
            
            if group_key:
                # This is a group - create nested describe
                group_name = group_key.replace('group:', '').replace('group ', '').strip()
                safe_group_name = sanitize_test_name(group_name)
                group_tests = item[group_key]
                
                content += f"""
{indent}describe("{safe_group_name}", () => {{
{process_test_items(group_tests, indent + "  ")}
{indent}}});"""
            else:
                # This is a regular test case
                content += generate_test_function(item, 0, indent)
    
    return content


def generate_test_function(test_case: Dict[str, Any], index: int, indent: str = "  ") -> str:
    """Generate a TypeScript test function for a single test case."""
    # Get test description
    desc = test_case.get("desc", "")
    
    # Get expression(s)
    expression = test_case.get("expression")
    expressions = []
    if isinstance(expression, list):
        expressions = expression
    else:
        expressions = [expression]
    
    # Get expected result
    result = test_case.get("result", [])
    expected = format_result(result)
    
    # Check if test should error
    should_error = test_case.get("error", False)
    
    # Get input file if specified
    input_file = test_case.get("inputfile")
    
    # Generate test name
    if desc:
        test_name = f"{desc} - {expressions[0]}" if expressions[0] else desc
    else:
        test_name = str(expressions[0]) if expressions and expressions[0] else f"test_{index}"
    
    safe_test_name = sanitize_test_name(test_name)
    
    # Generate test body
    test_body = []
    
    if input_file:
        test_body.append(f"    // Input file: {input_file}")
    
    for expr_index, expr in enumerate(expressions):
        # Skip None expressions
        if expr is None:
            continue
        # Handle dict expressions (convert to string)
        if isinstance(expr, dict):
            expr_str = json.dumps(expr)
        else:
            expr_str = str(expr)
        # Escape backticks and backslashes for template literals
        escaped_expr = expr_str.replace("\\", "\\\\").replace("`", "\\`").replace("${", "\\${")
        
        # Use unique variable names to avoid redeclaration
        result_var = f"result{expr_index}" if len(expressions) > 1 else "result"
        
        if should_error:
            test_body.append(f"    expect(() => {{")
            test_body.append(f"      fhirpath(ctx, `{escaped_expr}`, subject);")
            test_body.append(f"    }}).toThrow();")
        else:
            test_body.append(f"    const {result_var} = fhirpath(ctx, `{escaped_expr}`, subject);")
            test_body.append(f"    expect({result_var}).toEqual({expected});")
    
    test_function = f"""
{indent}it("{safe_test_name}", () => {{
{chr(10).join([indent + '  ' + line for line in test_body])}
{indent}}});"""
    
    return test_function


def convert_yaml_to_ts(yaml_file: Path, output_dir: Path) -> None:
    """Convert a YAML test file to TypeScript test file."""
    with open(yaml_file, 'r') as f:
        data = yaml.safe_load(f)
    
    # Extract test cases
    tests = data.get('tests', [])
    subject = data.get('subject', {})
    
    # Generate TypeScript file content
    file_name = yaml_file.stem
    
    # Write subject data to JSON file
    subject_file = output_dir / f"{file_name}.json"
    with open(subject_file, 'w') as f:
        json.dump(subject, f, indent=2)
    
    ts_content = f"""import {{ describe, it, expect }} from "bun:test";
import {{ fhirpath }} from "../src/index";
import subject from "./{file_name}.json" with {{ type: "json" }};

// Test file generated from {yaml_file.name}

describe("{file_name}", () => {{
  const ctx = {{}};
"""
    
    # Generate test functions using recursive processing
    ts_content += process_test_items(tests)
    
    # Close the describe block
    ts_content += "\n});\n"
    
    # Write TypeScript file
    output_file = output_dir / f"{file_name}.test.ts"
    with open(output_file, 'w') as f:
        f.write(ts_content)
    
    print(f"Generated: {output_file}")


def main():
    parser = argparse.ArgumentParser(description="Convert YAML test cases to TypeScript tests")
    parser.add_argument("input_dir", help="Directory containing YAML test files")
    parser.add_argument("-o", "--output", default="./tests", help="Output directory for TypeScript tests")
    parser.add_argument("-f", "--file", help="Convert specific file instead of entire directory")
    
    args = parser.parse_args()
    
    input_path = Path(args.input_dir)
    output_path = Path(args.output)
    
    # Create output directory if it doesn't exist
    output_path.mkdir(parents=True, exist_ok=True)
    
    if args.file:
        # Convert specific file
        yaml_file = input_path / args.file
        if not yaml_file.exists():
            print(f"Error: File {yaml_file} not found")
            return
        
        convert_yaml_to_ts(yaml_file, output_path)
    else:
        # Convert all YAML files in directory
        yaml_files = list(input_path.glob("*.yaml")) + list(input_path.glob("*.yml"))
        
        if not yaml_files:
            print(f"No YAML files found in {input_path}")
            return
        
        for yaml_file in yaml_files:
            try:
                convert_yaml_to_ts(yaml_file, output_path)
            except Exception as e:
                print(f"Error converting {yaml_file}: {e}")
    
    print(f"Conversion complete. TypeScript tests generated in {output_path}")


if __name__ == "__main__":
    main()