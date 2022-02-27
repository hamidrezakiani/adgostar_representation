<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    use HasFactory, Notifiable,SoftDeletes;

    protected $guard = 'user';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name',
        'email',
        'password',
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    protected $appends = ['isAgent', 'isUser', 'isExecuter', 'isAdmin'];

    public function getIsAgentAttribute()
    {
        if($this->role == 'OWNER')
          return $this->representation()->first();
        else
          return false;
    }

    public function getIsUserAttribute()
    {
        return $this;
    }

    public function getIsExecuterAttribute()
    {
        if($executer = Executer::where('phone',$this->phone)->first())
          return true;
        else
          return false;
    }

    public function getIsAdminAttribute()
    {
        if ($admin = Admin::where('phone', $this->phone)->first())
            return true;
        else
            return false;
    }

    public function representation()
    {
        return $this->belongsTo(Representation::class);
    }
}
