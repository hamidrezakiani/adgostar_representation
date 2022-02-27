<aside class="main-sidebar sidebar-dark-primary elevation-4">
    <!-- Brand Logo -->
    <a href="index3.html" class="brand-link">
      <img id="sidebar-logo" src="{{env('API_URL')}}/media/images/representation/setting/load.gif" class="brand-image img-circle elevation-3"
           style="opacity: .8">
      <span class="brand-text font-weight-light">پنل مدیریت <span class="representation-title">....</span></span>
    </a>

    <!-- Sidebar -->
    <div class="sidebar" style="direction: ltr">
      <div style="direction: rtl">
        <!-- Sidebar user panel (optional) -->
        <div class="user-panel mt-3 pb-3 mb-3 d-flex">
          <div class="image">
            <img id="avatar" src="{{env('API_URL')}}/media/images/representation/setting/load.gif" class="img-circle elevation-2" alt="User Image">
          </div>
          <div class="info">
            <a href="#" id="user-name" class="d-block">دریافت اطلاغات....</a>
          </div>
        </div>

        <!-- Sidebar Menu -->
        <nav class="mt-2">
          <ul class="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
            <li class="nav-item" id="group-participation-menu-open">
                <a id="group-participation-sidebar" data-url='/services' class="nav-link page-links">
                  <i class="nav-icon fa fa-tree"></i>
                  <p>
                    سرویس ها
                  </p>
                </a>
            </li>
            <li class="nav-item has-treeview" id="group-user-ticket-menu-open">
                <a href="#" id="group-user-ticket-sidebar" class="nav-link">
                  <i class="nav-icon fa fa-tree"></i>
                  <p>
                    تیکت کاربران
                    <i class="fa fa-angle-left right"></i>
                  </p>
                </a>
                <ul class="nav nav-treeview">
                  <li class="nav-item">
                    <a href="{{url('admin/userTicket/create')}}" id="create-user-ticket-sidebar" class="nav-link">
                      <i class="fa fa-circle-o nav-icon"></i>
                      <p>ارسال تیکت</p>
                    </a>
                  </li>
                  <li class="nav-item">
                    <a href="{{url('admin/userTickets')}}" id="list-user-ticket-sidebar" class="nav-link">
                      <i class="fa fa-circle-o nav-icon"></i>
                      <p>لیست تیکت ها</p>
                    </a>
                  </li>
                </ul>
            </li>
            <li class="nav-item has-treeview" id="group-subset-ticket-menu-open">
                <a href="#" id="group-subset-ticket-sidebar" class="nav-link">
                  <i class="nav-icon fa fa-tree"></i>
                  <p>
                    تیکت زیرمجموعه
                    <i class="fa fa-angle-left right"></i>
                  </p>
                </a>
                <ul class="nav nav-treeview">
                  <li class="nav-item">
                    <a href="{{url('admin/subsetTicket/create')}}" id="create-subset-ticket-sidebar" class="nav-link">
                      <i class="fa fa-circle-o nav-icon"></i>
                      <p>ارسال تیکت</p>
                    </a>
                  </li>
                  <li class="nav-item">
                    <a href="{{url('admin/subsetTickets')}}" id="list-subset-ticket-sidebar" class="nav-link">
                      <i class="fa fa-circle-o nav-icon"></i>
                      <p>لیست تیکت ها</p>
                    </a>
                  </li>
                </ul>
            </li>
            <li class="nav-item has-treeview" id="group-ticket-menu-open">
                <a href="#" id="group-ticket-sidebar" class="nav-link">
                  <i class="nav-icon fa fa-tree"></i>
                  <p>
                    تیکت های من
                    <i class="fa fa-angle-left right"></i>
                  </p>
                </a>
                <ul class="nav nav-treeview">
                  <li class="nav-item">
                    <a data-url="/ticket/create" id="create-ticket-sidebar" class="nav-link page-links">
                      <i class="fa fa-circle-o nav-icon"></i>
                      <p>ارسال تیکت</p>
                    </a>
                  </li>
                  <li class="nav-item">
                    <a href="{{url('admin/tickets')}}" id="list-ticket-sidebar" class="nav-link">
                      <i class="fa fa-circle-o nav-icon"></i>
                      <p>لیست تیکت ها</p>
                    </a>
                  </li>
                </ul>
            </li>
          </ul>
        </nav>
        <!-- /.sidebar-menu -->
      </div>
    </div>
    <!-- /.sidebar -->
  </aside>
