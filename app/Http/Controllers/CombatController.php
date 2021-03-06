<?php declare(strict_types=1);

namespace App\Http\Controllers;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Log\Logger;

class CombatController extends Controller
{
    public function __invoke(string $id, Logger $logger, Request $request): JsonResponse
    {
//        dd($_GET);
        $combat = $this->getCombat($logger);

        return response()->json(
            $combat->toArray()
        );
    }
}
