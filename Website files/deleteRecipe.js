function deleteRecipe(RecipeID){
    var confirmDelete = confirm("Are you sure you want to delete this Recipe?");
    if(confirmDelete){
        $.ajax({
            url: '/recipes/'+ RecipeID,
            type: 'DELETE',
            success: function(result){
                window.location.reload(true);
            }
        });
    }
};