module.exports = function(){
    var express = require('express');
    var router = express.Router();

    function getCategories(res, mysql, context, complete) {
        mysql.pool.query("SELECT CategoryID, CategoryName FROM Category", function(error, results, fields) {
            if(error) {
                res.write(JSON.stringify(error));
                res.end();
            }
            context.categories = results;
            complete();
        });
    }

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

    function getRecipesWithCategories(res, mysql, context, complete){
        sql = "SELECT Category.CategoryID, Recipe.RecipeID, CategoryName AS 'Category', IFNULL (Recipe.RecipeTitle, '(No recipes available)') AS 'Title' FROM Category LEFT JOIN Recipe_Category ON Category.CategoryID = Recipe_Category.CategoryID LEFT JOIN Recipe ON Recipe_Category.RecipeID = Recipe.RecipeID ORDER BY Category.CategoryName";
         mysql.pool.query(sql, function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end()
            }
            context.recipes_categories = results;
            complete();
        });
    }

    router.get('/', function(req, res){
        var callbackCount = 0;
        var context = {};
        context.jsscripts = ["deleteCategory.js"];
        var mysql = req.app.get('mysql');
        //getCategories(res, mysql, context, complete);
        //getRecipes(res, mysql, context, complete);
        getRecipesWithCategories(res, mysql, context, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 1){
                res.render('recipes_categories', context);
            }

        }
    });

    router.post('/', function(req, res){
        //console.log("We get the multi-select category dropdown as ", req.body.cat)
        var mysql = req.app.get('mysql');
        var categories = req.body.CategoryID;
        var recipe = req.body.RecipeID;
        for (let CategoryID of categories) {
          var sql = "INSERT INTO Recipe_Category (RecipeID, CategoryID) VALUES (?,?)";
          var inserts = [recipe, categories];
          sql = mysql.pool.query(sql, inserts, function(error, results, fields){
            if(error){
                //TODO: send error messages to frontend as the following doesn't work
                res.write(JSON.stringify(error));
                res.end();
                console.log(error)
            }
          });
        } 
        res.redirect('/recipes_categories');
    });
  

    router.delete('/CategoryID/:CategoryID/rec/:RecipeID', function(req, res){
    console.log(req.params.CategoryID)
    console.log(req.params.RecipeID)
    var mysql = req.app.get('mysql');
    var sql = "DELETE FROM Recipe_Category WHERE CategoryID = ? AND RecipeID = ?";
    var inserts = [req.params.CategoryID, req.params.RecipeID];
    sql = mysql.pool.query(sql, inserts, function(error, results, fields){
        if(error){
            res.write(JSON.stringify(error));
            res.status(400); 
            res.end(); 
        }else{
            res.status(202).end();
            }
        })
    });

    return router;
}();