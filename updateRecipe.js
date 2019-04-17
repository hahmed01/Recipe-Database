function updateRecipe(RecipeID){
    $.ajax({
        url: '/recipes/' + RecipeID,
        type: 'PUT',
        data: $('#updateRecipe').serialize(),
        success: function(result){
            window.location.replace("./");
        }
    })
};