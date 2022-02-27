class Api{
    getRepresentationDetailsByDomain()
    {
        var url = `${apiUrl}/representation/representationDetail`;
        var data = {
            "domain" : `${domain}`
        };
       return this.ajaxJson(url,'GET',data);
    }

    getCategories(flag,parent_id)
    {
        var url = `${apiUrl}/representation/categories?flag=${flag}&search=${parent_id}`;
        var data = {};
        return this.ajaxJson(url,'GET',data);
    }

    getServices(flag,category_id)
    {
        var url = `${apiUrl}/representation/services?flag=${flag}&domain=${domain}&search=${category_id}`;
        var data = {};
        return this.ajaxJson(url,'GET',data);
    }

    getItem(item_id)
    {
        var url = `${apiUrl}/representation/services/${item_id}?domain=${domain}`;
        var data = {};
        return this.ajaxJson(url,'GET',data);
    }

    getOrder(order_id)
    {
        var url = `${apiUrl}/representation/orders/${order_id}`;
        var data = {};
        return this.ajaxJson(url,'GET',data);
    }

    guest_shop(data)
    {
      var url = `${apiUrl}/representation/orders?domain=${domain}`;
      return this.ajaxFormData(url,'POST',data);
    }

    persianNextMonthData(year,month)
    {
        var url = `${apiUrl}/representation/persian-next-month-data?year=${year}&month=${month}`;
        var data = {};
        return this.ajaxJson(url,'GET',data);
    }

    persianPreviousMonthData(year,month)
    {
        var url = `${apiUrl}/representation/persian-previous-month-data?year=${year}&month=${month}`;
        var data = {};
        return this.ajaxJson(url,'GET',data);
    }

    getPage(url,data)
    {
        var response = $.ajax({
            "url": url,
            "method": 'GET'
        });
        response.fail(function(jqXHR, textStatus, errorThrown){
           if(jqXHR.status == 401)
             window.location.href = '/login';
        });
        return response;
    }

    checkInstagramAccount(instagramId)
    {
        var response = $.ajax({
            "url": `https://www.instagram.com/${instagramId}`,
            "method": 'GET',
            "timeout": 0,
  "headers": {
    "Cookie": "mid=YIu8bwAEAAFX_l8XIylHTdFJI5aG; ig_did=8B04B930-A40E-416B-B9DE-06A16F856624; ig_nrcb=1; csrftoken=7v1Pmmxpva3FSrzzedhmDxxPcdSLcVhZ"
  },
        });

        return response;
    }

    ajaxJson(url,method,data)
    {
        return $.ajax({
            "url": url,
            "method": method,
            "data": data,
            "timeout": 0,
            "dataType":"json",
            "crossDomain" : true,
            "headers": {
                "Content-Type": "application/json",
                "X-Requested-With" : "XMLHttpRequest",
                "Authorization": `Bearer ${api_token}`
             },
        });
    }

    ajaxFormData(url,method,data)
    {
        return $.ajax({
            "url": url,
            "method": method,
            "data": data,
            "timeout": 0,
            "processData": false,
            "contentType": false,
            "headers": {
                "Authorization": `Bearer ${api_token}`
             },
        });
    }
}
