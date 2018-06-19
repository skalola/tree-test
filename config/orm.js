// Global
const connection = require("./connection.js");

// Print Question Marks
function printQuestionMarks(num){
    var arr = [];
    for (var i = 0; i < num; i++){
        arr.push("?");
    }
    return arr.toString();
};
// Object to SQL
function objToSql(ob){
    var arr = [];
    for(var key in ob){
        var value = ob[key];
        if(Object.hasOwnProperty.call(ob,key)){
            if(typeof value === "string" && value.indexOf(" ") >= 0){
                value = "'" + value + "'";
            }
            arr.push(key + "=" + value);
        }
    }
    return arr.toString();
};
// Orm
const orm = {
    selectAll: function(table,cb){
        var queryString = `SELECT * FROM ${table};`;
        connection.query(queryString,function(err,result){
            if(err){
                throw err
            };
            cb(result);
        });
    },
    insertBranch: function(table,cols,vals,cb){
        var queryString = `INSERT INTO ${table}(${cols.toString()}) VALUES(${printQuestionMarks(vals.length)});`;
        connection.query(queryString,vals,function(err,result){
        if(err){
            throw err;
        }
          cb(result);
        });
    },
    deleteBranch: function(table,cols,vals,cb){
        var queryString = `DELETE FROM ${table} WHERE ${cols.toString()} = ${printQuestionMarks(vals.length)};`;
        connection.query(queryString,vals,function(err,result){
        if(err){
            throw err;
        }
          cb(result);
        });
    },
    updateBranch: function(table,objColVals,condition,cb){
        var queryString = `UPDATE ${table} SET ${objToSql(objColVals)} WHERE ${condition};`;
        connection.query(queryString,function(err,result){
            if(err){
                throw err
            };
            cb(result);
        });
    },
    insertFactories: function(table,cols,vals,cb){
        var queryString = `INSERT INTO ${table}(${cols.toString()}) VALUES ?;`;
        connection.query(queryString,[vals],function(err,result){
            if(err){
                throw err;
            }
            cb(result);
        });
    },
    deleteFactories: function(table,cols,vals,cb){
        var queryString = `DELETE FROM ${table} WHERE ${cols.toString()} = ${printQuestionMarks(vals.length)};`;
        connection.query(queryString,vals,function(err,result){
        if(err){
            throw err;
        }
          cb(result);
        });
    }
};
// Export Orm
module.exports = orm;