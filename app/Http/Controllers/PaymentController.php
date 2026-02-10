<?php

namespace App\Http\Controllers;

use App\Models\Invitation;
use App\Models\Payment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class PaymentController extends Controller
{
    public function createPayment(Invitation $invitation)
    {
        DB::transaction(function () use ($invitation) {

            if ($invitation->status === 'active') {
                abort(400, 'Already paid');
            }

            $payment = Payment::create([
                'invitation_id' => $invitation->id,
                'provider' => 'manual', // ganti nanti
                'amount' => 50000,
                'status' => 'pending',
            ]);

            return response()->json([
                'payment_id' => $payment->id,
                'pay_url' => route('payment.mock', $payment),
            ]);
        }, 5);
    }
}