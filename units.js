
module.exports = function(){
    var express = require('express');
    var router = express.Router();

    function getUnits(res, mysql, context, complete){
        mysql.pool.query("SELECT UnitID, UnitName FROM Units", function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.units  = results;
            complete();
        });
    }
    
    router.get('/', function(req, res){
        var callbackCount = 0;
        var context = {};
        context.jsscripts = ["deleteUnits.js"];
        var mysql = req.app.get('mysql');
        getUnits(res, mysql, context, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 1){
                res.render('units', context);
            }

        }
    });
    router.post('/', function(req,res){
        var mysql = req.app.get('mysql');
        var sql = "INSERT INTO Units (UnitName) VALUES (?)";
        var inserts = [req.body.unitInput];
        sql = mysql.pool.query(sql, inserts, function(error, results, fields) {
            if(error) {
                console.log(JSON.stringify(error))
                res.write(JSON.stringify(error));
                res.end();
            }else {
                res.redirect('units');
            }
        });

    });

    router.delete('/:UnitID', function(req, res) {
        var mysql = req.app.get('mysql');
        var sql = "DELETE FROM Units WHERE UnitID = ?";
        var inserts = [req.params.UnitID];
        sql = mysql.pool.query(sql, inserts, function(error, results, fields) {
            if(error) {
                res.write(JSON.stringify(error));
                res.status(400);
                res.end();

            }else{
                res.status(202).end();
            }
        })
    })
    return router;
}();
