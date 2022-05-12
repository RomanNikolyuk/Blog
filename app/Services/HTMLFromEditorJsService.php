<?php

namespace App\Services;

use App\Exceptions\EditorJSException;
use App\Traits\EditorJsBlocks;

class HTMLFromEditorJsService
{
    protected array $blocks;
    use EditorJsBlocks;

    /**
     * @throws EditorJSException
     */
    public function __construct(string $editorJsJson)
    {
        try {
            $this->blocks = $this->getJson($editorJsJson);
        } catch (\TypeError $e) {
            throw EditorJSException::passedString();
        }
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
