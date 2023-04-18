import dbConnect from '../../../../utils/dbconnect';
const Note = require("../../../../models/note");

dbConnect();

export default async (req, res) => {
    
    const { method } = req;
    console.log("Backend req: ",method)
    console.log("URI : ", req.url)

    switch (method) {
        case 'GET':
            try {
                
                const notes = await Note.find({});
                res.status(200).json({ success: true, data: notes })
            } catch (error) {
                
                res.status(400).json({ success: false });
            }
            break;
        case 'POST':
            try {
                console.log("I did my job bro : ", req.body)
                const note = await Note.create(req.body);
                
                res.status(201).json({ success: true, data: note })
            } catch (error) {
                res.status(400).json({ success: false });
            }
            break;
        default:
            res.status(400).json({ success: false });
            break;
    }
}