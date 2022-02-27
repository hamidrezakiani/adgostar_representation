<?php

use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\Auth\LogoutController;
use App\Http\Controllers\UserPageController;
use App\Models\Admin;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('test', function () {
    $admin = Admin::find(4);
    Auth::guard('admin')->login($admin);
    dd(auth('admin'));
});
Route::group(['middleware' => 'auth'], function () {
    Route::get('/logout',[LogoutController::class,'logout'])->name('logout');
});
Route::get('/',function(){
 return redirect('page/categories');
});
Route::get('/login',[LoginController::class,'loginPage'])->name('login');
Route::post('/login',[LoginController::class,'login']);

Route::get('page/{url}', function (Request $request, $url) {
    if ($request->all()) {
        $url .= '?';
        foreach ($request->all() as $key => $value) {
            $url .= $key . '=' . $value . '&';
        }
        $url = substr($url, 0, strlen($url) - 1);
    }
    return view('User.layout.master', compact('url'));
});

Route::get('/categories', function (Request $request) {
    if ($request->category_id) {
        $categoryFlag = 'subCats';
        $category_id = $request->category_id;
    } else {
        $category_id = NULL;
        $categoryFlag = 'parents';
    }
    return view('User.categories', compact(['categoryFlag','category_id']));
});

Route::get('/services', function (Request $request) {
    if ($request->category_id) {
        $serviceFlag = 'categoryServices';
        $category_id = $request->category_id;
    } else {
        $category_id = NULL;
        $serviceFlag = 'all';
    }
    return view('User.services', compact(['serviceFlag', 'category_id']));
});

Route::get('/first-level', function (Request $request) {
    $item_id = $request->item_id;
    $count = $request->count;
    return view('User.first-level', compact(['item_id', 'count']));
});

Route::get('/second-level', function (Request $request) {
    $order_id = $request->order_id;
    return view('User.second-level', compact(['order_id']));
});

Route::get('/403',function(){
   abort(403);
});

// Route::get('/', function () {
//     echo "HTTP_HOST [{$_SERVER['HTTP_HOST']}]\n";
// echo "SERVER_NAME [{$_SERVER['SERVER_NAME']}]";
// });
