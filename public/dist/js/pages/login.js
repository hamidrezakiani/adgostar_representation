$(document).ready(function(){
    $.getScript("dist/js/api/api.js", function() {
        let api = new Api();
        Notiflix.Loading.Pulse('لطفا صبر کنید...');
        let response = api.getRepresentationDetailsByDomain();
        response.done(function(data,status){
            $('#NotiflixLoadingWrap').remove();
            $('.login-box').css('display','block');
            $('#page-title').html(`پنل ${data['data']['title']} | صفحه ورود`);
            $('.representation-title').html(data['data']['title']);
            $('#favicon').attr('href',data['data']['logo']);
        });
        response.fail(function(jqXHR, textStatus, errorThrown){
            // document.location.href = baseUrl + '/403';
            console.log(jqXHR.status);
            console.log(textStatus);
            console.log(errorThrown);
        });
     });
});
$('#btn-submit').on('click',function(){
    var phone = $('#phone-input').val();
    var password = $('#password-input').val();
    // var data = new FormData();
    // data.append('phone',phone);
    // data.append('password',password);
    var data = {
        'phone': phone,
        'password': password,
        'domain':domain
    };
    Notiflix.Loading.Pulse('لطفا صبر کنید...');
    $.post(`${apiUrl}/representation/login`,
        data,
        function(data, status){
        $('#form-login').submit();
        }).fail(function (data) {
        $('#NotiflixLoadingWrap').remove();
        if(data.readyState==0)
        {
            Notiflix.Report.Failure("خطا","لطفا اینترنت خود را برسی کنید","باشه");
        }
            else
        {
        console.log(data.status);
        if(data.status == 403)
        {
            document.location.href = baseUrl + '/403';
        }
        else
        {
            var data =JSON.parse(data.responseText);
            console.log(data['errors'].length);
            var errors = "";
            for(key in data['errors'])
            {
                errors += data['errors'][key] + " , ";
            }
            Notiflix.Report.Failure("خطا",errors,'باشه');
        }
        }


    });
});
