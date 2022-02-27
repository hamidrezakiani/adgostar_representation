$(document).ready(function(){
    $('#btn-send-ticket').on('click',function(){
    $('.errors').css('display','none');
    Notiflix.Loading.Pulse('لطفا صبر کنید...');
    var data = new FormData();
    data.append('title',$('#ticket-title').val());
    data.append('priority',$('#ticket-priority').val());
    data.append('text',$('#ticket-text').val());
    let api = new Api();
    let response = api.storeTicket(data);
    response.done(function(data,status){
        $('#NotiflixLoadingWrap').remove();
        $('#ticket-title').val('');
        $('#ticket-priority').val('MIDDLE');
        $('#ticket-text').val('');
        Notiflix.Report.Success("موفق",'تیکت شما ارسال شد','باشه');

    });
    response.fail(function(jqXHR, textStatus, errorThrown){
        $('#NotiflixLoadingWrap').remove();
        console.log(jqXHR.status);
        console.log(textStatus);
        console.log(errorThrown);
        if(jqXHR.status==0)
        {
            Notiflix.Report.Failure("خطا","لطفا اینترنت خود را برسی کنید","باشه");
        }
            else
        {
            var data =JSON.parse(jqXHR.responseText);
            var errors = "";
            for(key in data['errors'])
            {
                console.log(`#${key}`);
                $(`#${key}`).children('i').html(data['errors'][key]);
                $(`#${key}`).css('display','block');
                errors += data['errors'][key] + " , ";
            }
            Notiflix.Report.Failure("خطا",'لطفا ورودی های خود را کنترل کنید.','باشه');
        }
    });
    });

});
