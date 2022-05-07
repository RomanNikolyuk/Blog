<?php

namespace App\Models;

use App\Services\HTMLFromEditorJsService;
use Database\Factories\ArticleFactory;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Str;

class Article extends Model
{
    use HasFactory;
    protected $fillable = ['title', 'description', 'slug', 'image'];

    protected static function newFactory(): ArticleFactory
    {
        return ArticleFactory::new();
    }

    public function comments(): HasMany
    {
        return $this->hasMany(Comment::class)->orderByDesc('created_at');
    }

    public function tags(): BelongsToMany
    {
        return $this->belongsToMany(Tag::class);
    }

    public function views(): HasMany
    {
        return $this->hasMany(View::class);
    }

    protected function description() : Attribute
    {
        return Attribute::make(
            get: fn ($description) => $this->getHTMLFromEditorJs($description)
        );
    }

    protected function getHTMLFromEditorJs(String $description) : String
    {
        return (new HTMLFromEditorJsService($description))->produce();
    }

    protected static function boot()
    {
        parent::boot();

        self::creating(function ($model) {
            $model->slug = Str::slug($model->title);
        });
    }
}
