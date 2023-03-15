import type { NextApiRequest, NextApiResponse } from 'next';
import prisma , { User, Project, Diagram } from '@/lib/prisma';
import { ValueOf } from 'next/dist/shared/lib/constants';

type Data = User & {
  projects: (Project&{
    diagrams: Diagram[]
  })[]
}

export default async function handler(this: any, 
    req: NextApiRequest,
    res: NextApiResponse<Data>) {
  if(req.method === 'GET'){
    const { id } = req.query;
    if(!id){
      res.status(400);
    } else {
      const user = await prisma.user.findUniqueOrThrow({
        where: {
          id: Number(id) 
        },
        include: {
          projects: {
            include: {
              diagrams: true,
            }
          },
        }
      });
      res.status(200).json(user);
    }
  }
};