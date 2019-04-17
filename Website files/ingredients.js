
module.exports = function(){
    var express = require('express');
    var router = express.Router();
    
    function getIngredients(res, mysql, context, complete) {
        mysql.pool.query("SELECT Ingredients.IngredientID, Ingredients.IngredientName, Ingredients.UnitID, Units.UnitName FROM Ingredients INNER JOIN Units ON Ingredients.UnitID = Units.UnitID ORDER BY Ingredients.IngredientID", function(error, results, fields) {
            if(error) {
                res.write(JSON.stringify(error));
                res.end();
            }
            context.ingredients = results;
            complete();
        });
    }
    
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
        context.jsscripts = ["deleteIngredient.js"];
        var mysql = req.app.get('mysql');
        getIngredients(res, mysql, context, complete);
        getUnits(res, mysql, context, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 2){
                res.render('ingredients', context);
            }

        }
    });

    router.post('/', function(req,res){
        var mysql = req.app.get('mysql');
        var sql = "INSERT INTO Ingredients (IngredientName, UnitID) VALUES (?,?)";
        var inserts = [req.body.ingredientInput, req.body.units];
        sql = mysql.pool.query(sql, inserts, function(error, results, fields) {
            if(error) {
                console.log(JSON.stringify(error))
                res.write(JSON.stringify(error));
                res.end();
            }else {
                res.redirect('ingredients');
            }
        });

    });

        router.put('/:IngredientID', function(req, res){
        var mysql = req.app.get('mysql');
        console.log(req.body)
        console.log(req.params.IngredientID)
        var sql = "UPDATE Ingredients SET FirstName=?, LastName=?, Email=? WHERE IngredientID=?";
        var inserts = [req.body.fnameInput, req.body.lnameInput, req.body.emailInput, req.params.IngredientID];
        sql = mysql.pool.query(sql,inserts,function(error, results, fields){
            if(error){
                console.log(error)
                res.write(JSON.stringify(error));
                res.end();
            }else{
                res.status(200);
                res.end();
            }
        });
    });

    router.delete('/:IngredientID', function(req, res) {
        var mysql = req.app.get('mysql');
        var sql = "DELETE FROM Ingredients WHERE IngredientID = ?";
        var inserts = [req.params.IngredientID];
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
