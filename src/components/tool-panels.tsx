import * as React from "react"
import { Copy, Plus, Trash2, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "sonner"

interface PanelProps {
  title: string
  value: string
  onChange?: (value: string) => void
  placeholder?: string
  readOnly?: boolean
  actionOptions?: {
    onClear?: () => void
    onPaste?: () => void
  }
}

export function InputPanel({ title, value, onChange, placeholder, actionOptions }: PanelProps) {
  return (
    <div className="flex flex-col space-y-2 h-full">
      <div className="flex items-center justify-between">
        <Label className="text-sm font-semibold">{title}</Label>
        <div className="flex gap-1">
          {actionOptions?.onPaste && (
            <Button
              variant="ghost"
              size="sm"
              className="h-7 px-2 text-xs"
              onClick={actionOptions.onPaste}
            >
              <Plus className="h-3 w-3 mr-1" /> Paste
            </Button>
          )}
          {actionOptions?.onClear && (
            <Button
              variant="ghost"
              size="sm"
              className="h-7 px-2 text-xs text-muted-foreground hover:text-destructive"
              onClick={actionOptions.onClear}
            >
              <Trash2 className="h-3 w-3 mr-1" /> Clear
            </Button>
          )}
        </div>
      </div>
      <Textarea
        className="flex-1 min-h-[300px] resize-none font-mono text-sm bg-background border-border/50 focus-visible:ring-primary/50"
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        placeholder={placeholder}
      />
    </div>
  )
}

export function OutputPanel({ title, value, placeholder }: Omit<PanelProps, "onChange" | "actionOptions">) {
  const [copied, setCopied] = React.useState(false)

  const handleCopy = () => {
    if (!value) return
    navigator.clipboard.writeText(value)
    setCopied(true)
    toast.success("Copied to clipboard!")
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="flex flex-col space-y-2 h-full">
      <div className="flex items-center justify-between">
        <Label className="text-sm font-semibold">{title}</Label>
        <div className="flex gap-1">
          <Button
            variant="secondary"
            size="sm"
            className="h-7 px-2 text-xs"
            onClick={handleCopy}
            disabled={!value}
          >
            {copied ? <CheckCircle2 className="h-3 w-3 mr-1" /> : <Copy className="h-3 w-3 mr-1" />}
            {copied ? "Copied" : "Copy"}
          </Button>
        </div>
      </div>
      <Textarea
        className="flex-1 min-h-[300px] resize-none font-mono text-sm bg-muted/30 border-border/50 focus-visible:ring-0 cursor-text"
        value={value}
        readOnly
        placeholder={placeholder}
      />
    </div>
  )
}
