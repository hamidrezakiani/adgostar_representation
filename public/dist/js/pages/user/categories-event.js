if(!categoriesPageScript)
{
    categoriesPageScript = true;

    $(document).on('click','.has-subCat',function(){
       var id = $(this).attr('data-id');
       loadCategories('subCats',id);
    });

    $(document).on('click','#btn-back',function(){
       var id = $(this).attr('data-id');
       if(id != null)
        loadCategories('subCats',id);
       else
        loadCategories('parents');
    });

}
