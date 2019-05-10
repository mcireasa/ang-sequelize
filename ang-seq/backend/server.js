const express = require('express');
const bodyParser  = require('body-parser');
const cors = require('cors');
const Sequelize = require('sequelize');
const Issue = require('./models/Issue');


//Database
const db = require('./config/database');

const app = express();
const router = express.Router();
app.use(cors());
app.use(bodyParser.json());


app.get('/issues' ,async (req, res)=>{
    try{
        const issues = await Issue.findAll();
        res.status(200).json(issues);
    }catch(e){
        console.warn(e);
        res.status(500).json({message: 'server error'})
    }
}) 

app.get('/issues/:id' , async (req, res)=>{
    try{
        const issue = await Issue.findOne({ where: {id: req.params.id} });
        res.status(200).json(issue);
    }catch(e){
        console.warn(e)
        res.status(500).json({message: 'cannot retrieve item'});
    }
})


app.put('/issues/update/:id', async (req,res)=>{
    try{
        const issue = await Issue.findOne({ where: {id: req.params.id} });
    
        if(issue){
            await issue.update(req.body);
            res.status(202).json({message: "record updated"});
        }
        
    }catch(e){
        console.warn(e)
        res.status(404).json({message: 'record update failed'});
    }
})


app.post('/issues/add', async (req,res)=>{
    try{
        const issue = {
            title: req.body.title,
            description: req.body.description,
            responsable: req.body.responsable,
            severity: req.body.severity,
            status: req.body.status
        }
      
        await Issue.create(issue);
        res.status(201).json({message: 'list created '});
    }catch(e){
        console.warn(e)
        res.status(500).json({message: 'server error'});
    }
})

app.delete('/issues/delete/:id', async(req,res)=>{
    try{
        const issue = await Issue.findOne({ where: {id: req.params.id} });
        if(issue){
            await issue.destroy();
            res.status(202).json({message: 'record deleted'});
        }

    }catch(e){
        console.warn(e)
        res.status(500).json({message: 'record could not be deleted!'})
    }
})




app.use('/', router);

const PORT =  3000;

app.listen(PORT, ()=>{
    console.log(`Server started on ${PORT}`);
})
