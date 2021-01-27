import { NextApiRequest, NextApiResponse } from "next";

const deleteItem =(id:number)=>{

}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    console.log('delete')
    switch(req.method){
        case 'DELETE':{
            console.log('delete')
        }
    }
}