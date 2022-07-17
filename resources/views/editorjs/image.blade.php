<div class="image__wrapper">
    <img src="{{ $data->url }}" class="image__image" alt="">
    <p class="{{ $data->bigCaption ? 'image__big-caption' : '' }}">{{ $data->bigCaption }}</p>
    <p class="{{ $data->smallCaption ? 'image__small-caption' : '' }}">{{ $data->smallCaption }}</p>
</div>
