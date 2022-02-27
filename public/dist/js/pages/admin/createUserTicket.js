$(document).ready(function(){
    getSearchUsers();
    $('#btn-send-ticket').on('click',function(){
    if($('#ticket-user-id').val() == '')
    {
        Notiflix.Report.Failure("خطا","لطفا کاربر را انتخاب کنید","باشه");
    }
    else
    {
        $('.errors').css('display','none');
        Notiflix.Loading.Pulse('لطفا صبر کنید...');
        var data = new FormData();
        data.append('title',$('#ticket-title').val());
        data.append('user_id',$('#search-result-id').val());
        data.append('priority',$('#ticket-priority').val());
        data.append('text',$('#ticket-text').val());
        let api = new AdminApi();
        let response = api.storeUserTicket(data);
        response.done(function(data,status){
            $('#NotiflixLoadingWrap').remove();
            $('#ticket-title').val('');
            $('#ticket-priority').val('MIDDLE');
            $('#ticket-text').val('');
            $('#ticket-user-id').val('');
            $('#auto-complete').val('');
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
                var data = JSON.parse(jqXHR.responseText);
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
    }

    });

});

function getSearchUsers()
{
    let api = new AdminApi();
    let response = api.getSearchUsers();
    response.done(function(data,status){
        var users = data['data'];
        autocomplete(document.getElementById("auto-complete"), users);
    });
    response.fail(function(jqXHR, textStatus, errorThrown){
        $('#NotiflixLoadingWrap').remove();
        Notiflix.Notify.Failure('خطا در ارتباط', {cssAnimationStyle:'zoom', cssAnimationDuration:500,});
        console.log(jqXHR.status);
        console.log(textStatus);
        console.log(errorThrown);
    });
}
