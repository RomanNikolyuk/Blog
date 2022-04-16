<?php

namespace App\Models;

use App\Traits\UserRow;
use Database\Factories\LikeFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Like extends Model
{
    use UserRow;

    public $timestamps = false;
    use HasFactory;
    protected $fillable = ['article_id', 'ip_address'];

    protected static function newFactory()
    {
        return LikeFactory::new();
    }
}
