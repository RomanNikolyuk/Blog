<x-header/>

<section class="site-section py-sm">
    <div class="container">
        <div class="row">
            <div class="col-md-6">
                <h2 class="mb-4">Posts</h2>
            </div>
        </div>
        <div class="row blog-entries">
            <div class="col-md-14 col-lg-12 main-content">
                <div class="row">
                    @foreach($articles as $article)
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
                    @endforeach
                </div>
                @if(method_exists($articles, 'hasPages') && $articles->hasPages())
                    <div class="row mt-5">
                        <div class="col-md-12 text-center">
                            {!! $articles->links() !!}
                        </div>
                    </div>
                @endif
            </div>
        </div>
    </div>
</section>

<x-footer/>