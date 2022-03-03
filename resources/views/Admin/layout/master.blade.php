<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title id="page-title"></title>
    <link id="favicon" rel="icon" href="" type="image/jpeg" sizes="16x16">
    @include('Admin.layout.style')
    <style>
        .errors{
            display: none;
        }
        .isAdmin,.isAgent,.isUser,.isExecuter{
            display: none;
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
        @include('Admin.layout.header')
        @include('Admin.layout.sidebar')
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
            <strong><a href="https://adgostar.net">ادگستر</a></strong>
        </footer>

          <!-- Control Sidebar -->
        <aside class="control-sidebar control-sidebar-dark">
            <!-- Control sidebar content goes here -->
        </aside>
          <!-- /.control-sidebar -->
    </div><!-- ./wrapper -->
    @include('Admin.layout.script')
    <script>
        let user;
        let api_token;
        let apiUrl = '{{env('API_URL')}}';
        let pageUrl = '{{url($url)}}';
        let baseUrl =  '{{url('')}}';
        api_token = '{{auth()->user()->api_token}}';
        representationKind = '{{auth()->user()->kind}}';
        let api;
        let servicesPageScript = false;
        let categoriesPageScript = false;
    </script>
    <script src="{{asset('dist/js/api/admin-api.js')}}"></script>
    <script src="{{asset('dist/js/pages/admin/master.js')}}"></script>
</body>
</html>
