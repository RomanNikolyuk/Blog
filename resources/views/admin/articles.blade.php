<x-app-layout>
    <x-slot name="header">
        <h2 class="font-semibold text-xl text-gray-700 leading-tight">
            {{ __('Articles') }}
        </h2>
    </x-slot>

    <div class="py-12">
        <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">

            <div class="-my-2 py-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 pr-10 lg:px-8">
                <div
                    class="align-middle rounded-tl-lg
                    rounded-tr-lg inline-block w-full
                    py-4 overflow-hidden bg-white
                    shadow-lg px-12"
                >

                    <a href="{{ route('articles.create') }}"
                       class="mt-5 inline-block px-6 py-2 text-xs font-medium leading-6 text-center text-white uppercase transition bg-blue-700 rounded-full shadow ripple hover:shadow-lg hover:bg-blue-800 focus:outline-none">
                        {{ __('New Article') }}
                    </a>
                </div>


                @if($articles->count() > 0)
                    <x-articles-table :articles="$articles"/>
                @endif
            </div>
        </div>
    </div>

</x-app-layout>
