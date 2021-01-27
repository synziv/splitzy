import { NextApiRequest, NextApiResponse } from 'next';
import { IItem } from '../../objectTypes/item';
import { dbItems } from './item';
import { IUser } from '../../objectTypes/user';

export const dbUsers: IUser[] = [
  {
    id: 0,
    name: 'Alexis',
    total: 0,
    color: 'green',
    owingArr: [
      {
        user: 1,
        owing: 0
      },
      {
        user: 2,
        owing: 0
      }
    ],
    groups: [1]
  },
  {
    id: 1,
    name: 'Beatrice',
    total: 0,
    color: 'purple',
    owingArr: [
      {
        user: 0,
        owing: 0
      },
      {
        user: 2,
        owing: 0
      }
    ],
    groups: [1]
  },
  {
    id: 2,
    name: 'John',
    total: 0,
    color: 'red',
    owingArr: [
      {
        user: 0,
        owing: 0
      },
      {
        user: 1,
        owing: 0
      }
    ],
    groups: [1]
  },
]
//make logic to only calculate if the item list has a different length

const resetOwingArr =(userInGroup: IUser[])=>{
  userInGroup.forEach(user=>{
    user.owingArr.forEach(x=> x.owing =0);
  });
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  let userInGroup = dbUsers.filter(group=>group.groups.includes(1));
  res.statusCode = 200
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify(userInGroup))
}
