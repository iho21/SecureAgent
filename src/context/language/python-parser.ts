import { AbstractParser, EnclosingContext } from "../../constants";
export class PythonParser implements AbstractParser {
  findEnclosingContext(
    file: string,
    lineStart: number,
    lineEnd: number
  ): EnclosingContext {
    // TODO: Implement this method for Python
    const ast = parser.parse(file, {
      sourceType: "module",
      plugins: ["python", "typescript"], // To allow JSX and TypeScript
    });
    let largestEnclosingContext: Node = null;
    let largestSize = 0;
    traverse(ast, {
      Function(path) {
        ({ largestSize, largestEnclosingContext } = processNode(
          path,
          lineStart,
          lineEnd,
          largestSize,
          largestEnclosingContext
        ));
      },
      TSInterfaceDeclaration(path) {
        ({ largestSize, largestEnclosingContext } = processNode(
          path,
          lineStart,
          lineEnd,
          largestSize,
          largestEnclosingContext
        ));
      },
    });
    return {
      enclosingContext: largestEnclosingContext,
    } as EnclosingContext;
  }
  dryRun(file: string): { valid: boolean; error: string } {
    // TODO: Implement this method for Python
    try {
      const ast = parser.parse(file, {
        sourceType: "module",
        plugins: ["python", "typescript"], // To allow Python and TypeScript
      });
    return { valid: true,
      error: "",
    };
  } catch (exc) {
    return {
      valid: false,
      error: exc,};
  }
}}
