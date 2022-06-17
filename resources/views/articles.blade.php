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
                        <x-article-entity :article="$article"/>
                    @endforeach
                </div>
                <div class="row mt-5">
                    <div class="col-md-12 text-center">
                        {!! $articles->links() !!}
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

<x-footer/>
