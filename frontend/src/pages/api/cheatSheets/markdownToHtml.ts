import { remark } from 'remark'
import html from 'remark-html'
import remarkGfm from 'remark-gfm'
import remarkSlug from 'remark-slug'
import remarkToc from 'remark-toc'
/**
 * Markdown を解析して HTML にして返す
 * @param markdown Markdown ファイル名
 * @returns HTML
 */
const markdownToHtml = async (markdown: string) => {
  const result = await remark()
    .use(html)
    .use(remarkGfm)
    .use(remarkToc, { heading: '目次', maxDepth: 2 })
    .use(remarkSlug)
    .process(markdown)
  return result.toString()
}

export default markdownToHtml
