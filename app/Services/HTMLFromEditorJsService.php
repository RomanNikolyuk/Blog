<?php

namespace App\Services;

use App\Exceptions\EditorJSException;
use App\Traits\EditorJsBlocks;

class HTMLFromEditorJsService
{
    protected array $blocks;
    use EditorJsBlocks;

    public function __construct(string $editorJsJson)
    {
        $this->blocks = $this->getBlocks($editorJsJson);
    }

    /**
     * @throws \Exception
     */
    public function produce(): string
    {
        $html = '';
        foreach ($this->blocks as $block) {
            $html .= $this->getBlockHtml($block);
        }

        return $html;
    }

    protected function getBlocks(string $json)
    {
        return json_decode($json)->blocks;
    }

    /**
     * @param object $block
     * @return string
     */
    protected function getBlockHtml(object $block): string
    {
        return view('editorjs.' . $block->type)
            ->with('data', $block->data)
            ->render();
    }

}
