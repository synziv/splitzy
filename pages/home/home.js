import Link from 'next/link';
import Button from '@material-ui/core/Button';
export default function Home() {
    return (
        <div>
            <Button variant="contained" color="primary">
                Hello World
            </Button>
            <h2>
                <Link href="/">
                    <a>Back to home</a>
                </Link>
            </h2>
        </div> 
    )
  }