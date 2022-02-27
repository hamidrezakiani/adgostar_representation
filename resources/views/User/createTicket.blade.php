@extends('layout.master')
@section('header-title','تیکت جدید')
@section('page-route')

@endsection
@section('sidebar')
    @include('layout.user-sidebar')
@endsection
@section('content')
<section class="content">
    <div class="container-fluid">
        <div class="row">
            <div class="col-md-3"></div>
            <div class="col-md-6">
              <!-- general form elements -->
              <div class="card card-primary">
                <div class="card-header">
                  <h3 class="card-title">ارسال تیکت جدید</h3>
                </div>
                <!-- /.card-header -->
                  <div class="card-body">
                    <div class="form-group">
                        <label>موضوع</label>
                        <input id="ticket-title" type="text" class="form-control" placeholder="موضوع را وارد کنید ...">
                        <label id="title" class="control-label text-danger errors" for="ticket-title"><i class="fa fa-times-circle-o"></i></label>
                      </div>
                    <div class="form-group">
                        <label>اولویت</label>
                        <select id="ticket-priority" class="form-control select2" name="priority" style="width: 100%;">
                          <option value="HIGHT">بالا</option>
                          <option value="MIDDLE" selected="selected">متوسط</option>
                          <option value="LOW">پایین</option>
                        </select>
                    </div>
                      <!-- /.form-group -->
                      <div class="form-group">
                        <label>متن</label>
                        <textarea id="ticket-text" class="form-control" rows="3" placeholder="متن تیکت را وارد کنید ..."></textarea>
                        <label id="text" class="control-label text-danger errors" for="ticket-text"><i class="fa fa-times-circle-o"></i></label>
                      </div>
                  <!-- /.card-body -->

                  <div class="card-footer">
                    <button id="btn-send-ticket" class="btn btn-primary">ارسال</button>
                  </div>
              </div>
            </div>
            <div class="col-md-3"></div>
        </div>
    </div><!-- /.container-fluid -->
  </section>
@endsection

@section('script')
<script>
    $('#group-ticket-sidebar').addClass('active');
    $('#create-ticket-sidebar').addClass('active');
    $('#group-ticket-menu-open').addClass('menu-open');
   </script>
    <script src="{{asset('dist/js/pages/user/createTicket.js')}}"></script>
@endsection

