<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:api');


Route::post('/tip', function(Request $request) {
    $value = $request->input('value');
    $numPeople = $request->input('numPeople');
    $percent = $request->input('inputPercent');
    
    return [
        "tip" => $value * $percent,
        "total" => $value * $percent + $value,
        "split" => ($value * $percent + $value)/$numPeople
    ];
});
