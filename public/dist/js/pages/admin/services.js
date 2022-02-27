// $('.nav-link').removeClass('active');
// $('.nav-item').removeClass('menu-open');
// $('.nav-treeview').css('display','none');
// $('#group-product-sidebar').addClass('active');
// $('#list-product-sidebar').addClass('active');
// $('#group-product-menu-open').addClass('menu-open');

// const { snakeCase } = require("lodash");

// $('#group-product-menu-open ul').css('display','block');
loadServices(pageProductFlag,pageCategoryId);
// setPageRoutes(pageCategoryId);

function loadServices(flag,category_id = null)
          {
           let api = new AdminApi();
           pageCategoryId = category_id;
           pageProductFlag = flag;
           let response = api.getServices(flag,category_id);
           response.done(function(data,status){
               let services = data['data']['products'];
               console.log(services);
               var table = document.getElementById('service-table');
               table.innerHTML = '';
               for(key in services)
               {
                  var service = services[key];
                  var tr = document.createElement('TR');
                  td = document.createElement('TD');
                  td.setAttribute('rowspan',services[key].items.length);
                  td.classList.add('service-name');
                  td.setAttribute('data-id',service.id);
                  td.innerHTML = service.name;
                  tr.appendChild(td);
                  td = document.createElement('TD');
                  td.setAttribute('rowspan',service.items.length);
                  td.classList.add('service-categoryName');
                  td.setAttribute('data-id',service.id);
                  td.innerHTML = service.categoryName;
                  tr.appendChild(td);
                  td = document.createElement('TD');
                  td.classList.add('product-items');
                  td.innerHTML = service.items[0].name;
                  td.setAttribute('data-id',service.items[0].id);
                  tr.appendChild(td);
                  td = document.createElement('TD');
                  td.classList.add('item-operator');
                  var button = document.createElement('BUTTON');
                  button.className = 'btn btn-info operator setCost';
                  button.setAttribute('data-id',service.items[0].id);
                  button.innerHTML = 'قیمت دهی';
                  td.appendChild(button);
                  tr.appendChild(td);
                  table.appendChild(tr);
                  if(service.items[0].id > 1)
                  {
                      items = service.items;
                      for(key in items)
                      {
                         if(key > 0)
                         {
                            item = items[key];
                            var tr = document.createElement('TR');
                            td = document.createElement('TD');
                            td.classList.add('product-items');
                            td.innerHTML = item.name;
                            td.setAttribute('data-id',item.id);
                            tr.appendChild(td);
                            td = document.createElement('TD');
                            td.classList.add('item-operator');
                            var button = document.createElement('BUTTON');
                            button.className = 'btn btn-info operator setCost';
                            button.setAttribute('data-id',item.id);
                            button.innerHTML = 'قیمت دهی';
                            td.appendChild(button);
                            tr.appendChild(td);
                            table.appendChild(tr);
                         }
                      }
                  }
               }
           });
           response.fail(function(jqXHR, textStatus, errorThrown){
               Notiflix.Notify.Failure('حطا در ارتباط', {cssAnimationStyle:'zoom', cssAnimationDuration:500,});
           });
}

