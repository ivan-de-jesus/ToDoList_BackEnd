const express = require('express');
const responses = require('../../red/responses');
const controller = require('./controller');

const router = express.Router();

router.get("/", getAll);
router.get("/:id", get);
router.get("/:status", getByStatus);
router.delete("/", deleteTask);
router.post("/", add);

 async function getAll (req, res, next){
    try{
        const items = await controller.getAll();
        responses.success(req, res, items, 200); 
    }catch(err){
        next(err);
    }   
};

 async function getByStatus (req, res, next){
    try{
        const items = await controller.getByStatus(req.params.task_status);
        responses.success(req, res, items, 200); 
    }catch(err){
        next(err);
    }
};
async function get (req, res, next){
    try{
        const items = await controller.get(req.params.id);
        responses.success(req, res, items, 200); 
    }catch(err){
        next(err);
    }
};

async function add (req, res, next){
    try{
        const items = await controller.add(req.body);
        if(req.body.id == 0){
            message = 'Item Saved Successfully'
                
        }else{
            message = 'Item Updated Successfully'
        }
        responses.success(req, res, message, 201); 
    }catch(err){
        next(err);
    } 
};

async function deleteTask (req, res, next){
    try{
        const items = await controller.deleteTask(req.body);
        responses.success(req, res, 'Successfully Deleted Item', 200); 
    }catch(err){
        next(err);
    } 
};

module.exports = router;