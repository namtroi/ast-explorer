// index.ts
import { Project } from 'ts-morph';

// 1. Initialize the AST Project
const project = new Project();

// 2. Add the source file to memory for processing
const sourceFile = project.addSourceFileAtPath('./source_tests/source.ts');

// 3. Test: Print the file path to ensure it loaded correctly
console.log('Successfully loaded file:', sourceFile.getFilePath());

// Test: Get all classes in the file and print their names
const classes = sourceFile.getClasses();

classes.forEach((c) => {
  console.log('Found class:', c.getName());
});
