<div
    class="align-middle inline-block min-w-full shadow overflow-hidden bg-white shadow-dashboard px-8 pt-3 rounded-bl-lg rounded-br-lg">
    <table class="min-w-full">
        <thead>
        <tr>
            <th class="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-blue-500 tracking-wider">
                ID
            </th>
            <th class="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-500 tracking-wider">
                {{ __('ImageBlock') }}
            </th>
            <th class="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-500 tracking-wider">
                {{ __('Title') }}
            </th>
            <th class="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-500 tracking-wider">
                {{ __('Description') }}
            </th>

            <th class="px-6 py-3 border-b-2 border-gray-300"></th>
        </tr>
        </thead>
        <tbody class="bg-white">

        @foreach($articles as $article)
            <tr>
                <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                    <div class="flex items-center">
                        <div>
                            <div class="text-sm leading-5 text-gray-800">#{{ $article->id }}</div>
                        </div>
                    </div>
                </td>
                <td class="px-6 py-4 whitespace-no-wrap border-b text-blue-900 border-gray-500 text-sm leading-5">
                    <div class="text-sm leading-5 text-blue-900"><img src="{{ $article->image }}" style="width: 100px" alt=""> </div>
                </td>
                <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                    <div class="text-sm leading-5 text-blue-900">{{ $article->title }}</div>
                </td>

                <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                    <div class="text-sm leading-5 text-blue-900">{{ Str::limit($article->description, 25) }}</div>
                </td>

                <td class="px-6 py-4 whitespace-no-wrap text-right border-b border-gray-500 text-sm leading-5">
                    <a href="{{ route('articles.edit', $article->id) }}"
                       class="px-5 py-2 border-blue-500 border text-blue-500 rounded transition duration-300 hover:bg-blue-700 hover:text-white focus:outline-none">
                        {{ __('Change') }} ✍
                    </a>
                </td>
            </tr>
        @endforeach

        </tbody>
    </table>
</div>
