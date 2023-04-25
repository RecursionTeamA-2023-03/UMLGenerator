import { useEffect } from 'react'
import tocbot from 'tocbot'

export default function TopicsCard() {
  const addIdsToTitle = () => {
    const entryContainer = document.querySelector('.cheatSheets')

    if (!entryContainer) {
      return
    }

    const headings = entryContainer

    ;[].forEach.call(headings.querySelectorAll('h2, h3'), (heading: HTMLElement) => {
      const id = heading.textContent
      if (!heading.getAttribute('id') && id != null) {
        heading.setAttribute('id', id)
      }
    })
  }

  const isHeadingsExists = () => {
    const entryContainer = document.querySelector('.cheatSheets')
    if (!entryContainer) {
      return
    }
    const headings = entryContainer.querySelectorAll('h2, h3')
    if (headings.length === 0) {
      return false
    }
    return true
  }
  useEffect(() => {
    tocbot.init({
      tocSelector: '.toc',
      contentSelector: '.cheatSheets',
      headingSelector: 'h2, h3',
    })

    addIdsToTitle()
    const item = document.querySelector('.toc') as HTMLElement
    if (!item) {
      return
    }
    if (!isHeadingsExists()) {
      return
    }
    item.style.display = 'block'

    tocbot.destroy()
    return () => tocbot.refresh()
  }, [])

  return (
    <>
      <div className='toc'></div>
      <link
        rel='stylesheet'
        href='https://cdnjs.cloudflare.com/ajax/libs/tocbot/4.18.2/tocbot.css'
      ></link>
    </>
  )
}
