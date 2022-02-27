loadCategories(pageCategoryFlag,pageCategoryId);
function loadCategories(flag,category_id = null)
          {
           let api = new Api();
           pageCategoryId = category_id;
           pageProductFlag = flag;
           if(category_id)
             $('#btn-back').css('display','block');
           else
             $('#btn-back').css('display','none');
           let response = api.getCategories(flag,category_id);
           response.done(function(data,status){
               let parent = data['data']['parent'];
               if(parent)
               {
                   $('#btn-back').attr('data-id',parent.showParent_id);
               }
               let categories = data['data']['categories'];
               var table = document.getElementById('category-table');
               table.innerHTML = '';
               for(key in categories)
               {
                  var category = categories[key];
                  var tr = document.createElement('TR');
                  if(category.count_showSubCat > 0)
                    tr.className = 'has-subCat';
                  else
                  {
                    tr.className = 'page-links';
                    tr.setAttribute('data-url',`/services?category_id=${category.id}`);
                  }
                  tr.setAttribute('data-id',category.id);
                  tr.setAttribute('data-parentId',category.showParent_id);
                  th = document.createElement('TH');
                  var span = document.createElement('SPAN');
                  span.innerHTML = category.name;
                  th.appendChild(span);
                  span = document.createElement('SPAN');
                  span.className = 'fa fa-angle-left arrow';
                  th.appendChild(span);
                  tr.appendChild(th);
                  table.appendChild(tr);
               }
           });
           response.fail(function(jqXHR, textStatus, errorThrown){
               Notiflix.Notify.Failure('حطا در ارتباط', {cssAnimationStyle:'zoom', cssAnimationDuration:500,});
           });
}



