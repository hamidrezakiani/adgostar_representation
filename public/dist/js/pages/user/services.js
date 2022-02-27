var allItems = [];
loadProducts(pageServiceFlag,pageCategoryId);
function loadProducts(flag,category_id = null)
          {
           let api = new Api();
           pageCategoryId = category_id;
           pageServiceFlag = flag;
           let response = api.getServices(flag,category_id);
           response.done(function(data,status){
               if(category_id)
               {
                   $('#btn-back').css('display','block');
                   $('#btn-back').attr('data-id',category_id);
               }
               else
               {
                   $('#btn-back').css('display','none');
               }

               let services = data['data']['services'];
               var serviceDiv = document.getElementById('service-div');
               serviceDiv.innerHTML = '';
               for(key in services)
               {
                  var service = services[key];
                  var div = document.createElement('DIV');
                  div.className = 'col-xl-6 col-lg-6 col-md-12 col-sm-12';
                  var h6 = document.createElement('H6');
                  h6.innerHTML = service.name;
                  div.appendChild(h6);
                  var table = document.createElement('TABLE');
                  table.className = 'table table-bordered';
                  var tbody = document.createElement('TBODY');
                  var items = service.items;
                    for(key in items)
                    {
                        var item = items[key];
                        allItems[item.id] = item;
                        var tr = document.createElement('TR');
                        var td = document.createElement('TD');
                        if(service.items.length > 1)
                        {
                          td.innerHTML = item.name;
                          tr.appendChild(td);
                        }
                        td = document.createElement('TD');
                        var span = document.createElement('SPAN');
                        span.className = 'periods-detail';
                        span.innerHTML = 'تعرفه : ';
                        td.appendChild(span);
                        td.appendChild(document.createElement('BR'));
                        if(item.periods.length > 1)
                        {
                          var periods = item.periods;
                          for(key in periods)
                          {
                              var period = periods[key];
                              span = document.createElement('SPAN');
                              span.classList.add('item-period');
                              span.setAttribute('data-ItemId',item.id);
                              span.setAttribute('data-start',period.start);
                              span.setAttribute('data-end',period.end);
                              span.setAttribute('data-cost',period.cost);
                              span.innerHTML = `از ${period.startLabel} تا ${period.endLabel} هر عدد ${period.cost} تومان-زمان تقریبی ${period.time} ساعت`;
                              td.appendChild(span);
                              td.appendChild(document.createElement('BR'));
                          }
                        }
                        else
                        {
                            span = document.createElement('SPAN');
                            span.classList.add('item-period');
                            span.setAttribute('data-ItemId',item.id);
                            span.setAttribute('data-start',item.periods[0].start);
                            span.setAttribute('data-end',item.periods[0].end);
                            span.setAttribute('data-cost',item.periods[0].cost);
                            span.innerHTML = `هر عدد ${item.periods[0].cost} تومان-زمان تقریبی ${item.periods[0].time} ساعت`;
                            td.appendChild(span);
                            td.appendChild(document.createElement('BR'));
                        }
                        span = document.createElement('SPAN');
                        span.innerHTML = `حداکثر سفارش ${item.maxOrderLabel} عدد`;
                        td.appendChild(span);
                        td.appendChild(document.createElement('BR'));
                        tr.appendChild(td);
                        ///////////
                        td = document.createElement('TD');
                        var tinyTable = document.createElement('TABLE');
                        var tr2 = document.createElement('TR');
                        var td2 = document.createElement('TD');
                        td2.innerHTML = 'تعداد';
                        td2.style.padding = '2px';
                        tr2.appendChild(td2);
                        td2 = document.createElement('TD');
                        var input = document.createElement('INPUT');
                        input.setAttribute('type','number');
                        input.setAttribute('data-maxOrder',item.maxOrder);
                        input.setAttribute('data-itemId',item.id);
                        input.classList.add('count-order-input');
                        input.style.width = '80px';
                        input.style.height = '25px';
                        td2.appendChild(input);
                        td2.style.padding = '2px';
                        tr2.appendChild(td2);
                        tinyTable.appendChild(tr2);
                        tr2 = document.createElement('TR');
                        td2 = document.createElement('TD');
                        td2.innerHTML = 'قیمت';
                        td2.style.padding = '2px';
                        tr2.appendChild(td2);
                        td2 = document.createElement('TD');
                        td2.classList.add('calculated-cost');
                        td2.setAttribute('data-itemId',item.id);
                        td2.style.padding = '2px';
                        tr2.appendChild(td2);
                        tinyTable.appendChild(tr2);
                        tr2 = document.createElement('TR');
                        td2 = document.createElement('TD');
                        td2.setAttribute('colspan',2);
                        var button = document.createElement('BUTTON');
                        button.className = 'btn btn-success buy';
                        button.setAttribute('data-itemId',item.id);
                        button.innerHTML = 'خرید';
                        button.style.width = '100%';
                        td2.style.padding = '2px';
                        td2.appendChild(button);
                        tr2.appendChild(td2);
                        tinyTable.appendChild(tr2);
                        td.appendChild(tinyTable);
                        tr.appendChild(td);
                        tbody.appendChild(tr);
                    }
                    table.appendChild(tbody);
                    div.appendChild(table);
                 serviceDiv.appendChild(div);
               }
           });
           response.fail(function(jqXHR, textStatus, errorThrown){
               Notiflix.Notify.Failure('حطا در ارتباط', {cssAnimationStyle:'zoom', cssAnimationDuration:500,});
           });
}




