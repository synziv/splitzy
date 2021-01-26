import { NextApiRequest, NextApiResponse } from "next"
import { IItem } from "../../objectTypes/item";

export const dbItems: IItem[] = [
    {
      id: 0,
      name: 'Banane',
      total: 10,
      user: 0,
      splitMode: 'all',
      splitWith: [1,2],
      groupId: 1
    },
    {
        id: 1,
        name: 'Pomme',
        total: 20,
        user: 1,
        splitMode: 'all',
        splitWith: [0,2],
        groupId: 1
      },
  ]

  

  export default function handler(req: NextApiRequest, res: NextApiResponse) {
    res.statusCode = 200
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify(dbItems))
  }