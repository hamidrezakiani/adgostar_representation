<?php

use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\Auth\LogoutController;
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

Route::get('page/{url}', function (Request $request, $url) {
    if ($request->all()) {
        $url .= '?';
        foreach ($request->all() as $key => $value) {
            $url .= $key . '=' . $value . '&';
        }
        $url = substr($url, 0, strlen($url) - 1);
    }
    $url = "admin/".$url;
    return view('Admin.layout.master', compact('url'));
});
Route::get('/',[DashboardController::class,'dashboard']);
Route::get('/userTickets',function(){return view('Admin.userTickets');});
Route::get('/userTicket/create',function(){return view('Admin.createUserTicket');});
Route::get('/subsetTickets',function(){return view('Admin.subsetTickets');});
Route::get('/subsetTicket/create',function(){return view('Admin.createSubsetTicket');});
Route::get('/tickets',function(){return view('Admin.tickets');});
Route::get('/ticket/create',function(){return view('Admin.createTicket');});
Route::get('services', function (Request $request) {
    if ($request->category_id) {
        $productFlag = 'categoryProducts';
        $categoryFlag = 'subCats';
        $category_id = $request->category_id;
    } else {
        $category_id = NULL;
        $productFlag = 'all';
        $categoryFlag = 'parents';
    }
    return view('Admin.services', compact(['categoryFlag','productFlag', 'category_id']));
});
