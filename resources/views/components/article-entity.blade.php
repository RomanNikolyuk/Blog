<div class="col-md-6">
    <a href="{{ route('article.view', $article->id) }}"
       class="blog-entry element-animate fadeIn element-animated" data-animate-effect="fadeIn">
        <img src="{{ $article->image }}"
             alt="Image placeholder" data-pagespeed-url-hash="2774640817">
        <div class="blog-content-body">
            <div class="post-meta">
                <span class="mr-2">{{ $article->created_at->format('M d, Y') }}</span> •
                <span class="ml-2"><span class="fa fa-comments"></span> {{ $article->comments_count }}</span>
            </div>
            <h2>{{ $article->title }}</h2>
        </div>
    </a>
</div>
