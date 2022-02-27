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

       .dashed-line{
           border-bottom:1px dashed #bbb;
       }
       #success-payment,#failed-payment{
           display: none;
       }
     </style>
     </head>
<body>
    <div class="container-fluid">
        <div class="row">
            <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12">
               <div class="alert alert-success alert-dismissible fade show" id="success-payment" role="alert">
                  <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                  <strong>پرداخت موفق </strong>پرداخت با موفقیت انجام شد با کلیک روی دکمه پیگیری سفارش میتوانید سفارش خود را پیگیری کنید.
               </div>
               <div class="alert alert-danger alert-dismissible fade show" id="failed-payment" role="alert">
                  <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                  <strong>خطا در پرداخت</strong> پرداخت انجام نشد در صورت کسر وجه طی 72 ساعت آینده به حساب شما باز میگردد.
                </div>
              <div class="card">
                <div id="card-header" class="card-header bg-dark-gradient">
                  <h3 class="card-title" id="category-name">انتخاب نوع پرداخت و پیش فاکتور</h3>
                  <div class="card-tools">
                    <div class="input-group input-group-sm" style="width: 150px;display:inline">
                        <div class="input-group-append">
                          <span id="btn-back" class="fa fa-arrow-left"></span>
                        </div>
                    </div>
                  </div>
                </div>
                <!-- /.card-header -->
                <div class="card-body row p-20">
                   <div class="col-xl-9 col-lg-6 col-md-12 col-sm-12">
                      <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 p-2">
                          <span class="font-weight-bold">نام سرویس : </span><span id="product-name">...</span> - <span class="font-weight-light" id="item-name">...</span>
                      </div>
                      <div class="dashed-line col-xl-12 col-lg-12 col-md-12 col-sm-12"></div>
                      <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 p-2">
                          <span class="font-weight-bold">زمان شروع سفارش : </span><span id="start-time">...</span>
                      </div>
                      <div class="dashed-line col-xl-12 col-lg-12 col-md-12 col-sm-12"></div>
                      <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 p-2">
                          <span class="font-weight-bold">زمان تقریبی اتمام سفارش : </span><span id="end-time">...</span>
                      </div>
                      <div class="dashed-line col-xl-12 col-lg-12 col-md-12 col-sm-12"></div>
                      <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 p-2">
                          <span class="font-weight-bold">تعداد سفارش  : </span><span id="count-order">...</span>
                      </div>
                      <div class="dashed-line col-xl-12 col-lg-12 col-md-12 col-sm-12"></div>
                      <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 p-2">
                          <span class="font-weight-bold">قیمت واحد : </span><span id="unit-price" >...</span><span> تومان</span>
                      </div>
                      <div class="dashed-line col-xl-12 col-lg-12 col-md-12 col-sm-12"></div>
                      <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 p-2">
                          <span class="font-weight-bold">قیمت کل : </span><span id="cost">...</span><span> تومان</span>
                      </div>
                      <div class="dashed-line col-xl-12 col-lg-12 col-md-12 col-sm-12"></div>
                      <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 p-2">
                          <span class="font-weight-bold"> مبلغ کسر شده از کیف پول : </span><span id="wallet-deducted">...</span><span> تومان</span>
                      </div>
                      <div class="dashed-line col-xl-12 col-lg-12 col-md-12 col-sm-12"></div>
                      <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 p-2 bg-success-gradient bg-light">
                          <span class="font-weight-bold"> مبلغ قابل پرداخت : </span><span id="ultimate-cost">...</span><span> تومان</span>
                      </div>
                      <div class="dashed-line col-xl-12 col-lg-12 col-md-12 col-sm-12"></div>
                   </div>
                   <div id="properties-div" class="col-xl-3 col-lg-6 col-md-12 col-sm-12">

                   </div>
                   <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12" style="text-align: center">
                      <a id="btn-pay" href="{{env('PAYMENT_URL')}}?propertyType=ORDER&propertyId={{$order_id}}" class="btn btn-success pr-5 pl-5 mt-5">پرداخت</a>
                      <button  id="btn-orders" class="btn btn-success pr-5 pl-5 mt-5 page-links" data-url='/user/orders' style="display: none">پیگیری سفارش</button>
                   </div>

                </div>
                <!-- /.card-body -->
              </div>
              <!-- /.card -->
            </div>
        </div><!-- /.row -->
      </div><!-- /.container-fluid -->
    <script class="script">
      var orderId = '{{$order_id}}';
    </script>
    <script class="script" src="{{asset('dist/js/pages/user/second-level.js')}}"></script>
    <script class="script" src="{{asset('dist/js/pages/user/second-level-event.js')}}"></script>
</body>
</html>


