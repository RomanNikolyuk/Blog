<x-app-layout>
    <x-slot name="header">
        <h2 class="font-semibold text-xl text-gray-800 leading-tight">
            @if(isset($article))
                Editing {{ $article->title }}
            @else
                Creating new blog entity
            @endif
        </h2>
    </x-slot>

    <div class="py-12">
        <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div class="-my-2 py-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 pr-10 lg:px-8">

                <x-errors/>

                <div
                    class=" w-full justify-center align-middle rounded-tl-lg rounded-tr-lg inline-block w-full py-4 overflow-hidden bg-white shadow-lg px-12">

                    <form class="w-full max-w-lg"
                          id="form"
                          action="{{ isset($article) ? route('articles.update', $article->id) : route('articles.store') }}"
                          method="post">
                        @csrf

                        @if(isset($article))
                            {{ method_field('put') }}
                        @endif
                        <div class="flex flex-wrap -mx-3 mb-6">

                            <div class="w-full mb-8">
                                <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                       for="grid-first-name">
                                    Title
                                </label>
                                <input value="{{ $article->title ?? old('title') }}"
                                       class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                                       id="grid-first-name" name="title" type="text" placeholder="Putin has died" >
                            </div>


                            <div class="w-full mb-8">
                                <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                       for="description">
                                    Description
                                </label>
                                <div id="description"></div>
                            </div>



                            <div class="w-full mb-8">
                                <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                       for="grid-password">
                                    Image
                                </label>
                                <input name="image"
                                       value="{{ old('image', 'https://via.placeholder.com/640x480.png/009999?text=quia') }}"
                                       class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white">
                            </div>
                        </div>
                        <div class="md:flex md:items-center">
                            <div class="md:w-1/3">
                                <button type="submit"
                                        class="inline-block px-6 py-2 text-xs font-medium leading-6 text-center text-white uppercase transition bg-blue-700 rounded-full shadow ripple hover:shadow-lg hover:bg-blue-800 focus:outline-none">
                                    {{ __('Save') }}
                                </button>
                            </div>
                            <div class="md:w-2/3"></div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
    @section('scripts')
        <script src="{{ asset('js/articles.js') }}" defer data-data="{{ $article->rawDescription ?? '' }}" data-id="{{ $article->id ?? ''}}"></script>
    @endsection
</x-app-layout>
