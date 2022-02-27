<?php
namespace App\Services\Auth;

use App\Lib\ResponseTemplate;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class LogoutService extends ResponseTemplate
{
    public function logout()
    {
        Auth::logout();
        return redirect('/login');
    }
}