function loadPeriods(item_id)
          {
           let api = new AdminApi();
           let response = api.getPeriods(item_id);
           response.done(function(data,status){
               let periods = data['data']['periods'];
               console.log(periods);
               var table = document.getElementById('period-table');
               table.innerHTML = '';
               for(key in periods)
                {
                  var period = periods[key];
                  var tr = document.createElement('TR');
                  /////////
                  var td = document.createElement('TD');
                  td.innerHTML = period.start;
                  tr.appendChild(td);
                  /////////
                  td = document.createElement('TD');
                  td.innerHTML = period.end;
                  tr.appendChild(td);
                  /////////////
                  td = document.createElement('TD');
                  td.innerHTML = period.baseCost;
                  td.setAttribute('data-id',period.id);
                  td.className = 'baseCost';
                  tr.appendChild(td);
                  ///////////
                  td = document.createElement('TD');
                  var input = document.createElement('INPUT');
                  input.setAttribute('type','number');
                  input.className = 'form-control user-profit-input';
                  input.setAttribute('data-id',period.id);
                  input.value = period.userCost;
                  td.appendChild(input);
                  tr.appendChild(td);
                  //////////
                  td = document.createElement('TD');
                  var span = document.createElement('SPAN');
                  span.innerHTML = Math.round(period.userProfit*100)/100;
                  span.setAttribute('data-value',Number.parseInt(period.userProfit*1000000)/1000000);
                  span.classList.add('user-profit');
                  span.setAttribute('data-id',period.id);
                  td.appendChild(span);
                  span = document.createElement('SPAN');
                  span.innerHTML = '%';
                  td.appendChild(span);
                  tr.appendChild(td);
                  //////////
                  td = document.createElement('TD');
                  var input = document.createElement('INPUT');
                  input.setAttribute('type','number');
                  input.className = 'form-control normal-representation-profit-input';
                  input.setAttribute('data-id',period.id);
                  input.value = period.normalRepresentationCost;
                  td.appendChild(input);
                  tr.appendChild(td);
                  /////////
                  td = document.createElement('TD');
                  var span = document.createElement('SPAN');
                  span.innerHTML = Math.round(period.normalRepresentationProfit*100)/100;
                  span.classList.add('normal-representation-profit');
                  span.setAttribute('data-id',period.id);
                  span.setAttribute('data-value',Number.parseInt(period.normalRepresentationProfit*1000000)/1000000);
                  td.appendChild(span);
                  span = document.createElement('SPAN');
                  span.innerHTML = '%';
                  td.appendChild(span);
                  tr.appendChild(td);
                  ////////
                  if(representationKind == 'SPECIAL')
                  {
                      td = document.createElement('TD');
                  var input = document.createElement('INPUT');
                  input.setAttribute('type','number');
                  input.className = 'form-control senior-representation-profit-input';
                  input.setAttribute('data-id',period.id);
                  input.value = period.seniorRepresentationCost;
                  td.appendChild(input);
                  tr.appendChild(td);
                  ////////
                  td = document.createElement('TD');
                  var span = document.createElement('SPAN');
                  span.innerHTML = Math.round(period.seniorRepresentationProfit*100)/100;
                  span.classList.add('senior-representation-profit');
                  span.setAttribute('data-id',period.id);
                  span.setAttribute('data-value',Number.parseInt(period.seniorRepresentationProfit*1000000)/1000000);
                  td.appendChild(span);
                  span = document.createElement('SPAN');
                  span.innerHTML = '%';
                  td.appendChild(span);
                  tr.appendChild(td);
                  }
                  else
                  {
                       td = document.createElement('TD');
                       var span = document.createElement('SPAN');
                       span.className = 'fa fa-exit';
                       td.appendChild(span);
                       tr.appendChild(td);
                  }
                  ////////
                  table.appendChild(tr);

               }
           });
           response.fail(function(jqXHR, textStatus, errorThrown){
               Notiflix.Notify.Failure('حطا در ارتباط', {cssAnimationStyle:'zoom', cssAnimationDuration:500,});
           });
}

function setPageRoutes(parent_id)
{
        let api = new Api();
        let response = api.getCategories('routes',parent_id);
        response.done(function(data,status){
            let routes = data['data'];
            var pageRoutes = document.getElementById('page-routes');
            $('#route-categories').nextAll().remove();
            for(key in routes)
            {
               var li = document.createElement('LI');
               li.className = 'breadcrumb-item';
               var a = document.createElement('A');
               a.innerHTML = routes[key].name;
               a.setAttribute('data-url',`/categories?parent=${routes[key].id}`);
               a.classList.add('page-links');
               li.appendChild(a);
               pageRoutes.appendChild(li);
           }

    var li = document.createElement('LI');
    li.className = 'breadcrumb-item';
    li.setAttribute('id','list-label');
    var a = document.createElement('A');
    a.innerHTML = 'لیست محصولات';
    li.appendChild(a);
    pageRoutes.appendChild(li);
        });
        response.fail(function(jqXHR, textStatus, errorThrown){
            $('#NotiflixLoadingWrap').remove();
            Notiflix.Notify.Failure('حطا در ارتباط', {cssAnimationStyle:'zoom', cssAnimationDuration:500,});
        });

}

