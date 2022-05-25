<?php

namespace App\Traits;

use App\Exceptions\EditorJSException;
use App\Models\Article;
use Spatie\Url\Url;

trait EditorJsBlocks
{
    /**
     * @throws \Exception
     */
    protected function getBlockHTML(object $block): string
    {
        return match ($block->type) {
            'paragraph' => $this->getParagraphHTML($block->data),
            'header' => $this->getHeaderHTML($block->data),
            'list' => $this->getListHTML($block->data),
            'articlesBlock' => $this->getArticlesBlockHTML($block->data),
            'image' => $this->getImageHTML($block->data),
            'gallery' => $this->getGalleryHTML($block->data),
            'side' => $this->getSideBlockHTML($block->data),
            default => throw EditorJSException::blockNotFound($block->type)
        };
    }

    protected function getParagraphHTML(object $data) : string
    {
        return "<p>{$data->text}</p>";
    }

    protected function getHeaderHTML(object $data): string
    {
        return <<<RETURN
            <h$data->level class="header">$data->text</h$data->level>
RETURN;
    }

    protected function getListHTML(object $data): string
    {
        $generateList = function (array $items) {
            $listArray = array_map(function (string $item) {
                return "<li>$item</li>";
            }, $items);

            return implode('', $listArray);
        };

        return <<<HTML
            <ul>
                {$generateList($data->items)}
            </ul>
HTML;
    }

    protected function getArticlesBlockHTML(object $data): string
    {
        $generateArticleList = function ($links) {
            $html = '<ul class="articles-block__list">';

            array_map(function ($link) use (&$html) {
                $articleId = Url::fromString($link)->getLastSegment();
                $articleTitle = Article::find($articleId)?->title ?? $link;

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

    protected function getImageHTML(object $data): string
    {
        $bigCaptionClass = $data->bigCaption ? 'image__big-caption' : '';
        $smallCaptionClass = $data->smallCaption ? 'image__small-caption' : '';
        $megaphotoClass = $data->options->megaphoto ? 'image__image--megaphoto' : '';

        return <<<HTML
            <div class="image__wrapper">
                <img src="$data->url" class="image__image $megaphotoClass" alt="">
                <p class="$bigCaptionClass">$data->bigCaption</p>
                <p class="$smallCaptionClass">$data->smallCaption</p>
            </div>
HTML;
    }

    protected function getGalleryHTML(object $data): string
    {
        $generateImagesHTML = function ($urls) {
            $imagesHTMLArray = array_map(function ($url) {
                return <<<HTML
                    <img src="$url" alt="" class="gallery__image">
HTML;
            }, $urls);

            return implode('', $imagesHTMLArray);
        };

        return <<<HTML
            <div class="gallery__wrapper">
                {$generateImagesHTML($data->urls)}
            </div>
HTML;
    }

    protected function getSideBlockHTML(object $data): string
    {
        $generateHTMLList = function (array $text) {

            $htmlArray = array_map(function (string $text) {
                return <<<HTML
                    <li><p>$text</p></li>
HTML;

            }, $text);

            return implode('', $htmlArray);
        };
        return <<<HTML
            <div class="side-block__wrapper">
                <div class="side-block__text">$data->text</div>
                <div class="side-block__side">
                    <p class="side-block__side-text">{$data->side->title}</p>
                    <ul class="side-block__side-list">
                        {$generateHTMLList($data->side->text)}
                    </ul>
                </div>
            </div>
HTML;
    }
}
