<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Brand;

class BrandController extends Controller
{
    public function getBrands() {
		$datas = Brand::all();
		return response()->json($datas);
	}

    public function createBrand(Request $request) {
    	$data = new Brand();
    	$data->name = $request->input('name');
    	$data->save();
    	$response = array(
			"msg" => "Uspjesno kreirana marka proizvoda",
			"type" => "success"
		);
    	return $response;
    }
}
