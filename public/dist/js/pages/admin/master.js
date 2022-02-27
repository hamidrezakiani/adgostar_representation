$(document).ready(function(){
        window.addEventListener('popstate',function(event)
        {
            Notiflix.Loading.Pulse('لطفا صبر کنید...');
            let currentUrl = window.location.href;
            let url = currentUrl.replace('/page','');
            $.get(url, function(data, status){
                $('#content').html(data);
                $('#NotiflixLoadingWrap').remove();
            });
        });
        // Notiflix.Loading.Pulse('لطفا صبر کنید...');
        let api = new AdminApi();
        let response = api.getRepresentationDetailsByAuth();
        response.done(function(data,status){
            $('#NotiflixLoadingWrap').remove();
            $('#page-title').html(`${data['data']['title']}`);
            $('.representation-title').html(data['data']['title']);
            $('#sidebar-logo').attr('src',data['data']['logo']);
            $('#favicon').attr('href',data['data']['logo']);

        });
        response.fail(function(jqXHR, textStatus, errorThrown){
            $('#NotiflixLoadingWrap').remove();
            console.log(jqXHR.status);
            console.log(textStatus);
            console.log(errorThrown);
        });
        // Notiflix.Loading.Pulse('لطفا صبر کنید...');
        response = api.getAccount();
        response.done(function(data,status){
            $('#NotiflixLoadingWrap').remove();
            $('#user-name').html(`${data['data']['fullName']}`);
            $('#avatar').attr('src',data['data']['avatar']);
            if(data['data'].isAdmin != false)
            {
              $('.isAdmin').css('display','block');
              $('.isAdmin').attr('href',data['data'].isAdmin);
            }
            if(data['data'].isUser != false)
            {
                $('.isUser').css('display','block');
                $('.isUser').attr('href',data['data'].isUser);
            }
            if(data['data'].executer != false)
            {
                $('.isExecuter').css('display','block');
                $('.isExecuter').attr('href',data['data'].isExecuter);
            }
        });
        response.fail(function(jqXHR, textStatus, errorThrown){
            $('#NotiflixLoadingWrap').remove();
            console.log(jqXHR.status);
            console.log(textStatus);
            console.log(errorThrown);
        });

        $.get(pageUrl, function(data, status){
            $('#content').html(data);
        });

        $(document).on('click','.page-links',function()
        {
            Notiflix.Loading.Pulse('لطفا صبر کنید...');
            let currentUrl = baseUrl+'/admin/page'+$(this).attr('data-url');
            window.history.pushState({},"", currentUrl);
            let url = baseUrl+'/admin'+$(this).attr('data-url');
            var api = new AdminApi();
            var response = api.getPage(url);
            response.done(function(data,status)
            {
               $('#content').html(data);
               $('#NotiflixLoadingWrap').remove();
            });
        })
});

