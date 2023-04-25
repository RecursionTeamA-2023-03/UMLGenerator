import { useEffect } from 'react'
import tocbot from 'tocbot'

export default function TopicsCard() {
  useEffect(() => {
    tocbot.init({
      tocSelector: '.toc',
      contentSelector: '.cheatSheets',
      headingSelector: 'h2, h3',
      headingsOffset: 100,
    })
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
