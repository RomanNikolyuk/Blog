<img src="{{ $article->image }}" alt="Image" class="img-fluid mb-5" style="">
<div class="post-meta">
    <span class="mr-2">{{ $article->created_at->format('F d, y') }}</span> •
    <span class="ml-2"><span class="fa fa-comments"></span> {{ $article->comments->count() }}</span>
    <span class="ml-2"><span class="fa fa-eye"></span> {{ $article->views->count() }}</span>
</div>
<h1 class="mb-4">{{ $article->title }}</h1>
<div class="post-content-body">
    <p>{!! $article->description !!}</p>
</div>
<div class="pt-5">
    <p>Tags:
        @foreach($article->tags as $tag)
            <a href="">#{{ $tag->label }}</a>
        @endforeach
    </p>
    <a href="#" data-article-id="{{ $article->id }}" id="like-button">Like</a>
</div>
