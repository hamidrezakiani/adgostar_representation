if(!firstLevelValidationScript)
{
    firstLevelValidationScript = true;
   $(document).on('keyup','.instagram-validation',function()
   {
      var propertyId = $(this).attr('data-propertyId');
      var inputStatusElement = $(`.input-status[data-propertyId=${propertyId}]`)
      loading(inputStatusElement,'');
      let api = new Api();
      let response = api.checkInstagramAccount($(this).val());
      response.done(function(data,status){
        setSuccess(inputStatusElement,'آیدی معتبر است');
      });
      response.fail(function(jqXHR, textStatus, errorThrown){
        // if(jqXHR.status == 404)
        setError(inputStatusElement,'آیدی معتبر نمیباشد');
    });
   });
}

function setError(element,message)
{
   element.css('color','red');
   element.addClass('fa fa-times-circle-o');
   element.removeClass('fas fa-check-circle');
   element.removeClass('fas fa-spinner fa-pulse');
   element.html(message);
}

function setSuccess(element,message)
{
   element.css('color','green');
   element.removeClass('fa fa-times-circle-o');
   element.addClass('fas fa-check-circle');
   element.removeClass('fas fa-spinner fa-pulse');
   element.html(message);
}

function loading(element,message)
{
   element.css('color','blue');
   element.removeClass('fa fa-times-circle-o');
   element.removeClass('fas fa-check-circle');
   element.addClass('fas fa-spinner fa-pulse');
   element.html(message);
}
