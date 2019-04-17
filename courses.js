
module.exports = function(){
    var express = require('express');
    var router = express.Router();

    function getCourses(res, mysql, context, complete){
        mysql.pool.query("SELECT CourseID, CourseName FROM Courses", function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.courses  = results;
            complete();
        });
    }
    
    router.get('/', function(req, res){
        var callbackCount = 0;
        var context = {};
        var mysql = req.app.get('mysql');
        getCourses(res, mysql, context, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 1){
                res.render('courses', context);
            }

        }
    });

    router.post('/', function(req,res){
        var mysql = req.app.get('mysql');
        var sql = "INSERT INTO Courses (CourseName) VALUES (?)";
        var inserts = [req.body.courseInput];
        sql = mysql.pool.query(sql, inserts, function(error, results, fields) {
            if(error) {
                console.log(JSON.stringify(error))
                res.write(JSON.stringify(error));
                res.end();
            }else {
                res.redirect('courses');
            }
        });

    });

    return router;
}();
