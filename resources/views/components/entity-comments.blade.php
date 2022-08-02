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
