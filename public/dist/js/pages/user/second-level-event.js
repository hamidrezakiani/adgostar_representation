if(!secondLevelPageScript)
{
    secondLevelPageScript = true;

    $(document).on('keyup','#count-order-input',function(){
       var count = $(this).val();
       if(count == '')
       {
           $(`#count-order-error`).children('i').html(`مقدار سفارش نمیتواند خالی باشد`);
           $(`#count-order-error`).css('display','block');
           document.getElementById('count-order').innerHTML = 0;
           document.getElementById('unit-cost').innerHTML = 0;
           document.getElementById('calculated-cost').innerHTML = 0;
       }
       else if(count > item['maxOrder'])
       {
            document.getElementById('count-order').innerHTML = count;
            $(`#count-order-error`).children('i').html(`حداکثر مقدار سفارش ${item['maxOrder']} عدد است`);
            $(`#count-order-error`).css('display','block');
       }
       else
       {
           $('#count-order-error').css('display','none');
           console.log(count);
           console.log(item['periods']);
           var period = item['periods'].filter(function(period){
               console.log(Number.parseInt(period['start']));
               console.log(Number.parseInt(period['end']));
              return Number.parseInt(count) >= Number.parseInt(period['start']) && Number.parseInt(count) <= Number.parseInt(period['end']);
           })[0];
           document.getElementById('count-order').innerHTML = count;
           document.getElementById('unit-cost').innerHTML = period['cost'];
           var calculatedCost = count * period['cost'];
           document.getElementById('calculated-cost').innerHTML = calculatedCost;

       }
    });

    $(document).on('click','#btn-next',function(){
        if(auth)
        {
            console.log(100);
        }
        else
        {
        $('#myModal').modal('show');
        }
    });

    $(document).on('click','#btn-guest-shop',function()
    {
       var phoneNumber = $('#user-phone-number').val();
       var count_order = $('#count-order-input').val();
       var count_property = item.properties.length;
       guest_shop(phoneNumber,count_order,count_property);
    });

}
