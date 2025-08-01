import { codeToHtml } from 'shiki';


export async function highlightCode(
  code: string,
  lang: string = 'ts',
  mode: 'Dark Mode' | 'Light Mode' | 'Device Mode' = 'Device Mode'
) {
  const isDark =
    mode === 'Dark Mode' ||
    (mode === 'Device Mode' &&
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-color-scheme: dark)').matches);

  const theme = isDark ? 'slack-dark' : 'github-light';
  
  // Count the number of lines in the code
  const totalLines = code.split('\n').length;

  return await codeToHtml(code, {
    lang,
    theme,
    transformers: [
      {
        line(this, node, lineNumber) {
          const isFirstLine = lineNumber === 1;
          const isLastLine = lineNumber === totalLines;
          
          return {
            ...node,
            children: [
              {
                type: 'element',
                tagName: 'span',
                properties: {
                  class: ['line-number'],
                  style: `
                    display: inline-block;
                    width: 2em;
                    user-select: none;
                    opacity: 0.4;
                    margin-left: 20px;
                    ${isFirstLine ? 'margin-top: 20px;' : ''}
                    ${isLastLine ? 'margin-bottom: 20px;' : ''}
                  `,
                },
                children: [{ type: 'text', value: String(lineNumber) }],
              },
              ...(node.children || []),
            ],
          };
        },
      },
    ],
  });
}