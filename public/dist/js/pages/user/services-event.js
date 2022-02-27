if(!servicesPageScript)
{
    servicesPageScript = true;

    $(document).on('click','#btn-back',function(){
       var id = $(this).attr('data-id');
       if(id != null)
        loadCategories('subCats',id);
       else
        loadCategories('parents');
    });

    $(document).on('keyup','.count-order-input',function(){
       var count = $(this).val();
       var itemId = $(this).attr('data-itemId');
       var maxOrder = Number.parseInt($(this).attr('data-maxOrder'));
      if(count != '')
      {
          if(count <= maxOrder)
      {
           var itemId = $(this).attr('data-itemId');
       var period = $('.item-period').filter(function(){
          return $(this).attr('data-itemId') == itemId && Number.parseInt($(this).attr('data-start')) <= count && Number.parseInt($(this).attr('data-end')) >= count;
       })[0];
       var cost = Number.parseInt(period.getAttribute('data-cost'));
       var calculate = cost * count;
       $(`.calculated-cost[data-itemId=${itemId}]`).html(calculate);
      }
      else
      {
          Notiflix.Report.Failure('هشدار',`حداکثر تعداد سفارش ${$(this).attr('maxOrder')} عدد میباشد`);
      }
      }
      else
      {
         $(`.calculated-cost[data-itemId=${itemId}]`).html(0);
      }

    });

    $(document).on('click','.buy',function(){
       var itemId = $(this).attr('data-itemId');
       var count = $(`.count-order-input[data-itemId=${itemId}]`).val();
       if(count != 0 && count != '')
       loadPage(`first-level?item_id=${itemId}&count=${count}`);
       else
       Notiflix.Report.Failure('هشدار',`لطفا تعداد سفارش را وارد کنید  ${$(this).attr('maxOrder')} عدد میباشد`);
    });

}
