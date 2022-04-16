<?php

namespace App\Models;

use App\Traits\UserRow;
use Database\Factories\ViewFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class View extends Model
{
    use UserRow;
    public $timestamps = false;
    use HasFactory;
    protected $fillable = ['article_id', 'ip_address'];

    protected static function newFactory()
    {
        return ViewFactory::new();
    }
}
