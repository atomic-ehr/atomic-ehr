import { parse } from './src/parser';

const result = parse('active and age > 18');
console.log('Success:', result.success);
console.log('AST:', JSON.stringify(result.ast, null, 2));
console.log('Errors:', result.errors);
