import { Box, Typography, Card, CardContent, CardActionArea } from '@mui/material'
import { useState } from 'react'
import TemplateEditor from './templateEditor'

type Template = {
  name: string
  content: string[]
}

type Props = {
  templates: Template[]
}

export default function TemplateBoard({ templates }: Props) {
  const [selectedTemplate, setTemplate] = useState<Template | null>(null)
  const handleSelectTemplate = (name?: string) => {
    if (!name) setTemplate(null)
    else setTemplate(templates.find((template) => template.name === name) || null)
  }
  return (
    <>
      {!selectedTemplate && (
        <>
          <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
            <Typography variant='h5'>テンプレート</Typography>
          </Box>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              flexWrap: 'wrap',
              alignItems: 'center',
              p: '30px',
            }}
          >
            {templates.map((template) => {
              return (
                <Card
                  key={template.name}
                  onClick={() => handleSelectTemplate(template.name)}
                  sx={{ height: '100px', width: '150px', m: '15px', bgcolor: 'DodgerBlue' }}
                >
                  <CardActionArea>
                    <CardContent component='h3' sx={{ m: '0', color: 'white' }}>
                      {template.name}
                    </CardContent>
                    <CardContent />
                  </CardActionArea>
                </Card>
              )
            })}
          </Box>
        </>
      )}
      {selectedTemplate && (
        <TemplateEditor template={selectedTemplate} handleSelectTemplate={handleSelectTemplate} />
      )}
    </>
  )
}
