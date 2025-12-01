// index.ts
import { Project } from 'ts-morph';
import * as fs from 'fs';

interface ClassStructure {
  className: string;
  methods: string[];
}

function extractAstData(filePath: string): ClassStructure[] {
  console.log(`> Reading file: ${filePath}...`);
  const project = new Project();
  const sourceFile = project.addSourceFileAtPath(filePath);
  const extractedData: ClassStructure[] = [];

  const classes = sourceFile.getClasses();

  classes.forEach((classDeclaration) => {
    const name = classDeclaration.getName() || 'Anonymous';

    // Get method names
    const methods = classDeclaration.getMethods().map((method) => {
      return method.getName();
    });

    extractedData.push({
      className: name,
      methods: methods,
    });
  });

  return extractedData;
}

function generateMermaidChart(data: ClassStructure[]): string {
  let chart = 'graph TD;\n';

  data.forEach((cls) => {
    // Node Class
    chart += `  ${cls.className}[Class: ${cls.className}]\n`;

    // Node Methods & Links
    cls.methods.forEach((method) => {
      const methodNodeId = `${cls.className}_${method}`;
      chart += `  ${cls.className} --> ${methodNodeId}(Method: ${method})\n`;
    });
  });

  return chart;
}

// --- Main Execution ---

try {
  const data = extractAstData('./source_tests/source3.ts');

  const jsonOutput = JSON.stringify(data, null, 2);
  fs.writeFileSync('output_ast.json', jsonOutput);
  console.log('✅ Done - output_ast.json');

  const mermaidOutput = generateMermaidChart(data);

  fs.writeFileSync('output_diagram.mmd', mermaidOutput);
  console.log('✅ Done - output_diagram.mmd');
} catch (error) {
  console.error(error);
}
