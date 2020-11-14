<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\UserData;
use DB;

class UserDataController extends Controller
{

	public function loginUser(Request $request) {
		$query = "select * from user_data where username = ?";
    	$result = DB::select($query, [$request->input('username')]);

    	if(count($result) == 0) {
    		$response = [];
    		$response[0] = array(
    			"msg" => "Nalog ne postoji",
    			"type" => "error",
                "problem" => "username"
    		);
    		return $response;
    	}
    	if($result[0]->password != $request->input('password')) {
    		$response = [];
    		$response[0] = array(
    			"msg" => "Sifra nije pravilna",
    			"type" => "error",
                "problem" => "password"
    		);
    		return $response;
    	}
    	$result[0]->type = "success";
    	return $result;
	}

    public function createUser(Request $request) {

    	$query = "select * from user_data where username = ?";
    	$result = DB::select($query, [$request->input('username')]);

    	if(count($result) > 0) {
    		$response = array(
    			"msg" => "Nalog vec postoji",
    			"type" => "error",
                "problem" => "username"
    		);
    		return $response;
    	}

    	$data = new UserData();
    	$data->name = $request->input('name');
    	$data->username = $request->input('username');
    	$data->password = $request->input('password');
    	$data->gender = $request->input('gender');
    	$data->admin = 0;
    	$data->save();
    	$data->type = "success";
    	return $data;
    }
}
