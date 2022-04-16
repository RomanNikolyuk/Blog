async function check() {
    let body = new URLSearchParams();
    let $like = document.getElementById('like-button');

    body.append('article_id', $like.dataset.articleId);

    const json = await fetch('/api/like/check', {
        method: "POST",
        body
    }).then(response => {
        return response.json();
    });

    if (json.liked) {
        $like.textContent = `Dislike (${json.count})`;
    } else {
        $like.textContent = `Like (${json.count})`;
    }
}

check();

document.getElementById('form-comment').addEventListener('submit', (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    let body = new URLSearchParams();

    for (let [key, value] of formData) {
        body.append(key, value);
    }

    fetch('/api/comment', {
        method: "POST",
        body
    }).then(result => {
        event.target.innerHTML = `<div class="alert alert-success" role="alert">
            Your comment successfully published!
        </div>`;
    });

});

document.getElementById('like-button').addEventListener('click', (event) => {
    event.preventDefault();
    let body = new URLSearchParams();
    body.append('article_id', event.target.dataset.articleId);

    fetch('/api/like', {
        method: "POST",
        body
    }).then(() => {
        check();
    });
});