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

//User
Route::post('/login_user', 'UserDataController@loginUser');
Route::post('/create_user', 'UserDataController@createUser');

//Categories
Route::get('/categories', 'CategoryController@getCategories');
Route::post('/create_category', 'CategoryController@createCategory');

//Brands
Route::get('/brands', 'BrandController@getBrands');
Route::post('/create_brand', 'BrandController@createBrand');

//Products
Route::get('/products', 'ProductController@getProducts');
Route::post('/create_product', 'ProductController@createProduct');
Route::post('/update_product', 'ProductController@updateProduct');
Route::post('/delete_product', 'ProductController@deleteProduct');