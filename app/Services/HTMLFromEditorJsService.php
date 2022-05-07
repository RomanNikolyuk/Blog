<?php

namespace App\Services;

use App\Traits\EditorJsBlocks;

class HTMLFromEditorJsService
{
    protected array $blocks;
    use EditorJsBlocks;

    public function __construct(string $editorJsJson)
    {
        $this->blocks = $this->getJson($editorJsJson);
    }

    /**
     * @throws \Exception
     */
    public function produce(): string
    {
        $html = '';
        foreach ($this->blocks as $block) {
            $html .= $this->getBlockHTML($block);
        }
        return $html;
    }

    protected function getJson(string $json): array
    {
        $decoded = json_decode($json);

        if (!is_array($decoded)) {
            $decoded = $this->getJson($decoded);
        }

        return $decoded;
    }

}
