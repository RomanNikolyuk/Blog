<?php

namespace App\Services;

use App\Exceptions\EditorJSException;

class HTMLFromEditorJsService
{
    protected array $blocks;

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
