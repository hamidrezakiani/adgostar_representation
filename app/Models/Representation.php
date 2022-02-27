<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class Representation extends Authenticatable
{
    use HasFactory, Notifiable, SoftDeletes;

    protected $appends = ['logoUrl'];
    protected $guard = 'agent';
    public function getLogoUrlAttribute()
    {
        return env('API_URL').$this->logo;
    }
}