function setCategoriesSelectOptions(element){
    let api = new Api();
    let select = document.createElement('SELECT');
    let response = api.getCategories('allowedProduct');
    select.classList.add('form-control');
    response.done(function(data,status){
        let categories = data['data']['categories'];
        let option1 = document.createElement('OPTION');
        option1.innerHTML = 'انتخاب کنید';
        select.appendChild(option1);
        for(key in categories)
        {
            var item = categories[key];
            let option = document.createElement('OPTION');
            option.value = item.id;
            option.innerHTML = item.name;
            select.appendChild(option);
        }
        select.setAttribute('data-id',element.getAttribute('data-id'));
        $(`.select-categoryName`).remove();
        select.classList.add('select-categoryName');
        element.appendChild(select);
    });
    response.fail(function(jqXHR, textStatus, errorThrown){
        console.log(jqXHR.status);
        console.log(textStatus);
        console.log(errorThrown);
        if(jqXHR.status==0)
        {
            Notiflix.Report.Failure("خطا","لطفا اینترنت خود را برسی کنید","باشه");
        }
            else
        {
            var data =JSON.parse(jqXHR.responseText);
            var errors = false;
            for(key in data['errors'])
            {
                errors = true;
                Notiflix.Notify.Failure(data['errors'][key]);
            }
            if(!errors)
            Notiflix.Notify.Failure('خطای سرور');
        }
    });
}

function savePeriodChanges()
{
    $('.input-error').removeClass('input-error');
    var periodArray = {};
    var hasError = false;
    $('.user-profit').each(function(index){
       var periodId = $(this).attr('data-id');
       periodArray[index] = {};
       periodArray[index]['id'] = periodId;
       var userProfit = Number.parseFloat($(this).attr('data-value'));
       if(userProfit <= 0)
       {
           $(`.user-profit-input[data-id=${periodId}]`).addClass('input-error');
           hasError = true;
       }
       else
       {
           periodArray[index]['userProfit'] = userProfit;
       }
    });
    $('.normal-representation-profit').each(function(index){
         var periodId = $(this).attr('data-id');
       var normalRepresentationProfit = Number.parseFloat($(this).attr('data-value'));
       if(normalRepresentationProfit <= 0)
       {
          $(`.normal-representation-profit-input[data-id=${periodId}]`).addClass('input-error');
          hasError = true;
       }
       else
       {
           periodArray[index]['normalRepresentationProfit'] = normalRepresentationProfit;
       }
    });
     $('.senior-representation-profit').each(function(index){
         var periodId = $(this).attr('data-id');
       var seniorRepresentationProfit = Number.parseFloat($(this).attr('data-value'));
       if(seniorRepresentationProfit <= 0)
       {
           $(`.senior-representation-profit-input[data-id=${periodId}]`).addClass('input-error');
           hasError = true;
       }
       else
       {
           periodArray[index]['seniorRepresentationProfit'] = seniorRepresentationProfit;
       }
    });
    if(hasError)
    {
        Notiflix.Report.Failure('خطا','قیمت های فروش باید از قیمت پایه بزرگتر باشد.','باشه');
    }
    else
    {
      var api = new AdminApi();
     $(`.success-report`).css('display','none');
     $(`.error-report`).css('display','none');
      for(key in periodArray)
      {
        var formData = new FormData();
        formData.append('userProfit',periodArray[key].userProfit);
        formData.append('normalRepresentationProfit',periodArray[key].normalRepresentationProfit);
        formData.append('seniorRepresentationProfit',periodArray[key].seniorRepresentationProfit);
        var periodId = periodArray[key].id;
        var response = api.updateRepresentationPeriodProfit(formData,periodId);
        response.done(function(data,status){
          $(`.success-report[data-id=periodId]`).css('display','inline');
        });
        response.fail(function(jqXHR, textStatus, errorThrown){
          Notiflix.Notify.Failure('خطا در ارتباط');
          $(`.error-report[data-id=periodId]`).css('display','inline');
        });
      }
    }
}


