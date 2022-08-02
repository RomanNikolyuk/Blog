<x-header/>

<section class="site-section py-lg">
    <div class="container">
        <div class="row blog-entries element-animate fadeInUp element-animated">
            <div class="col-md-14 col-lg-12 main-content">
                <x-entity-content  :article="$article"/>
                <x-entity-comments :article="$article"/>
            </div>
        </div>
    </div>
</section>
<script src="{{ asset('js/article-worker.js') }}"></script>
<x-footer/>
