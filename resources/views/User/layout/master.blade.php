<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title id="page-title"></title>
    <link id="favicon" rel="icon" href="" type="image/jpeg" sizes="16x16">
    @include('User.layout.style')
    <style>
        .errors{
            display: none;
        }
        .isAdmin,.isAgent,.isUser,.isExecuter{
            display: none;
        }
        input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type=number] {
  -moz-appearance: textfield;
}
    </style>
    <style>
        .main-header{
            z-index: 1000 !important;
        }
    </style>
</head>
<body class="hold-transition sidebar-mini">
    <div class="wrapper">
        @if(auth()->check())
        @include('User.layout.auth-header')
        @include('User.layout.auth-sidebar')
        @else
        @include('User.layout.sidebar')
        @include('User.layout.header')
        @endif
        <!-- Content Wrapper. Contains page content -->
        <div class="content-wrapper">
          <!-- Content Header (Page header) -->
          <div class="content-header">
            <div class="container-fluid">
              <div class="row mb-2">
                <div class="col-sm-6">
                  <h1 class="m-0 text-dark" id="section-title"></h1>
                </div><!-- /.col -->
                <div class="col-sm-6">
                  <ol class="breadcrumb float-sm-left" id="page-routes">

                  </ol>
                </div><!-- /.col -->
              </div><!-- /.row -->
            </div><!-- /.container-fluid -->
          </div> <!-- /.content-header -->
          <section class="content" id="content">

          </section>
        </div> <!-- /.content-wrapper -->
        <footer class="main-footer">
            <strong><a href="https://adgostar.net">ادگستر</a>.</strong>
        </footer>

          <!-- Control Sidebar -->
        <aside class="control-sidebar control-sidebar-dark">
            <!-- Control sidebar content goes here -->
        </aside>
          <!-- /.control-sidebar -->
    </div><!-- ./wrapper -->
    @include('User.layout.script')
    <script>
        let user;
        let api_token;
        let auth = false;
        let apiUrl = '{{env('API_URL')}}';
        let paymentUrl = '{{env('PAYMENT_URL')}}';
        let pageUrl = '{{url($url)}}';
        let baseUrl =  '{{url('')}}';
        let domain = '{{$_SERVER["HTTP_HOST"]}}';
        @if(auth()->check())
        auth = true;
        api_token = '{{auth()->user()->api_token}}';
        let representationKind = '{{auth()->user()->kind}}';
        @endif
        let api;
        let categoriesPageScript = false;
        let servicesPageScript = false;
        let firstLevelPageScript = false;
        let firstLevelValidationScript = false;
        let secondLevelPageScript = false;
        let ordersPageScript = false;
    </script>
    <script src="{{asset('dist/js/api/api.js')}}"></script>
    @if(auth()->check())
    <script src="{{asset('dist/js/api/user-api.js')}}"></script>
    <script src="{{asset('dist/js/pages/user/auth-master.js')}}"></script>
    @else
     <script src="{{asset('dist/js/pages/user/master.js')}}"></script>
    @endif
</body>
</html>
