// Global
require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const Branch = require("./models/tree.js");
const Leaf = require("./models/branch.js");
const app = express();
const router = express.Router();
const PORT = process.env.PORT || 8080;
const http = require('http').Server(app);
const io = require('socket.io')(http);
// Config Settings
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public'));
// Route
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});
// Socket
io.on('connection',function(socket){
    console.log('a user connected');
    socket.on('getBranches',function(){
        Branch.selectAll(function(parentData){
            Leaf.select(function(childData){
                for(var i = 0; i < parentData.length; i++){
                    parentData[i].childrenData = [];
                    for(var x = 0; x < childData.length; x++){
                        if(parentData[i].branch_id === childData[x].branch_id){
                            parentData[i].childrenData.push({
                                leaf_number: childData[x].leaf_number
                            });
                        }
                    }
                }
                io.emit('getBranches',parentData);
            });
        });
    })
    socket.on('createBranch',function(branch){
        Branch.create(["branch_name"],[branch],function(result){
            Branch.selectAll(function(parentData){
                Leaf.select(function(childData){
                    for(var i = 0; i < parentData.length; i++){
                        parentData[i].childrenData = [];
                        for(var x = 0; x < childData.length; x++){
                            if(parentData[i].branch_id === childData[x].branch_id){
                                parentData[i].childrenData.push({
                                    leaf_number: childData[x].leaf_number
                                });
                            }
                        }
                    }
                    io.emit('getBranches',parentData);
                });
            });
        });
    })
    socket.on('deleteBranch',function(branchId){ 
        Leaf.delete(["branch_id"],[branchId],function(result){
            Branch.delete(["branch_id"],[branchId],function(result){
                Branch.selectAll(function(parentData){
                    Leaf.select(function(childData){
                        for(var i = 0; i < parentData.length; i++){
                            parentData[i].childrenData = [];
                            for(var x = 0; x < childData.length; x++){
                                if(parentData[i].branch_id === childData[x].branch_id){
                                    parentData[i].childrenData.push({
                                        leaf_number: childData[x].leaf_number
                                    });
                                }
                            }
                        }
                        io.emit('getBranches',parentData);
                    });
                });
            })
        });
    });
    socket.on('updateBranch',function(branch,branchId){
        Branch.update({ 'branch_name': `'${branch}'` },`branch_id = ${branchId}`,function(data){
            Branch.selectAll(function(parentData){
                Leaf.select(function(childData){
                    for(var i = 0; i < parentData.length; i++){
                        parentData[i].childrenData = [];
                        for(var x = 0; x < childData.length; x++){
                            if(parentData[i].branch_id === childData[x].branch_id){
                                parentData[i].childrenData.push({
                                    leaf_number: childData[x].leaf_number
                                });
                            }
                        }
                    }
                    io.emit('getBranches',parentData);
                });
            });
        });
    });
    socket.on('createLeaves',function(branchId,rangeStart,rangeEnd,numberOfChildren){
        Leaf.delete(["branch_id"],[branchId],function(result){
            var min = Math.ceil(rangeStart);
            var max = Math.floor(rangeEnd);        
            var body = [];
            if(numberOfChildren > 15){
                numberOfChildren = 15;
            }
            for(var i = 0; i < numberOfChildren; i++){
                var randomNumber = parseInt(Math.floor(Math.random() * (max - min + 1)) + min);
                body.push([ branchId, randomNumber ])
            }
            Branch.update({ "branch_range_start": rangeStart,"branch_range_end": rangeEnd, "children":numberOfChildren },`branch_id = ${branchId};`,function(result){
                Leaf.create([ "branch_id","leaf_number" ],body,function(result){
                    Branch.selectAll(function(parentData){
                        Leaf.select(function(childData){
                            for(var i = 0; i < parentData.length; i++){
                                parentData[i].childrenData = [];
                                for(var x = 0; x < childData.length; x++){
                                    if(parentData[i].branch_id === childData[x].branch_id){
                                        parentData[i].childrenData.push({
                                            leaf_number: childData[x].leaf_number
                                        });
                                    }
                                }
                            }
                            io.emit('getBranches',parentData);
                        });
                    });
                }); 
            }); 
        })
    });
    socket.on('disconnect',function(){
        console.log('user disconnected');
    });
});
// Listener
http.listen(PORT,function(){
    console.log(`App now listening at localhost: ${PORT}`);
});
