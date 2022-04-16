<?php

namespace App\Traits;

use Illuminate\Database\Eloquent\Builder;

trait UserRow {

    public function scopeUserRow(Builder $query, int $article_id)
    {
        $query->where('article_id', $article_id)->where('ip_address', request()->ip());
    }
}