import type { NextApiRequest, NextApiResponse } from 'next'
const plantuml = require('node-plantuml-back')

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { format } = req.query
  const { encodedText } = req.query

  res.setHeader('Content-Type', format === 'png' ? `image/${format}` : `image/${format}+xml`)
  const decode = plantuml.decode(encodedText)
  const gen = plantuml.generate({ format: format })

  try {
    await decode.out.pipe(gen.in)
    await gen.out.pipe(res)
  } catch (err) {
    console.error(err)
    res.status(500).end()
  }
}
