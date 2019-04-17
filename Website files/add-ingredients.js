
module.exports = function(){
    var express = require('express');
    var router = express.Router();


    function getRecipes(res, mysql, context, complete){
        mysql.pool.query("SELECT RecipeID, RecipeTitle FROM Recipe", function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.recipes  = results;
            complete();
        });
    }
    
    function getIngredients(res, mysql, context, complete){
        mysql.pool.query("SELECT Ingredients.IngredientID, Ingredients.IngredientName, Units.UnitName FROM Ingredients INNER JOIN Units ON Ingredients.UnitID = Units.UnitID", function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.ingredients = results;
            complete();
        });
    }

    function getRecIng(res, mysql, context, complete) {
        mysql.pool.query("SELECT Recipe.RecipeTitle, Ingredients.IngredientName, Recipe_Ingredients.QuantityOfIngredient, Units.UnitName FROM Recipe_Ingredients INNER JOIN Recipe ON Recipe.RecipeID = Recipe_Ingredients.RecipeID INNER JOIN Ingredients ON Ingredients.IngredientID = Recipe_Ingredients.IngredientID INNER JOIN Units ON Units.UnitID = Ingredients.UnitID", function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.recIng = results;
            complete();
        });
    }
    router.get('/', function(req, res){
        var callbackCount = 0;
        var context = {};
        var mysql = req.app.get('mysql');
        
        getRecipes(res, mysql, context, complete);
        getIngredients(res, mysql, context, complete);
        getRecIng(res, mysql, context, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 3){
                res.render('add-ingredients', context);
            }

        }
    });

    router.post('/', function(req,res){
        var mysql = req.app.get('mysql');
        var sql = "INSERT INTO Recipe_Ingredients (RecipeID, IngredientID, QuantityOfIngredient) VALUES (?, ?, ?)";
        var inserts = [req.body.chooseRecipe, req.body.chooseIngredient, req.body.inputQuantity];
        sql = mysql.pool.query(sql, inserts, function(error, results, fields) {
            if(error) {
                console.log(JSON.stringify(error))
                res.write(JSON.stringify(error));
                res.end();
            }else {
                res.redirect('add-ingredients');
            }
        });

    });

    

    return router;
}();
