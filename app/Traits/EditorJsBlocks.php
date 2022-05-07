<?php

namespace App\Traits;

use App\Models\Article;
use Spatie\Url\Url;

trait EditorJsBlocks {
    /**
     * @throws \Exception
     */
    protected function getBlockHTML(object $block): string
    {
        return match ($block->type) {
            'header' => $this->getHeaderHTML($block->data),
            'articlesBlock' => $this->getArticlesBlockHTML($block->data),
            'image' => $this->getImageHTML($block->data),
            default => throw new \Exception("I don\'t know how to work with $block->type block")
        };
    }

    protected function getHeaderHTML(object $data): string
    {
        return <<<RETURN
            <h$data->level class="header">$data->text</h$data->level>
RETURN;
    }

    protected function getArticlesBlockHTML(object $data): string
    {
        $generateArticleList = function ($links) {
            $html = '<ul class="articles-block__list">';

            array_map(function ($link) use (&$html) {
                $articleId = Url::fromString($link)->getFirstSegment();
                $articleTitle = Article::findOrFail($articleId)->title;

                $html .=
                    <<<HTML
                        <li class='articles-block__list-item'>
                             <a href='$link' class='article-block__link'>$articleTitle</a>
                        </li>
HTML;
            }, $links);

            $html .= '</ul>';
            return $html;
        };

        return <<<RETURN
            <div class="articles-block__wrapper">
                <p class="articles-block__title">$data->title</p>
                <div class="articles-block__container">
                    {$generateArticleList($data->links)}
                </div>
            </div>
RETURN;

    }

    protected function getImageHTML(object $data) : string
    {
        $megaphoto = $data->options->megaphoto ? 'image__image--megaphoto' : '';
        return <<<HTML
            <div class="image__wrapper">
                <img src="$data->url" class="image__image $megaphoto" alt="">
                <p class="image__big-caption">$data->bigCaption</p>
                <p class="image__small-caption">$data->smallCaption</p>
            </div>
HTML;


    }
}
