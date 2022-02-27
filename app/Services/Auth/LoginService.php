<?php
namespace App\Services\Auth;

use App\Repositories\Eloquent\Auth\LoginRepository;
use App\Lib\ResponseTemplate;
use App\Models\Account;
use App\Models\Admin;
use App\Models\Representation;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class LoginService extends ResponseTemplate{

    protected $loginRepository;

    public function __construct(LoginRepository $loginRepository)
    {
        $this->loginRepository = $loginRepository;
    }

    public function loginPage()
    {
        $domainName = $_SERVER['HTTP_HOST'];
        $representation = Representation::where('domain',$domainName)->select(['backgroundLogin','title'])->first();
        return view('Auth.login',compact(['representation']));
    }

    public function login(Request $request)
    {
        $domainName = $_SERVER['HTTP_HOST'];
        $representation = Representation::where('domain',$domainName)->first();
        $user = User::where('phone',$request->phone)
        ->where('representation_id',$representation->id)->first();
        if($user && Hash::check($request->password, $user->password))
        {
           Auth::login($user);
           if($user->isAgent)
           {
            Auth::guard('user')->login($user);
            Auth::guard('agent')->login($representation);
             return redirect('/admin/page/dashboard');
           }
           else
           {
            Auth::guard('user')->login($user);
            return redirect('/user/page/dashboard');
           }

        }
        else
        {
           return redirect()->back();
        }
    }

}
