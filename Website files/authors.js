
module.exports = function(){
    var express = require('express');
    var router = express.Router();
    
    function getAuthors(res, mysql, context, complete) {
        mysql.pool.query("SELECT * FROM Author", function(error, results, fields) {
            if(error) {
                res.write(JSON.stringify(error));
                res.end();
            }
            context.authors = results;
            complete();
        });
    }

    function getAuthor (res, mysql, context, AuthorID, complete) {
        var sql = "SELECT * FROM Author WHERE AuthorID=?";
        var inserts = [AuthorID];
        mysql.pool.query(sql, inserts, function(err, results, fields) {
            if (err) {
                res.write(JSON.stringify(err));
                res.end();
            }
            context.authors = results[0];
            complete();
        });
    }
    
    router.get('/', function(req, res){
        var callbackCount = 0;
        var context = {};
        context.jsscripts = ["deleteAuthor.js", "updateAuthor.js"];
        var mysql = req.app.get('mysql');
        getAuthors(res, mysql, context, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 1){
                res.render('authors', context);
            }

        }
    });

    router.post('/', function(req,res){
        var mysql = req.app.get('mysql');
        var sql = "INSERT INTO Author (FirstName, LastName, Email) VALUES (?,?,?)";
        var inserts = [req.body.fnameInput, req.body.lnameInput, req.body.emailInput];
        sql = mysql.pool.query(sql, inserts, function(error, results, fields) {
            if(error) {
                console.log(JSON.stringify(error))
                res.write(JSON.stringify(error));
                res.end();
            }else {
                res.redirect('authors');
            }
        });

    });

    router.get('/:AuthorID', function(req, res) {
        callbackCount = 0;
        var context = {};
        context.jsscripts = ["updateAuthor.js"];
        var mysql = req.app.get('mysql');
        getAuthor(res, mysql, context, req.params.AuthorID, complete);
        function complete(){
            callbackCount++;
            if (callbackCount >= 1) 
            {
                res.render('updateAuthor', context);
            }
        }
    });
    
    router.put('/:AuthorID', function(req, res){
        var mysql = req.app.get('mysql');
        var sql = "UPDATE Author SET FirstName=? , LastName=?, Email=? WHERE AuthorID=?";
        var inserts = [req.body.fnameInput, req.body.lnameInput, req.body.emailInput, req.params.AuthorID];
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

    router.delete('/:AuthorID', function(req, res) {
        var mysql = req.app.get('mysql');
        var sql = "DELETE FROM Author WHERE AuthorID = ?";
        var inserts = [req.params.AuthorID];
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
