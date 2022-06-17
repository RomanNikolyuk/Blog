<?php

namespace App\Listeners;

use App\Models\View;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;

class ViewCreate
{
    /**
     * Create the event listener.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     *
     * @param object $event
     * @return void
     */
    public function handle($event)
    {
        if (is_null(
            View::findUserRow($event->article_id)->first()
        )
        ) {
            View::create(['article_id' => $event->article_id, 'ip_address' => request()->ip()]);
        }
    }
}
