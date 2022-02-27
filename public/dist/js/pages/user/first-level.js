var item = [];
getItem(itemId);
function getItem(item_id)
{
    let api = new Api();
    let response = api.getItem(item_id);
           response.done(function(data,status){
           item = data['data'];
           document.getElementById('product-name').innerHTML = item['product']['name'];
           document.getElementById('item-name').innerHTML = item['name'];
           var period = item['periods'].filter(function(period){
              return Number.parseInt(count) >= Number.parseInt(period['start']) && Number.parseInt(count) <= Number.parseInt(period['end']);
           })[0];
           document.getElementById('unit-cost').innerHTML = period['cost'];
           var calculatedCost = count * period['cost'];
           document.getElementById('calculated-cost').innerHTML = calculatedCost;
           var properties = item.properties;
           var propertiesDiv = document.getElementById('properties-div');
           for(key in properties)
           {
               var property = properties[key];
               var div = document.createElement('DIV');
               div.className = 'col-xl-6 col-lg-6 col-md-12 col-sm-12';
               var div2 = document.createElement('DIV');
               div2.className = 'form-group';
               var label = document.createElement('LABEL');
               label.innerHTML = property.label;
               div2.appendChild(label);
               switch(property.type.type)
               {
                   case 'INSTAGRAM' :
                    var input = document.createElement('INPUT');
                    input.className = 'form-control instagram-validation order-property';
                    input.setAttribute('data-propertyId',property.id);
                    input.setAttribute('data-type','text');
                    input.placeholder = property.placeholder;
                    input.required;
                    var label = document.createElement('LABEL');
                    label.setAttribute('data-propertyId',property.id);
                    label.className = 'input-status';
                    div2.appendChild(input);
                    div2.appendChild(label);
                    break;
                   case 'TEXT' :
                    var input = document.createElement('INPUT');
                    input.className = 'form-control order-property';
                    input.setAttribute('data-propertyId',property.id);
                    input.setAttribute('data-type','text');
                    input.placeholder = property.placeholder;
                    input.required;
                    div2.appendChild(input);
                    break;
                    case 'LINK' :
                    var input = document.createElement('INPUT');
                    input.className = 'form-control order-property';
                    input.setAttribute('data-propertyId',property.id);
                    input.setAttribute('data-type','text');
                    input.placeholder = property.placeholder;
                    input.required;
                    div2.appendChild(input);
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
               div.appendChild(div2);
               propertiesDiv.appendChild(div);
           }
           });
           response.fail(function(jqXHR, textStatus, errorThrown){
               Notiflix.Notify.Failure('حطا در ارتباط', {cssAnimationStyle:'zoom', cssAnimationDuration:500,});
           });
}

function guestShop(phoneNumber,count_order,count_property)
{
  var properties=[];
  for(i=0;i<count_property;i++)
  {
    var propertyId = item.properties[i].id;
    console.log(propertyId);
    var propertyElement = $(`.order-property[data-propertyId=${propertyId}]`);
    var inputType = propertyElement.attr('data-type');
    var property = {};
    switch(inputType)
    {
        case 'text':
         property.id = propertyId;
         property.value = propertyElement.val();
         break;
        default :
         break;
    }
    properties[i] = property;
  }
  var data = new FormData();
  data.append('phone',phoneNumber);
  data.append('item_id',item.id);
  data.append('count_order',count_order);
  data.append('order_date',$('#timestamp').val());
  data.append('order_time',$('#order-time').val());
  data.append('properties',JSON.stringify(properties));
  data.append('flag','GUEST');
  let api = new Api();
  let response = api.guest_shop(data);
  response.done(function(data,status){
     $('#myModal').modal('toggle');
     loadPage(`second-level?order_id=${data['data']['order_id']}`);
  });
  response.fail(function(jqXHR, textStatus, errorThrown){
     Notiflix.Notify.Failure('حطا در ارتباط', {cssAnimationStyle:'zoom', cssAnimationDuration:500,});
  });
}




