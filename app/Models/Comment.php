<?php

namespace App\Models;

use Database\Factories\CommentFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Comment extends Model
{
    use HasFactory;
    protected $fillable = ['article_id', 'subject', 'text'];

    protected static function newFactory()
    {
        return CommentFactory::new();
    }

    public function article()
    {
        return $this->belongsTo(Article::class);
    }
}
