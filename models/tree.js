// Global
const orm = require("../config/orm.js");
// Tree
const tree = {
    selectAll: function(cb){
        orm.selectAll("branches",function(res){
            cb(res);
        });
    },
    delete: function(cols,vals,cb){
        orm.deleteBranch("branches",cols,vals,function(res){
            cb(res);
        });
    },
    create: function(cols,vals,cb){
        orm.insertBranch("branches",cols,vals,function(res){
            cb(res);
        });
    },
    update: function(objColVals,condition,cb){
        orm.updateBranch("branches",objColVals,condition,function(res){
            cb(res);
        });
    }
};
// Export Burger
module.exports = tree;