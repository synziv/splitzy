import { NextApiRequest, NextApiResponse } from 'next';

const users = [
    {
      id: 0,
      name: 'Alexis',
      total: 0,
      color: 'green',
      owingArr: {
          user: 1,
          owing:0
      },
      groups: [1]
    },
    {
        id: 1,
        name: 'Beatrice',
        total: 0,
        color: 'purple',
        owingArr: {
            user: 0,
            owing:0
        },
        groups: [1]
      },
  ]
  export default function handler(req: NextApiRequest, res: NextApiResponse) {
    res.statusCode = 200
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify(users))
  }