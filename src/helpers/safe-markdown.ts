import { helper } from '@glimmerx/helper';
import * as marked from 'marked';
import * as dompurify from 'dompurify';

const ALLOWED_TAGS = [
  'p',
  'div',
  'span',
  'a',
  'p',
  'h1',
  'h2',
  'h3',
  'h4',
  'h5',
  'h6',
  'code',
  'pre',
  'b',
  'strong',
  'em',
  '#text',
  'img',
  'ol',
  'ul',
  'li',
  'details',
  'summary',
  'dl',
  'dd',
  'dt',
  'table',
  'tr',
  'td',
  'tbody',
  'thead',
  'tfoot',
];

function isAnchorElem(node: Element): node is HTMLLinkElement {
  return 'target' in node;
}

dompurify.addHook('afterSanitizeAttributes', function (node: Element) {
  // set all elements owning target to target=_blank
  if (isAnchorElem(node)) {
    node.setAttribute('target', '_blank');
  }
  // set non-HTML/MathML links to xlink:show=new
  if (
    !node.hasAttribute('target') &&
    (node.hasAttribute('xlink:href') || node.hasAttribute('href'))
  ) {
    node.setAttribute('xlink:show', 'new');
  }
});

const safeMarkdownHelper = helper(([markdownSource]: [string]) => {
  return dompurify.sanitize(marked(markdownSource.replace(/\\n/g, '\n')), {
    ALLOWED_TAGS,
  });
});

export default safeMarkdownHelper;
