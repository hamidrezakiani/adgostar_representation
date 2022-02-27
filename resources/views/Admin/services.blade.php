<html lang="en">
<head>
     <style class="style">
         input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
.senior-representation-profit-input,.normal-representation-profit-input,.user-profit-input
{
    max-width: 80px;
}
input[type=number] {
  -moz-appearance: textfield !important;
  font-size: 13px;
}
         td{
            word-break: break-all;
            text-align: center;
            vertical-align: middle;
         }
         .input-label{
            font-size: 12px;
         }
         .input-name{
            font-size: 12px;
         }
       th{
           text-align: center;
       }
       .operator{
           padding: 1px,1px,1px,1px;
           font-size: 10px;
           margin: 2px;
       }
       .operator.remove-category
       {
           font-size: 14px;
       }
       .operator.add-subCat
       {
        font-size: 12px;
       }
       .category-operator{
           width: 18%;
       }
       .category-label{
           width: 18%;
           font-size: 14px;
       }
       .category-name{
           width: 18%;
           font-size: 14px;
       }
       .category-parent{
           width: 18%;
           font-size: 14px;
       }
       .category-details{
           width: 12%;
           font-size: 12px;
       }

       .category-show-parent{
           width: 18%;
           font-size: 14px;
       }
       .breadcrumb-item a{
          color: inherit;
          cursor: pointer;
       }
       .breadcrumb-item.active a{
           color: blueviolet;
       }
       #add-subCat-name{
           text-decoration: underline;
           color:chartreuse;
           cursor: pointer;
       }
    .input-error{
      background: rgb(2,0,36);
       background: linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(0,212,255,1) 0%, rgba(255,156,186,1) 0%);
     }
     </style>
</head>
<body>
  <button type="button" id="btn-periodCost" style="display:none" class="btn btn-primary" data-toggle="modal" data-target="#periodCostModal">
  Launch demo modal
</button>
    <div class="container-fluid">
       <div class="modal fade bd-example-modal-lg" id="periodCostModal" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
          <div class="modal-dialog modal-lg">
            <div class="modal-content">
              <div class="modal-header">
                <h6 class="modal-title" id="exampleModalLongTitle">بازه ها</h6>
              </div>
              <div class="modal-body">
                <div class="row">
                    <div class="col-12">
                          <table  class="table table-hover table-bordered" style="font-size: 12px;">
                          <thead>
                              <tr>
                                <th rowspan="2">از</th>
                                <th rowspan="2">تا</th>
                                <th rowspan="2">قیمت پایه</th>
                                 <th colspan="6">قیمت های فروش</th>
                              </tr>
                              <tr>
                                <th colspan="2">کاربر</th>
                                <th colspan="2">نماینده معمولی</th>
                                <th colspan="2">نماینده ارشد</th>
                               </tr>
                             </thead>
                             <tbody id="period-table">

                             </tbody>
                           </table>
                   </div>
                </div>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">بستن</button>
                <button type="button" class="btn btn-success mr-2" id="save-period-changes">ذخیره تغییرات</button>
              </div>
            </div>
          </div>
        </div>
        <div class="row" id="categories">
            <div class="col-12">
              <div class="card">
                <div class="card-header">
                  <h3 class="card-title">سرویس ها</h3>
                  <div class="card-tools">
                    <div class="input-group input-group-sm" style="width: 150px;">
                        <div class="input-group-append">

                        </div>
                    </div>
                  </div>
                </div>
                <!-- /.card-header -->
                <div class="card-body table-responsive p-0">
                  <table  class="table table-bordered">
                    <thead>
                        <tr>
                            {{-- <th>ردیف</th> --}}
                            <th>نام سرویس</th>
                            <th>نام دسته</th>
                            <th>آیتم ها</th>
                            <th>عملیات</th>
                          </tr>
                    </thead>
                    <tbody id="service-table">

                    </tbody>
                  </table>
                </div>
                <!-- /.card-body -->
              </div>
              <!-- /.card -->
            </div>
        </div><!-- /.row -->
      </div><!-- /.container-fluid -->
    <script class="script">
      var pageCategoryId = '{{$category_id}}';
      var pageCategoryFlag = '{{$categoryFlag}}';
      var pageProductFlag = '{{$productFlag}}';
    </script>
    <script class="script" src="{{asset('dist/js/pages/admin/services.js')}}"></script>
    <script class="script" src="{{asset('dist/js/pages/admin/services-event.js')}}"></script>
</body>
</html>


