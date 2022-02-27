class AdminApi{
    getAccount()
    {
        var url = `${apiUrl}/api/account`;
        var data = {};
        return this.ajaxJson(url,'GET',data);
    }

    getRepresentationDetailsByAuth()
    {
        var url = `${apiUrl}/representation/representationDetail`;
        var data = {};
       return this.ajaxJson(url,'GET',data);
    }

    getUserTickets()
    {
        var url = `${apiUrl}/representation/agent/userTickets`;
        var data = {};
       return this.ajaxJson(url,'GET',data);
    }

    getSubsetTickets()
    {
        var url = `${apiUrl}/representation/agent/subsetTickets`;
        var data = {};
       return this.ajaxJson(url,'GET',data);
    }

    getTickets()
    {
        var url = `${apiUrl}/representation/agent/tickets`;
        var data = {};
       return this.ajaxJson(url,'GET',data);
    }

    getUserTicketMessages(id)
    {
        var url = `${apiUrl}/representation/agent/userTickets/${id}/messages`;
        var data = {};
       return this.ajaxJson(url,'GET',data);
    }

    getSubsetTicketMessages(id)
    {
        var url = `${apiUrl}/representation/agent/subsetTickets/${id}/messages`;
        var data = {};
       return this.ajaxJson(url,'GET',data);
    }

    getTicketMessages(id)
    {
        var url = `${apiUrl}/representation/agent/tickets/${id}/messages`;
        var data = {};
       return this.ajaxJson(url,'GET',data);
    }

    getSearchUsers()
    {
        var url = `${apiUrl}/representation/agent/users?flag=search`;
        var data = {};
        return this.ajaxJson(url,'GET',data);
    }

    getSearchSubsets()
    {
        var url = `${apiUrl}/representation/agent/subsets?flag=search`;
        var data = {};
        return this.ajaxJson(url,'GET',data);
    }

    storeSubsetTicket(data)
    {
        var url = `${apiUrl}/representation/agent/subsetTickets`;
       return this.ajaxFormData(url,'POST',data);
    }

    storeUserTicket(data)
    {
        var url = `${apiUrl}/representation/agent/userTickets`;
       return this.ajaxFormData(url,'POST',data);
    }

    storeTicket(data)
    {
        var url = `${apiUrl}/representation/agent/tickets`;
       return this.ajaxFormData(url,'POST',data);
    }

    storeUserMessage(data,id)
    {
        var url = `${apiUrl}/representation/agent/userTickets/${id}/messages`;
       return this.ajaxFormData(url,'POST',data);
    }

    storeSubsetMessage(data,id)
    {
        var url = `${apiUrl}/representation/agent/subsetTickets/${id}/messages`;
       return this.ajaxFormData(url,'POST',data);
    }

    storeMessage(data,id)
    {
        var url = `${apiUrl}/representation/agent/tickets/${id}/messages`;
       return this.ajaxFormData(url,'POST',data);
    }

    getServices(flag,category_id)
    {
        var url = `${apiUrl}/representation/agent/products?flag=${flag}&category_id=${category_id}`;
        var data = {};
        return this.ajaxJson(url,'GET',data);
    }

    getPeriods(item_id)
    {
        var url = `${apiUrl}/representation/agent/items/${item_id}/periods`;
        var data = {};
        return this.ajaxJson(url,'GET',data);
    }

    updateRepresentationPeriodProfit(data,periodId)
    {
        var url = `${apiUrl}/representation/agent/periods/${periodId}`;
        return this.ajaxFormData(url,'PUT',data);
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
            "method": 'POST',
            "_method":method,
            "data": data,
            "timeout": 0,
            "processData": false,
            "contentType": false,
            "headers": {
                "X-HTTP-Method-Override": method,
                "Authorization": `Bearer ${api_token}`
             },
        });
    }
}
