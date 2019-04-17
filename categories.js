
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
    
    router.get('/', function(req, res){
        var callbackCount = 0;
        var context = {};
        var mysql = req.app.get('mysql');
        getCategories(res, mysql, context, complete);
        getRecipes(res, mysql, context, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 2){
                res.render('categories', context);
            }

        }
    });

    router.post('/', function(req,res){
        var mysql = req.app.get('mysql');
        var sql = "INSERT INTO Category (CategoryName) VALUES (?)";
        var inserts = [req.body.catInput];
        sql = mysql.pool.query(sql, inserts, function(error, results, fields) {
            if(error) {
                console.log(JSON.stringify(error))
                res.write(JSON.stringify(error));
                res.end();
            }else {
                res.redirect('categories');
            }
        });

    });

    router.delete('/:CategoryID', function(req, res) {
        var mysql = req.app.get('mysql');
        var sql = "DELETE FROM Category WHERE CategoryID = ?";
        var inserts = [req.params.CategoryID];
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
