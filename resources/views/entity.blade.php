<x-header/>

<section class="site-section py-lg">
    <div class="container">
        <div class="row blog-entries element-animate fadeInUp element-animated">
            <div class="col-md-14 col-lg-12 main-content">
                <img src="{{ $article->image }}" alt="Image"
                     class="img-fluid mb-5" style="">
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
                <div class="pt-5">
                    <h3 class="mb-5">{{ $article->comments->count() }} Comments</h3>
                    <ul class="comment-list">
                        @foreach($article->comments as $comment)
                            <div class="comment-body">
                                <h3>{{ $comment->subject }}</h3>
                                <div class="meta">{{ $comment->created_at->format('F d, Y, h:ia') }}
                                </div>
                                <p>{{ $comment->text }}</p>
                                <p><a href="#" class="reply rounded">Reply</a></p>
                            </div>
                        @endforeach
                    </ul>

                    <div class="comment-form-wrap pt-5">
                        <h3 class="mb-5">Leave a comment</h3>
                        <form action="#" class="p-5 bg-light" id="form-comment">
                            <input type="hidden" name="article_id" value="{{ $article->id }}">
                            <div class="form-group">
                                <label for="subject">Subject *</label>
                                <input type="text" class="form-control" id="subject" name="subject">
                            </div>

                            <div class="form-group">
                                <label for="message">Message</label>
                                <textarea name="text" id="message" cols="30" rows="10" class="form-control"></textarea>
                            </div>
                            <div class="form-group">
                                <input type="submit" value="Post Comment" class="btn btn-primary">
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>
<script src="{{ asset('js/article-worker.js') }}"></script>
<x-footer/>
