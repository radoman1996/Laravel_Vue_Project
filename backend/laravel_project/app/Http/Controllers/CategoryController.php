<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Category;

class CategoryController extends Controller
{
	public function getCategories() {
		$datas = Category::all();
		return response()->json($datas);
	}

    public function createCategory(Request $request) {
    	$data = new Category();
    	$data->name = $request->input('name');
    	$data->save();
    	$response = array(
			"msg" => "Uspjesno kreirana kategorija proizvoda",
			"type" => "success"
		);
    	return $response;
    }
}
