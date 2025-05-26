<?php

namespace App\Encoder;

use Symfony\Component\HttpFoundation\RequestStack;
use Symfony\Component\Serializer\Encoder\DecoderInterface;

final class MultipartDecoder implements DecoderInterface
{
    public const FORMAT = 'multipart';

    public function __construct(private readonly RequestStack $requestStack) {}

    public function decode(string $data, string $format, array $context = []): ?array
    {
        $request = $this->requestStack->getCurrentRequest();
        if (!$request) {
            return null;
        }

        $result = [];

        foreach ($request->request->all() as $key => $value) {
            // Try to decode JSON only if it looks like JSON
            if (is_string($value) && str_starts_with(trim($value), '{')) {
                try {
                    $result[$key] = json_decode($value, true, flags: \JSON_THROW_ON_ERROR);
                } catch (\JsonException) {
                    $result[$key] = $value;
                }
            } else {
                $result[$key] = $value;
            }
        }

        return $result + $request->files->all();
    }

    public function supportsDecoding(string $format): bool
    {
        return self::FORMAT === $format;
    }
}
