@extends('layout.master')
@section('header-title','تیکت ها')
@section('page-route')

@endsection
@section('sidebar')
    @include('layout.user-sidebar')
@endsection
@section('content')
<section class="content">
  <div class="container-fluid">
    <div class="row" id="messages">
        <div class="col-lg-4">
            <!-- About Me Box -->
            <div class="card card-primary">
                <div class="card-header">
                  <h3 class="card-title">مشخصات تیکت</h3>
                  <div class="card-tools">
                    <button type="button" class="btn btn-tool" data-widget="collapse"><i class="fa fa-minus"></i>
                    </button>
                  </div>
                </div>
                <!-- /.card-header -->
                <div class="card-body">
                  <strong><i class="fa fa-book mr-1"></i>موضوع</strong>

                  <p class="text-muted" id="ticket-title">
                  </p>

                  <hr>
                  <strong><i class="fa fa-time mr-1"></i>تاریخ ارسال تیکت</strong>

                  <p class="text-muted" id="ticket-created_at"></p>

                  <hr>

                  <strong><i class="fa fa-user mr-1"></i>توسط</strong>

                  <p class="text-muted" id="ticket-created_by"></p>

                  <hr>
                  <strong>اولویت</strong>

                  <p class="text-muted" id="ticket-priority"></p>

                  <hr>
                  <strong>وضعیت</strong>

                  <p class="text-muted" id="ticket-status"></p>

                  <hr>
                  </div>
                <!-- /.card-body -->
              </div>
        </div>
        <div class="col-lg-8">
          <!-- DIRECT CHAT PRIMARY -->
          <div class="card card-primary direct-chat direct-chat-primary">
            <div class="card-header">
              <h3 class="card-title">پیام ها</h3>
            </div>
            <!-- /.card-header -->
            <div class="card-body">
              <!-- Conversations are loaded here -->
              <div id="ticket-chats" class="direct-chat-messages">




              </div>
              <!--/.direct-chat-messages-->


            </div>
            <!-- /.card-body -->
            <div class="card-footer" id="box-send-message">
                <div class="input-group">
                  <input type="text" id="message-text" name="message" placeholder="تایپ پیام ..." class="form-control">
                  <label id="text" class="control-label text-danger errors" for="message-text"><i class="fa fa-times-circle-o"></i></label>
                  <span class="input-group-append">
                    <button type="button" id="btn-send-message" class="btn btn-primary">ارسال</button>
                  </span>
                </div>
            </div>
            <!-- /.card-footer-->
          </div>
          <!--/.direct-chat -->
        </div>
    </div>
    <div class="row" id="tickets">
        <div class="col-12">
          <div class="card">
            <div class="card-header">
              <h3 class="card-title">تیکت ها</h3>

              <div class="card-tools">
                <div class="input-group input-group-sm" style="width: 150px;">
                  <input type="text" name="table_search" class="form-control float-right" placeholder="جستجو">

                  <div class="input-group-append">
                    <button type="submit" class="btn btn-default"><i class="fa fa-search"></i></button>
                  </div>
                </div>
              </div>
            </div>
            <!-- /.card-header -->
            <div class="card-body table-responsive p-0">
              <table  class="table table-hover">
                <thead>
                    <tr>
                        <th>ردیف</th>
                        <th>موضوع</th>
                        <th>اولویت</th>
                        <th>توسط</th>
                        <th>وضعیت</th>
                        <th>تاریخ</th>
                      </tr>
                </thead>
                <tbody id="ticket-table">

                </tbody>
              </table>
            </div>
            <!-- /.card-body -->
          </div>
          <!-- /.card -->
        </div>
      </div><!-- /.row -->

  </div><!-- /.container-fluid -->
</section>
@endsection

@section('script')
<script>
    $('#group-ticket-sidebar').addClass('active');
    $('#list-ticket-sidebar').addClass('active');
    $('#group-ticket-menu-open').addClass('menu-open');
   </script>
    <script src="{{asset('dist/js/api/user-api.js')}}"></script>
    <script src="{{asset('dist/js/pages/user/tickets.js')}}"></script>
@endsection

@section('style')
    <style>
        #messages{
            display: none;
        }
        .direct-chat-messages{
            height: 300px !important;
        }
    </style>
@endsection

