"use client"

import { useEffect } from "react"
import { AlertCircle, RotateCw } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service if present
    console.error("Global UI Error Caught:", error)
  }, [error])

  return (
    <div className="flex-1 flex flex-col items-center justify-center p-4 min-h-[400px]">
      <Card className="max-w-md w-full border-destructive/50 bg-destructive/5">
        <CardHeader className="text-center">
          <div className="mx-auto w-12 h-12 rounded-full bg-destructive/10 flex items-center justify-center mb-4">
            <AlertCircle className="h-6 w-6 text-destructive" />
          </div>
          <CardTitle className="text-xl">Something went wrong!</CardTitle>
          <CardDescription>
            A tool encountered an unexpected error. Please try resetting or refreshing.
          </CardDescription>
        </CardHeader>
        <CardFooter className="flex justify-center gap-2">
          <Button variant="outline" onClick={() => window.location.reload()}>
            Refresh Page
          </Button>
          <Button onClick={() => reset()} className="gap-2">
            <RotateCw className="w-4 h-4" />
            Try again
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
