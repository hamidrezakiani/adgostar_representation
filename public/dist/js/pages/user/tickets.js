$(document).ready(function(){
        loadTickets();
});

$(document).on('click','.ticket',function(){
   loadMessages($(this).attr('data-id'));
})

$(document).on('click','#ticket-exit',function(){
    $('#tickets').css('display','flex');
    $('#messages').css('display','none');
    $('#ticket-table').html('');
    loadTickets();
});

$(document).on('click','#btn-send-message',function(){
   sendMessage($(this).attr('data-id'));
   loadMessages($(this).attr('data-id'));
});

function sendMessage(id)
{
    $('.errors').css('display','none');
    Notiflix.Loading.Pulse('لطفا صبر کنید...');
    var data = new FormData();
    data.append('text',$('#message-text').val());
    let api = new UserApi();
    let response = api.storeMessage(data,id);
    response.done(function(data,status){
        $('#message-text').val('');
        Notiflix.Report.Success("موفق",'پیام شما ارسال شد','باشه');

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
}

function loadMessages(id)
{
    Notiflix.Loading.Pulse('لطفا صبر کنید...');
    let api = new UserApi();
    let response = api.getTicketMessages(id);
    response.done(function(data,status){
        $('#NotiflixLoadingWrap').remove();
        $('#messages').css('display','flex');
        $('#tickets').css('display','none');
        let ticket = data['data'];
        let messages = ticket.messages;
        console.log(ticket);
        console.log(messages);
        var priority = {
            'LOW':'<span class="text-info">پایین</span>',
            'MIDDLE':'<span class="text-primary">متوسط</span>',
            'HIGHT':'<span class="text-warning">بالا</span>'};
        var status = {
            'PENDING' : '<span class="badge badge-primary">در انتظار</span>',
            'ANSWERED' : '<span class="badge badge-success">پاسخ داده</span>',
            'CLOSE' : '<span class="badge badge-danger">بسته</span>',
        }
        $('#ticket-title').html(ticket.title);
        $('#ticket-created_by').html(ticket.created_by);
        $('#ticket-created_at').html(ticket.created_at);
        $('#ticket-status').html(status[ticket.status]);
        $('#ticket-priority').html(priority[ticket.priority]);
        $('#btn-send-message').attr('data-id',ticket.id);
        if(ticket.status == 'CLOSE')
          $('#box-send-message').css('display','none');

        document.getElementById('ticket-chats').innerHTML = '';
        for(key in messages)
        {
           var item = messages[key];
           divOne = document.createElement('DIV');
           divOne.classList.add('direct-chat-info');
           divOne.classList.add('clearfix');
           spanOne = document.createElement('SPAN');
           spanOne.classList.add('direct-chat-name');
           spanTwo = document.createElement('SPAN');
           spanTwo.innerHTML = item.date;
           spanTwo.classList.add('direct-chat-timestamp');
           var parentDiv = document.createElement('DIV');
           parentDiv.classList.add('direct-chat-msg');
           var img = document.createElement('IMG');
           img.classList.add('direct-chat-img');
           var divTwo = document.createElement('DIV');
           divTwo.classList.add('direct-chat-text');
           divTwo.innerHTML = item.text;
           if(item.representation_id == null)
             {
             spanOne.innerHTML = 'شما';
             parentDiv.classList.add('right');
             spanOne.classList.add('float-right');
             spanTwo.classList.add('float-left');
             img.src = apiUrl+'/media/images/representation/setting/user.jpg';
             }
             else
             {
                 spanOne.innerHTML = 'ادمین';
                 spanOne.classList.add('float-left');
                 img.src = apiUrl+'/media/images/representation/setting/admin.jpg';
             }
           divOne.appendChild(spanOne);
           divOne.appendChild(spanTwo);
           parentDiv.appendChild(divOne);
           parentDiv.appendChild(img);
           parentDiv.appendChild(divTwo);
           document.getElementById('ticket-chats').appendChild(parentDiv);
        }
    });
    response.fail(function(jqXHR, textStatus, errorThrown){
        $('#NotiflixLoadingWrap').remove();
        Notiflix.Notify.Failure('حطا در ارتباط', {cssAnimationStyle:'zoom', cssAnimationDuration:500,});
        console.log(jqXHR.status);
        console.log(textStatus);
        console.log(errorThrown);
    });
}

function loadTickets()
{
    Notiflix.Loading.Pulse('لطفا صبر کنید...');
    let api = new UserApi();
    let response = api.getTickets();
    response.done(function(data,status){
        $('#NotiflixLoadingWrap').remove();
        let tickets = data['data'];
        var priority = {
            'LOW':'<span class="text-info">پایین</span>',
            'MIDDLE':'<span class="text-primary">متوسط</span>',
            'HIGHT':'<span class="text-warning">بالا</span>'};
        var status = {
            'PENDING' : '<span class="badge badge-primary">در انتظار</span>',
            'ANSWERED' : '<span class="badge badge-success">پاسخ داده</span>',
            'CLOSE' : '<span class="badge badge-danger">بسته</span>',
        }
        for(key in tickets)
        {
           var item = tickets[key];
           var table = document.getElementById('ticket-table');
           var tr = document.createElement('TR');
           var td = document.createElement('TD');
           td.innerHTML = ++key;
           tr.appendChild(td);
           td = document.createElement('TD');
           td.innerHTML = item.title;
           tr.appendChild(td);
           td = document.createElement('TD');
           td.innerHTML = priority[item.priority];
           tr.appendChild(td);
           td = document.createElement('TD');
           td.innerHTML = item.created_by;
           tr.appendChild(td);
           td = document.createElement('TD');
           td.innerHTML = status[item.status];
           tr.appendChild(td);
           td = document.createElement('TD');
           td.innerHTML = item.date;
           tr.setAttribute('data-id',item.id);
           tr.appendChild(td);
           tr.classList.add('ticket');
           tr.style.cursor = 'pointer';
           table.appendChild(tr);
        }
    });
    response.fail(function(jqXHR, textStatus, errorThrown){
        $('#NotiflixLoadingWrap').remove();
        Notiflix.Notify.Failure('حطا در ارتباط', {cssAnimationStyle:'zoom', cssAnimationDuration:500,});
        console.log(jqXHR.status);
        console.log(textStatus);
        console.log(errorThrown);
    });
}
