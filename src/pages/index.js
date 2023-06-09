import Image from 'next/image';
import { Inter } from 'next/font/google'
import Link from 'next/link';
import fetch from 'isomorphic-unfetch';
import {Button, Card} from 'semantic-ui-react'
const inter = Inter({ subsets: ['latin'] })


export default function Index({notes}) {

 
  return (
   <div className="notes-container ">
      <h1>Notes</h1>
      <div className='grid wrapper'>
        {notes.map(note=>{
          return(<div key={note._id} className='cardNote'>
            <Card >
              <Card.Content >
                <Card.Header>
                  <Link href={`/${note._id}`} legacyBehavior> 
                    <a>{note.title}</a>
                  </Link>
                </Card.Header>
                
              </Card.Content>
              
              <Card.Content extra>
                <Link href={`/${note._id}`}>
                  <Button primary>View</Button>
                </Link>
                <Link href={`/${note._id}/edit`}>
                  <Button color='green'>Edit</Button>
                </Link>
              </Card.Content>
            </Card>
          </div>)
        })}
      </div>

    </div>
  )
}

Index.getInitialProps = async () => {
  
  const res = await fetch('http://localhost:3000/api/notes') ;
  const {data} = await res.json();

  return({notes: data})

}
