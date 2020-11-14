<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Storage;

use Illuminate\Http\Request;

use App\Product;

use DB;

class ProductController extends Controller
{
    public function getProducts() {
        $query = "select p.id, p.name, p.price, p.description, p.image, p.category_id, p.brand_id, c.name as c_name, b.name as b_name
                  from products as p
                  inner join categories as c on c.id = p.category_id
                  inner join brands as b on b.id = p.brand_id";
    	$datas = DB::select($query);
    	return response()->json($datas);
    }

    public function createProduct(Request $request) {

		if($request->hasFile('file')){
            $filenameWithExt = $request->file('file')->getClientOriginalName();
            $filename = pathinfo($filenameWithExt, PATHINFO_FILENAME);
            $extension = $request->file('file')->getClientOriginalExtension();
            $fileNameToStore = $filename.'_'.time().'.'.$extension;
            $path = $request->file('file')->storeAs('public/images', $fileNameToStore);
        }

        $json_data = json_decode($request->input('product'), true);

    	$data = new Product();
    	$data->name = $json_data['name'];
    	$data->price = $json_data['price'];
    	$data->description = $json_data['description'];
    	$data->category_id = $json_data['category'];
    	$data->brand_id = $json_data['brand'];
    	$data->image = $fileNameToStore;

    	$data->save();

    	$response = array(
    		"msg" => "Uspjesno je kreiran proizvod",
    		"type" => "success"
    	);

    	return $response;
    }

    public function updateProduct(Request $request) {
        $json_data = json_decode($request->input('product'), true);
        $id = $json_data['id'];
        $data = Product::find($id);

        if($request->hasFile('file')){
            $filenameWithExt = $request->file('file')->getClientOriginalName();
            $filename = pathinfo($filenameWithExt, PATHINFO_FILENAME);
            $extension = $request->file('file')->getClientOriginalExtension();
            $fileNameToStore = $filename.'_'.time().'.'.$extension;
            $path = $request->file('file')->storeAs('public/images', $fileNameToStore);
        }

        $data->name = $json_data['name'];
        $data->price = $json_data['price'];
        $data->description = $json_data['description'];
        $data->category_id = $json_data['category'];
        $data->brand_id = $json_data['brand'];
        if($request->hasFile('file')) {
            $data->image = $fileNameToStore;
        }
        $data->save();

        $response = array(
            "msg" => "Uspjesno je izmjenjen proizvod",
            "type" => "success"
        );

        return $response;
    }

    public function deleteProduct(Request $request) {
        $id = $request->input('id');
        $product = Product::find($id);
        Storage::delete('public/images/'.$request->input('image'));
        $product->delete();
        $response = array(
            "msg" => "Uspjesno je izbrisan proizvod",
            "type" => "success"
        );
        return $response;
    }
}
