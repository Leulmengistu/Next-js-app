import Link from 'next/link';
import {useState, useEffect} from 'react';
import fetch from 'isomorphic-unfetch';
import {Button, Form, Loader} from 'semantic-ui-react';
import {useRouter} from 'next/router';

const NewNote = () => {

    const [form, setForm] = useState({title: '', description: ''})
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errors, setErrors] = useState({})
    const router = useRouter();


    useEffect(() => {
        if (isSubmitting) {
            if (Object.keys(errors).length === 0) {
                createNote();
            }
            else {
                setIsSubmitting(false);
            }
        }
    }, [errors])

   const createNote = async () => {
        
        try{
            const res = await fetch('http://localhost:3000/api/notes',{
                method: "POST",
                headers: {
                    "Accept": "application/json",
                  "Content-Type": "application/json"
                },
                body: JSON.stringify(form)   
            })
            console.log("submitted successfully: ", res)
            router.push("/")
            // setIsSubmitting(false)

        }catch(error){ 
            console.log("Error: ", error)
        }


   }

    const handleChange = (e)=>{
        console.log("The target name is: " ,e.target.name)
            setForm({
                ...form,[e.target.name]: e.target.value
            })
            
    
    }

    const handleSubmit = (e)=>{
            e.preventDefault();
            let errs = validate();
            setErrors(errs);
            setIsSubmitting(true);

    }

    const validate = () =>{
        let err = {};

        if(!form.title){
            err.title = "Title is required";
        }
        if(!form.description){
            err.description = 'Description is required'
        }
        return err;
    }

    return(
        <div className='form-container'>
            <h1>
                Create Note
            </h1>
            <div>
                {isSubmitting ? 
                <Loader active inline='centered'/> :
                <Form onSubmit={handleSubmit}>
                    <Form.Input 
                        fluid='true'
                        label="Title"
                        error={errors.title}
                        name = "title"
                        value={form.title}
                        onChange={handleChange}
                    />
                    <Form.TextArea 
                        fluid='true'
                        label="Description"
                        error={errors.description}
                        name = "description"
                        value={form.description}
                        onChange={handleChange}
                    />
                    <Button type='submit'>Create</Button>
                </Form>
                }
            </div>
        </div>
    )

}

export default NewNote

