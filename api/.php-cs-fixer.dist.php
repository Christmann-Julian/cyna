<?php

$finder = (new PhpCsFixer\Finder())
    ->in(__DIR__)
    ->exclude('var')
    ->exclude('templates')
    ->exclude('translations')
    ->exclude('migrations')
    ->exclude('vendor')
;

return (new PhpCsFixer\Config())
    ->setRules([
        '@PSR12' => true,
        'array_indentation' => true,
        'array_syntax' => [
            'syntax' => 'short'
        ],
        'single_line_empty_body' => true,
        'no_mixed_echo_print' => true,
        'semicolon_after_instruction' => true,
        'method_chaining_indentation' => true,
        'statement_indentation' => true,
        'align_multiline_comment' => true,
        'single_line_comment_spacing' => true,
        'no_blank_lines_after_phpdoc' => true,
        'no_spaces_around_offset' => true,
        'cast_spaces' => ['space' => 'single'],
        'concat_space' => ['spacing' => 'one'],
        'binary_operator_spaces' => [
            'operators' => [
                '=>' => 'single_space'
            ]
        ],
        'no_unused_imports' => true,
        'ordered_imports' => [
            'imports_order' => ['class', 'function', 'const'],
            'sort_algorithm' => 'length'
        ],
        // Ces 2 règles sont censées être activées par défaut dans PSR-12, mais elles ne le sont pas
        'single_space_around_construct' => [
            'constructs_followed_by_a_single_space' => ['abstract', 'as', 'attribute', 'case', 'catch', 'class', 'const_import', 'do', 'else', 'elseif', 'final', 'finally', 'for', 'foreach', 'function', 'function_import', 'if', 'insteadof', 'interface', 'named_argument', 'namespace', 'new', 'private', 'protected', 'public', 'static', 'switch', 'trait', 'try', 'use', 'use_lambda', 'while'],
        ],
        'no_extra_blank_lines' => ['tokens' => ['use']],
    ])
    ->setFinder($finder)
;
