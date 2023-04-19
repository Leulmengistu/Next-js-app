import fetch from 'isomorphic-unfetch';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Confirm, Button, Loader } from 'semantic-ui-react';

const Note = ({note}) => {
    const [confirm, setConfirm] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const router = useRouter()

    useEffect(
        
        ()=>{
            if(isDeleting){
                deleteNote();
                router.push("/")  
            }
            
        },[isDeleting]

    )

    const open = () => {
        setConfirm(true);
    }

    const close = () => {
        setConfirm(false);
    }

    const handleDelete = async () => {

        setIsDeleting(true);
        close();
        
    }

    const deleteNote = async () => {

        const noteID = router.query.id;
        try{
           const deleted =await fetch(`http://localhost:3000/api/notes/${noteID}`,
            {
                method: 'DELETE'

            }).then(()=>console.log("Deleted Successfuly")).catch(err=>{console.log("Error: ",err)})
        }catch(err){console.log("Error: ",err)}
    }


  return(
    <div className="note-container">
        {isDeleting ?
            <Loader active />
            :
            <div className='note-card-holder'>
                <div className='note-card'>
                    <h1>{note.title}</h1>
                    <p>{note.description}</p>
                    
                </div>
                <Button color='red' onClick={open}>Delete</Button>
            </div>
        }

        <Confirm
            open={confirm}
            onCancel={close}
            onConfirm={handleDelete}
            content={`Are you sure you want to delete ${note.title} note? `}
            header={`Delete ${note.title}?`}
        />
        
    </div>
  )
}

Note.getInitialProps = async ({ query: { id } }) => {
    try{
    const res = await fetch(`http://localhost:3000/api/notes/${id}`)
    const {data} = await res.json()
    return ({note: data})
    }catch(err){console.log("Error: ",err)}
}

export default Note;