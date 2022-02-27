<?php

use App\Http\Controllers\User\DashboardController;
use Illuminate\Http\Request;
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

Route::get('page/{url}', function (Request $request, $url) {
    if ($request->all()) {
        $url .= '?';
        foreach ($request->all() as $key => $value) {
            $url .= $key . '=' . $value . '&';
        }
        $url = substr($url, 0, strlen($url) - 1);
    }
    $url = "user/" . $url;
    return view('User.layout.master', compact('url'));
});
Route::get('/',[DashboardController::class,'dashboard']);
Route::get('/tickets',function(){return view('User.tickets');});
Route::get('/ticket/create',function(){return view('User.CreateTicket');});

Route::get('/categories', function (Request $request) {
    if ($request->category_id) {
        $categoryFlag = 'subCats';
        $category_id = $request->category_id;
    } else {
        $category_id = NULL;
        $categoryFlag = 'parents';
    }
    return view('User.categories', compact(['categoryFlag', 'category_id']));
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

Route::get('/orders', function (Request $request) {
    $flag = $request->flag;
    return view('User.orders',compact(['flag']));
});

Route::get('/order', function (Request $request) {
    $order_id = $request->order_id;
    return view('User.order', compact(['order_id']));
});

