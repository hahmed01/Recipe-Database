function deleteUnits(UnitID){
    var confirmDelete = confirm("Are you sure you want to delete this Unit?");
    if(confirmDelete){
        $.ajax({
            url: '/units/'+ UnitID,
            type: 'DELETE',
            success: function(result){
                window.location.reload(true);
            }
        });
    }
};