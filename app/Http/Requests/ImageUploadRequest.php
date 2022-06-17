<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;

class ImageUploadRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'image' => 'required|file|mimes:jpg,png,bmp,gif,jpeg,webp'
        ];
    }

    protected function failedValidation(Validator $validator)
    {
        return response()->json($validator->errors()->toJson(), 422);
    }
}
