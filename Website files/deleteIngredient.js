function deleteIngredient(IngredientID){
    var confirmDelete = confirm("Are you sure you want to delete this Ingredient?");
    if(confirmDelete){
        $.ajax({
            url: '/ingredients/'+ IngredientID,
            type: 'DELETE',
            success: function(result){
                window.location.reload(true);
            }
        });
    }
};