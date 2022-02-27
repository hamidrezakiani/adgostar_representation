if(!servicesPageScript)
    {
        servicesPageScript = true;


        $(document).on('click','.setCost',function()
        {
           var item_id = $(this).attr('data-id');
           loadPeriods(item_id);
           $('#btn-periodCost').click();
        });

        $(document).on('keyup','.user-profit-input',function(){
           var cost = Number.parseInt($(this).val());
           var periodId = $(this).attr('data-id');
           var baseCost = Number.parseInt($(`.baseCost[data-id=${periodId}]`).html());
           var userProfit;
           if(cost)
           {
             userProfit = Number.parseInt((cost / baseCost - 1) * 100 * 1000000)/1000000;
           }
           else
           {
             userProfit = '';
           }
           $(`.user-profit[data-id=${periodId}]`).html(Math.round(userProfit*100)/100);
           $(`.user-profit[data-id=${periodId}]`).attr('data-value',userProfit);
        });

        $(document).on('keyup','.normal-representation-profit-input',function(){
           var cost = Number.parseInt($(this).val());
           var periodId = $(this).attr('data-id');
           var baseCost = Number.parseInt($(`.baseCost[data-id=${periodId}]`).html());
           var normalRepresentationProfit;
           if(cost)
           {
             normalRepresentationProfit = Number.parseInt((cost / baseCost - 1) * 100 * 1000000)/1000000;
           }
           else
           {
             normalRepresentationProfit = '';
           }
           $(`.normal-representation-profit[data-id=${periodId}]`).html(Math.round(normalRepresentationProfit*100)/100);
           $(`.normal-representation-profit[data-id=${periodId}]`).attr('data-value',normalRepresentationProfit);
        });

        $(document).on('keyup','.senior-representation-profit-input',function(){
           var cost = Number.parseInt($(this).val());
           var periodId = $(this).attr('data-id');
           var baseCost = Number.parseInt($(`.baseCost[data-id=${periodId}]`).html());
           var seniorRepresentationProfit;
           if(cost)
           {
             seniorRepresentationProfit = Number.parseInt((cost / baseCost - 1) * 100 * 1000000)/1000000;
           }
           else
           {
             seniorRepresentationProfit = '';
           }
           $(`.senior-representation-profit[data-id=${periodId}]`).html(Math.round(seniorRepresentationProfit*100)/100);
           $(`.senior-representation-profit[data-id=${periodId}]`).attr('data-value',seniorRepresentationProfit);
        });

        $(document).on('click','#save-period-changes',function(){
           savePeriodChanges();
        });
    }
