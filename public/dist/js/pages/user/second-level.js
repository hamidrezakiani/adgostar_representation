getOrder(orderId);
function getOrder(orderId)
{
    let api = new Api();
    let response = api.getOrder(orderId);
           response.done(function(data,status){
           var order = data['data'];
           document.getElementById('product-name').innerHTML = order['product_name'];
           document.getElementById('item-name').innerHTML = order['item_name'];
           document.getElementById('count-order').innerHTML = order['count'];
           document.getElementById('start-time').innerHTML = order['startTime'];
           document.getElementById('end-time').innerHTML = order['endTime'];
           document.getElementById('unit-price').innerHTML = formatter.format(order['unit_price']);
           document.getElementById('cost').innerHTML = formatter.format(order['amount']);
           document.getElementById('wallet-deducted').innerHTML = 0;
           document.getElementById('ultimate-cost').innerHTML = formatter.format(order['amount']);
           if(order['status'] == 'SUCCESS_PAYMENT')
           {
              $('#success-payment').css('display','block');
              $('#btn-pay').css('display','none');
              $('#btn-orders').css('display','inline-block');
           }
           else if(order['status'] == 'FAILED_PAYMENT')
           {
              $('#btn-pay').html('پرداخت مجدد');
           }
           var properties = order.properties;
           var propertiesDiv = document.getElementById('properties-div');
           for(key in properties)
           {
               var property = properties[key];
               var div = document.createElement('DIV');
               div.className = 'col-xl-12 col-lg-12 col-md-12 col-sm-12 p-2';
               var span = document.createElement('SPAN');
               span.className = 'font-weight-bold';
               span.innerHTML = property.name + ' : ';
               div.appendChild(span);
               switch(property.dataType)
               {
                   case 'MOVIE' :

                    break;
                   case 'TEXT' :
                     var span = document.createElement('SPAN');
                     span.innerHTML = property.value;
                     div.appendChild(span);
                    break;
                   case 'PHOTO' :
                    var img = document.createElement('IMG');
                    img.src = 'https://homepages.cae.wisc.edu/~ece533/images/airplane.png';
                    img.style.width = '100%';
                    img.className = 'order-property';
                    img.setAttribute('data-propertyId',property.id);
                    img.setAttribute('data-type','file');
                    div2.appendChild(img);
                   default :
                    break;
               }
               propertiesDiv.appendChild(div);
               div = document.createElement('DIV');
               div.className = 'dashed-line col-xl-12 col-lg-12 col-md-12 col-sm-12';
               propertiesDiv.appendChild(div);
            }
           });
           response.fail(function(jqXHR, textStatus, errorThrown){
               Notiflix.Notify.Failure('حطا در ارتباط', {cssAnimationStyle:'zoom', cssAnimationDuration:500,});
           });
}





