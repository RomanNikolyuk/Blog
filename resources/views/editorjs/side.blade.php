<div class="side-block__wrapper">
    <div class="side-block__text">{{$data->text}}</div>
    <div class="side-block__side">
        <p class="side-block__side-text">{{$data->side->title}}</p>
        <ul class="side-block__side-list">
            @foreach($data->side->text as $text)
                <li>
                    <p>{{$text}}</p>
                </li>
            @endforeach
        </ul>
    </div>
</div>
