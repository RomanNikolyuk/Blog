<?php

namespace App\Exceptions;

use Exception;

class EditorJSException extends Exception
{
    public static function passedString(): self
    {
        return new self('Passed String, expected JSON');
    }

    public static function blockNotFound(string $blockName): self
    {
        return new self("Block $blockName not registered. Add it to EditorJsBlocks trait file");
    }
}
