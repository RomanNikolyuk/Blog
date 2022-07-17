<div class="gallery__wrapper">
    @foreach($data->urls as $url)
        <img src="{{$url}}" alt="" class="gallery__image">
    @endforeach
</div>
