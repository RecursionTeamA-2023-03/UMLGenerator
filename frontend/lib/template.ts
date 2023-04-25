import fs from 'fs'
import path from 'path'

type Template = {
    name: string,
    content: string[]
}

export default async function getTemplate(){
    const filePath = path.join(process.cwd(), 'public', 'work', 'template.json');
    const templates:Template[] = JSON.parse(await fs.promises.readFile(filePath, { encoding: 'utf8' }));
    return { templates: templates }
}