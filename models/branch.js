// Global
const orm = require("../config/orm.js");
// Tree
const branch = {
    select: function(cb){
        orm.selectAll("leaves",function(res){
            cb(res);
        });
    },
    delete: function(cols,vals,cb){
        orm.deleteFactories("leaves",cols,vals,function(res){
            cb(res);
        });
    },
    create: function(cols,vals,cb){
        orm.insertFactories("leaves",cols,vals,function(res){
            cb(res);
        });
    }
};
// Export Burger
module.exports = branch;