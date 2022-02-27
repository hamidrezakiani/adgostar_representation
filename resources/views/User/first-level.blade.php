<!DOCTYPE html>
<html lang="en">
<head>
     <style class="style">
       th{
           text-align: right;
           cursor: pointer;
       }

       .arrow{
           font-size: 20px;
           margin-right: 8px;
           color: #999;
       }

       #btn-back{
           font-size: 20px;
           color: #999;
           display: none;
       }

       .card-body table-responsive p-0{
            max-height: 80vmax;
       }

     </style>
     <link rel="stylesheet" href="{{asset('plugins/persian-datepicker/persian-datepicker.min.css')}}">
</head>
<body>
    <div class="container-fluid">
        <!-- Modal -->
  <div class="modal fade" id="myModal" role="dialog">
    <div class="modal-dialog modal-sm">
      <div class="modal-content">
        <div class="modal-header">
          <h6 class="modal-title">َشماره تلفن خود را همراه صفر وارد کنید</h6>
        </div>
        <div class="modal-body">
          <div class="form-group">
                <input id="user-phone-number" type="number" class="form-control" placeholder="">
                <label id="user-phone-number-error" class="control-label text-danger errors" for="ticket-title">
                <i class="fa fa-times-circle-o"></i></label>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" id="btn-guest-shop" class="btn btn-success">ادامه</button>
        </div>
      </div>
    </div>
  </div>
        <div class="row" id="categories">
            <div class="col-xl-9 col-lg-9 col-md-10 col-sm-12">
              <div class="card">
                <div id="card-header" class="card-header">
                  <h3 class="card-title" id="category-name">اطلاعات سفارش</h3>
                  <div class="card-tools">
                    <div class="input-group input-group-sm" style="width: 150px;display:inline">
                        <div class="input-group-append">
                          <span id="btn-back" class="fa fa-arrow-left"></span>
                        </div>
                    </div>
                  </div>
                </div>
                <!-- /.card-header -->
                <div id="properties-div" class="card-body row p-20">
                   <div class="col-xl-6 col-lg-6 col-md-12 col-sm-12">
                       <div class="form-group">
                        <label>تعداد سفارش</label>
                        <input id="count-order-input" value="{{$count}}" type="number" class="form-control" placeholder="0">
                        <label id="count-order-error" class="control-label text-danger errors" for="ticket-title">
                        <i class="fa fa-times-circle-o"></i></label>
                       </div>
                   </div>
                </div>
                <div class="card-body row p-20">
                   <div class="col-xl-6 col-lg-6 col-md-12 col-sm-12">
                       <div class="form-group">
                        <label>انتخاب تاریخ</label>
                        <input readonly class="form-control date" id="order-date"  type="text">
                        <label id="count-order-error" class="control-label text-danger errors" for="ticket-title">
                        <i class="fa fa-times-circle-o"></i></label>
                       </div>
                       <input type="hidden" id="timestamp">
                   </div>
                   <div class="col-xl-6 col-lg-6 col-md-12 col-sm-12">
                       <div class="form-group">
                        <label>انتخاب ساعت</label>
                        <select id="order-time" class="form-control">
                          <option value="0" selected>00</option>
                          <option value="1">01</option>
                          <option value="2">02</option>
                          <option value="3">03</option>
                          <option value="4">04</option>
                          <option value="5">05</option>
                          <option value="6">06</option>
                          <option value="7">07</option>
                          <option value="8">08</option>
                          <option value="9">09</option>
                          <option value="10">10</option>
                          <option value="11">11</option>
                          <option value="12">12</option>
                          <option value="13">13</option>
                          <option value="14">14</option>
                          <option value="15">15</option>
                          <option value="16">16</option>
                          <option value="17">17</option>
                          <option value="18">18</option>
                          <option value="19">19</option>
                          <option value="20">20</option>
                          <option value="21">21</option>
                          <option value="22">22</option>
                          <option value="23">23</option>
                        </select>
                       </div>
                   </div>
                </div>
                <!-- /.card-body -->
              </div>
              <!-- /.card -->
            </div>
            <div class="col-xl-3 col-lg-3 col-md-2 col-sm-12">
                <div class="card">
                <div id="card-header" class="card-header">
                  <h3 class="card-title" id="category-name">ثبت سفارش</h3>
                </div>
                <!-- /.card-header -->
                <div class="card-body row p-20">
                   <p><span>نام سرویس : </span><span id="product-name"></span>(<span id="item-name"></span>)</p>
                    <p><span>تعداد سفارش  : </span><span id="count-order">{{$count}}</span></p>
                    <p><span>قیمت هر عدد : </span><span id="unit-cost"></span><span> تومان</span></p>
                    <p><span>مبلغ کل : </span><span id="calculated-cost"></span><span> تومان</span></p>
                    <p><button id="btn-next" class="btn btn-success" style="padding-right: 10px !important;padding-left: 10px !important;" >تایید و ثبت  سفارش</button></p>
                </div>
                <!-- /.card-body -->
              </div>
            </div>
        </div><!-- /.row -->
      </div><!-- /.container-fluid -->
    <script class="script">
      var itemId = '{{$item_id}}';
      var count = '{{$count}}';
    </script>
    <script class="script" src="{{asset('dist/js/pages/user/first-level.js')}}"></script>
    <script class="script" src="{{asset('dist/js/pages/user/first-level-event.js')}}"></script>
    <script class="script" src="{{asset('dist/js/pages/user/first-level-validation.js')}}"></script>
    <script src="{{asset('plugins/persian-datepicker/persian-date.min.js')}}"></script>
    <script src="{{asset('plugins/persian-datepicker/persian-datepicker.min.js')}}"></script>
    <script type="text/javascript">
    $(document).ready(function() {
    $("#order-date").pDatepicker({
      observer: true,
      format: 'dddd DD MMMM YYYY',
      altField: '#timestamp'
    });
    });
</script>
</body>
</html>


