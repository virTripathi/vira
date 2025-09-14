<?php

namespace App\Providers;

use App\Broadcasting\FirebaseChannel;
use Illuminate\Support\ServiceProvider;
use Kreait\Firebase\Contract\Messaging;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        //
    }

    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
         $this->app->when(FirebaseChannel::class)
        ->needs(Messaging::class)
        ->give(fn() => app('firebase.messaging'));
    }
}
