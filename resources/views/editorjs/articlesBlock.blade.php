<div class="articles-block__wrapper">
    <p class="articles-block__title">{{ $data->title }}</p>
    <div class="articles-block__container">
        <ul class="articles-block__list">
            @foreach($data->links as $link)
                @php
                    $articleId = Url::fromString($link)->getLastSegment();
                    $articleTitle = Article::find($articleId)?->title ?? $link;
                @endphp
                <li class='articles-block__list-item'>
                    <a href='{{$link}}' class='article-block__link'>{{$articleTitle}}</a>
                </li>

            @endforeach
        </ul>
    </div>
</div>
