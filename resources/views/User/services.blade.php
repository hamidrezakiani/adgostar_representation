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
</head>
<body>
    <div class="container-fluid">
        <div class="row" id="categories">
            <div class="col-12">
              <div class="card">
                <div id="card-header" class="card-header">
                  <h3 class="card-title" id="category-name">انتخاب دسته</h3>
                  <div class="card-tools">
                    <div class="input-group input-group-sm" style="width: 150px;display:inline">
                        <div class="input-group-append">
                          <span id="btn-back" class="fa fa-arrow-left"></span>
                        </div>
                    </div>
                  </div>
                </div>
                <!-- /.card-header -->
                <div id="service-div" class="card-body row p-20">

                </div>
                <!-- /.card-body -->
              </div>
              <!-- /.card -->
            </div>
        </div><!-- /.row -->
      </div><!-- /.container-fluid -->
    <script class="script">
      var pageCategoryId = '{{$category_id}}';
      var pageServiceFlag = '{{$serviceFlag}}';
    </script>
    <script class="script" src="{{asset('dist/js/pages/user/services.js')}}"></script>
    <script class="script" src="{{asset('dist/js/pages/user/services-event.js')}}"></script>
</body>
</html>


