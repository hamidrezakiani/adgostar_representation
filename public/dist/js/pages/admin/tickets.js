$(document).ready(function(){
       Notiflix.Block.Pulse('#tickets','لطفا صبر کنید...');
        loadTickets();
});

$(document).on('click','.ticket',function(){
    Notiflix.Block.Pulse('#tickets','لطفا صبر کنید...');
   loadMessages($(this).attr('data-id'));
})


$(document).on('click','#btn-send-message',function(){
   Notiflix.Block.Pulse('#messages','لطفا صبر کنید...');
   sendMessage($(this).attr('data-id'));
   loadMessages($(this).attr('data-id'));
});

$(document).on('click','#ticket-list-route',function(){
  $('#ticket-messages-route').css('display','none');
  $('#ticket-list-route').css('cursor','auto');
  $('#section-title').html('لیست تیک کاربران');
  $('#tickets').css('display','flex');
    $('#messages').css('display','none');
    $('#ticket-table').html('');
    Notiflix.Block.Pulse('#tickets','لطفا صبر کنید...');
    loadTickets();
});

function sendMessage(id)
{
    $('.errors').css('display','none');
    var data = new FormData();
    data.append('text',$('#message-text').val());
    let api = new AdminApi();
    let response = api.storeMessage(data,id);
    response.done(function(data,status){
        $('#message-text').val('');
        Notiflix.Report.Success("موفق",'پیام شما ارسال شد','باشه');

    });
    response.fail(function(jqXHR, textStatus, errorThrown){
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
    let api = new AdminApi();
    let response = api.getTicketMessages(id);
    response.done(function(data,status){
        $('.notiflix-block-wrap').remove();
        $('#messages').css('display','flex');
        $('#tickets').css('display','none');
        $('#ticket-messages-route').css('display','flex');
        $('#ticket-list-route').css('cursor','pointer');
        $('#section-title').html('جزییات تیکت کاربر');
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
        $('#ticket-user-fullName').html(ticket.fullName);
        if(ticket.status == 'CLOSE')
          $('#box-send-message').css('display','none');
        else
          $('#box-send-message').css('display','flex');
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
           if(!(item.representation_id == null))
             {
               parentDiv.classList.add('right');
               spanOne.classList.add('float-right');
               spanTwo.classList.add('float-left');
               if(item.created_by == 'YOU')
               {
                spanOne.innerHTML = 'شما';
                img.src = apiUrl+'/media/images/representation/setting/user.jpg';
               }
               else
               {
                spanOne.innerHTML = 'ادمین';
                img.src = apiUrl+'/media/images/representation/setting/admin.jpg';
               }
             }
             else
             {
                 spanOne.innerHTML = ticket.fullName;
                 spanOne.classList.add('float-left');
                 img.src = ticket.logo;

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
    let api = new AdminApi();
    let response = api.getTickets();
    response.done(function(data,status){
        $('.notiflix-block-wrap').remove();
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
