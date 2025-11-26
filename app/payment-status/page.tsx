"use client";
import { Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { api } from "@/lib/utils";
import { CheckCircle, XCircle, Loader2, ArrowRight, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

type StatusType = "loading" | "success" | "error";

function PaymentStatusContent() {
  const [statusType, setStatusType] = useState<StatusType>("loading");
  const [message, setMessage] = useState(
    "Please wait while we confirm your payment..."
  );
  const searchParams = useSearchParams();
  const router = useRouter();
  const reference = searchParams.get("reference");

  useEffect(() => {
    if (reference) {
      api
        .get(`/api/pay/verify-payment/${reference}`)
        .then(() => {
          setStatusType("success");
          setMessage("Payment verified successfully!");
        })
        .catch(() => {
          setStatusType("error");
          setMessage("Payment verification failed. Please contact support.");
        });
    } else {
      setStatusType("error");
      setMessage("No payment reference found.");
    }
  }, [reference, router]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-gray-50 to-white px-4">
      <div className="max-w-md w-full">
        {/* Loading State */}
        {statusType === "loading" && (
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-purple-100 rounded-full mb-6 animate-pulse">
              <Loader2 className="w-12 h-12 text-purple-600 animate-spin" />
            </div>
            <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-3">
              Processing Payment
            </h2>
            <p className="text-gray-600 mb-8">{message}</p>
            <div className="flex justify-center gap-2">
              <div
                className="w-2 h-2 bg-purple-600 rounded-full animate-bounce"
                style={{ animationDelay: "0ms" }}
              ></div>
              <div
                className="w-2 h-2 bg-purple-600 rounded-full animate-bounce"
                style={{ animationDelay: "150ms" }}
              ></div>
              <div
                className="w-2 h-2 bg-purple-600 rounded-full animate-bounce"
                style={{ animationDelay: "300ms" }}
              ></div>
            </div>
          </div>
        )}

        {/* Success State */}
        {statusType === "success" && (
          <div className="text-center animate-fade-in">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-green-100 rounded-full mb-6">
              <CheckCircle className="w-12 h-12 text-green-600" />
            </div>
            <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-3">
              Payment Successful!
            </h2>
            <p className="text-gray-600 mb-2">{message}</p>
            <p className="text-sm text-gray-500 mb-8">
              Reference:{" "}
              <span className="font-mono font-semibold">{reference}</span>
            </p>

            {/* Success Info Cards */}
            <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
              <div className="space-y-4">
                <div className="flex items-center gap-3 p-3 bg-green-50 rounded-xl">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                  <div className="text-left">
                    <p className="text-sm font-semibold text-gray-900">
                      Payment Confirmed
                    </p>
                    <p className="text-xs text-gray-600">
                      Your order has been processed
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-green-50 rounded-xl">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                  <div className="text-left">
                    <p className="text-sm font-semibold text-gray-900">
                      Email Sent
                    </p>
                    <p className="text-xs text-gray-600">
                      Check your inbox for confirmation
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <Button
                asChild
                size="lg"
                className="w-full h-14 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all hover:scale-105"
              >
                <Link
                  href="/orders"
                  className="flex items-center justify-center gap-2"
                >
                  View Order Details
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="w-full h-12 rounded-full font-semibold"
              >
                <Link
                  href="/"
                  className="flex items-center justify-center gap-2"
                >
                  <Home className="w-5 h-5" />
                  Back to Home
                </Link>
              </Button>
            </div>
          </div>
        )}

        {/* Error State */}
        {statusType === "error" && (
          <div className="text-center animate-fade-in">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-red-100 rounded-full mb-6">
              <XCircle className="w-12 h-12 text-red-600" />
            </div>
            <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-3">
              Payment Failed
            </h2>
            <p className="text-gray-600 mb-8">{message}</p>

            {/* Error Info Card */}
            <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
              <div className="space-y-4">
                <div className="flex items-start gap-3 p-3 bg-red-50 rounded-xl">
                  <XCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <div className="text-left">
                    <p className="text-sm font-semibold text-gray-900 mb-1">
                      What happened?
                    </p>
                    <p className="text-xs text-gray-600">
                      Your payment could not be verified. This might be due to a
                      connection issue or an invalid payment reference.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-xl">
                  <div className="text-left">
                    <p className="text-sm font-semibold text-gray-900 mb-1">
                      Next Steps
                    </p>
                    <ul className="text-xs text-gray-600 space-y-1">
                      <li>• Try the payment again</li>
                      <li>• Contact support if money was deducted</li>
                      <li>• Use a different payment method</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <Button
                asChild
                size="lg"
                className="w-full h-14 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all hover:scale-105"
              >
                <Link
                  href="/checkout"
                  className="flex items-center justify-center gap-2"
                >
                  Try Again
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="w-full h-12 rounded-full font-semibold"
              >
                <Link
                  href="/"
                  className="flex items-center justify-center gap-2"
                >
                  <Home className="w-5 h-5" />
                  Back to Home
                </Link>
              </Button>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.5s ease-out;
        }
      `}</style>
    </div>
  );
}

export default function PaymentStatus() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-gray-50 to-white">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-purple-100 rounded-full mb-6 animate-pulse">
            <Loader2 className="w-12 h-12 text-purple-600 animate-spin" />
          </div>
          <p className="text-gray-600">Loading payment status...</p>
        </div>
      }
    >
      <PaymentStatusContent />
    </Suspense>
  );
}
