
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

    function getCourses(res, mysql, context, complete) {
        mysql.pool.query("SELECT CourseID, CourseName FROM Courses", function(error, results, fields) {
            if(error) {
                res.write(JSON.stringify(error));
                res.end();
            }
            context.courses = results;
            complete();
        });
    }

    function getAuthors(res, mysql, context, complete) {
        mysql.pool.query("SELECT AuthorID, FirstName, LastName, Email FROM Author", function(error, results, fields) {
            if(error) {
                res.write(JSON.stringify(error));
                res.end();
            }
            context.authors = results;
            complete();
        });
    }

    function getRecipes(res, mysql, context, complete){
        mysql.pool.query("SELECT RecipeID, RecipeTitle, CookingTime, Servings, AuthorID, CourseID FROM Recipe", function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.recipes  = results;
            complete();
        });
    }

   function getRecipe (res, mysql, context, RecipeID, complete) {
        var sql = "SELECT Recipe.RecipeID, Recipe.RecipeTitle, Recipe.CookingTime, Recipe.Servings, Recipe.AuthorID, Recipe.CourseID, Courses.CourseName, concat(Author.FirstName, ' ', Author.LastName) as FullName FROM Recipe INNER JOIN Author on Recipe.AuthorID = Author.AuthorID INNER JOIN Courses on Recipe.CourseID - Courses.CourseID WHERE RecipeID=?";
        var inserts = [RecipeID];
        mysql.pool.query(sql, inserts, function(err, results, fields) {
            if (err) {
                res.write(JSON.stringify(err));
                res.end();
            }
            context.recipe = results[0];
            complete();
        });
    }
    
    function getIngredients (res, mysql, context, RecipeID, complete) {
        var sql = "SELECT Recipe.RecipeTitle, Ingredients.IngredientName, Recipe_Ingredients.QuantityOfIngredient, Units.UnitName FROM Recipe INNER JOIN Recipe_Ingredients ON Recipe.RecipeID = Recipe_Ingredients.RecipeID INNER JOIN Ingredients ON Recipe_Ingredients.IngredientID = Ingredients.IngredientID INNER JOIN Units ON Ingredients.UnitID = Units.UnitID WHERE Recipe.RecipeID=?";
        var inserts = [RecipeID];
        mysql.pool.query(sql, inserts, function(err, results, fields) {
            if (err) {
                res.write(JSON.stringify(err));
                res.end();
            }
            context.ingredients = results;
            complete();
        });
    }

    router.get('/', function(req, res){
        var callbackCount = 0;
        var context = {};
        context.jsscripts = ["updateRecipe.js", "deleteRecipe.js"];
        var mysql = req.app.get('mysql');
        getCategories(res, mysql, context, complete);
        getRecipes(res, mysql, context, complete);
        getAuthors(res, mysql, context, complete);
        getCourses(res, mysql, context, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 4){
                res.render('recs', context);
            }

        }
    });

    router.post('/', function(req,res){
        var mysql = req.app.get('mysql');
        var sql = "INSERT INTO Recipe (RecipeTitle, CookingTime, Servings, AuthorID, CourseID) VALUES (?, ?, ?, ?, ?)";
        var inserts = [req.body.inputTitle, req.body.inputTime, req.body.inputServings, req.body.inputAuthor, req.body.inputCourse];
        sql = mysql.pool.query(sql, inserts, function(error, results, fields) {
            if(error) {
                console.log(JSON.stringify(error))
                res.write(JSON.stringify(error));
                res.end();
            }else {
                
                var sql = "INSERT INTO Recipe_Category (RecipeID, CategoryID) VALUES (?, ?)";
                var inserts = [results.insertId, req.body.inputCategory];
                sql = mysql.pool.query(sql, inserts, function(error, results, fields) {
                    if(error) {
                        console.log(JSON.stringify(error))
                        res.write(JSON.stringify(error));
                        res.end();
                    }else {
                        //console.log("The last inserted ID is" + results.insertId);

                    }
                });
                console.log("The last inserted ID is" + results.insertId);
                res.redirect('recipes');
            }
        });

    });
/*
     router.get('/:RecipeID', function(req, res) {
        callbackCount = 0;
        var context = {};
        var mysql = req.app.get('mysql');
        getRecipes(res, mysql, context, complete);
        getIngredients(res, mysql, context, req.params.RecipeID, complete);
        function complete(){
            callbackCount++;
            if (callbackCount >= 2) 
            {
                res.render('ingredientlist', context);
            }
        }
    });
*/
    router.get('/:RecipeID', function(req, res) {
        callbackCount = 0;
        var context = {};
        context.jsscripts = ["ingredientlist.js"];
        var mysql = req.app.get('mysql');
        //getRecipe(res, mysql, context, req.params.RecipeID, complete);
        //getCategories(res, mysql, context, complete);
        //getAuthors(res, mysql, context, complete);
        //getCourses(res, mysql, context, complete);
        getIngredients(res, mysql, context, req.params.RecipeID, complete);
        function complete(){
            callbackCount++;
            if (callbackCount >= 1) 
            {
                res.render('ingredientlist', context);
            }
        }
    });

    router.put('/:RecipeID', function(req, res){
        var mysql = req.app.get('mysql');
        var sql = "UPDATE Recipe SET RecipeTitle=?, CookingTime=?, Servings=?, CourseID=?, AuthorID=? WHERE RecipeID=?";
        var inserts = [req.body.inputTitle, req.body.inputTime, req.body.inputServings, req.body.inputCourse, req.body.inputAuthor, req.params.RecipeID];
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

    router.delete('/:RecipeID', function(req, res) {
        var mysql = req.app.get('mysql');
        var sql = "DELETE FROM Recipe WHERE RecipeID = ?";
        var inserts = [req.params.RecipeID];
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
