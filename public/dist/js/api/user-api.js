class UserApi{
    getAccount()
    {
        var url = `${apiUrl}/api/user`;
        var data = {};
        return this.ajaxJson(url,'GET',data);
    }

    getRepresentationDetailsByAuth()
    {
        var url = `${apiUrl}/representation/representationDetail`;
        var data = {};
       return this.ajaxJson(url,'GET',data);
    }

    getTickets()
    {
        var url = `${apiUrl}/representation/user/tickets`;
        var data = {};
       return this.ajaxJson(url,'GET',data);
    }

    getTicketMessages(id)
    {
        var url = `${apiUrl}/representation/user/tickets/${id}/messages`;
        var data = {};
       return this.ajaxJson(url,'GET',data);
    }

    storeTicket(data)
    {
        var url = `${apiUrl}/representation/user/tickets`;
       return this.ajaxFormData(url,'POST',data);
    }

    storeMessage(data,id)
    {
        var url = `${apiUrl}/representation/user/tickets/${id}/messages`;
       return this.ajaxFormData(url,'POST',data);
    }

    getOrders(flag)
    {
        var url = `${apiUrl}/representation/orders?flag=${flag}`;
        var data = {};
        return this.ajaxJson(url,'GET',data);
    }

    rejectOrderTimes(orderId)
    {
        var url = `${apiUrl}/representation/orders/${orderId}?flag=REJECT_TIMES`;
        var data = {};
        return this.ajaxJson(url,'PUT',data);
    }

    chooseOrderTime(orderId,timeId)
    {
        var url = `${apiUrl}/representation/orders/${orderId}?time_id=${timeId}&flag=ACCEPT_TIME`;
        var data = {};
        return this.ajaxJson(url,'PUT',data);
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
