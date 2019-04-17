function updateAuthor(AuthorID){
    $.ajax({
        url: '/authors/' + AuthorID,
        type: 'PUT',
        data: $('#updateAuthor').serialize(),
        success: function(result){
            window.location.replace("./");
        }
    })
};