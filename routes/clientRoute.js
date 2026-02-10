import express from 'express'
import Client from '../models/client.js'

const router = express.Router()

router.get('/', async (req, res)=>{
    try{
        const clients = await Client.find(req.query)
        if(clients.length == 0) return res.status(404).json({message: 'no clients found'}) 
        res.json(clients)
    }catch(err){
        console.log(err);
        res.status(500).json({message: err})
    }
})

router.get('/:id', async (req, res)=>{
    try{
        const id = req.params.id
        const client = await Client.findById(id)
        if(!client) return res.status(404).json({message: 'client not found'})
        res.json(client)
    }catch(err){
        console.log(err);
        res.status(500).json({message: err})
    }
})

router.post('/', async (req, res)=>{
    try{
        const client = new Client({...req.body})
        await client.save()
        res.status(201).json(client)
    }catch(err){
        console.log(err);
        res.status(500).json({message: err})
    }
})

router.put('/:id', async (req, res)=>{
    try{
        const id = req.params.id
        const client = await Client.findByIdAndUpdate(id, req.body, {new: true})
        if(!client) return res.status(404).json({message: 'client not found'})
        res.json(client)
    }catch(err){
        console.log(err);
        res.status(500).json({message: err})
    }
})

router.delete('/:id', async (req, res)=>{
    try{
        const id = req.params.id
        const client = await Client.findByIdAndDelete(id)
        if(!client) return res.status(404).json({message: 'client not found'})
        res.json({message: 'client deleted'})
    }catch(err){
        console.log(err);
        res.status(500).json({message: err})
    }
})

export default router