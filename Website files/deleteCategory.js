 function deleteCategory(CategoryID, RecipeID) {
  var confirmDelete = confirm("Are you sure you want to delete this relationship?");
  if(confirmDelete) {
  $.ajax({
      url: '/recipes_categories/CategoryID/' + CategoryID + '/rec/' + RecipeID,
      type: 'DELETE',
      success: function(result){
          if(result.responseText != undefined){
            alert(result.responseText)
          }
          else {
            window.location.reload(true)
          } 
      }
  })
}
};