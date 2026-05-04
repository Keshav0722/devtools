"use client"

import * as React from "react"
import { useRouter } from "next/navigation"

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import { toolsList } from "@/lib/tools"

export function CommandPalette() {
  const [open, setOpen] = React.useState(false)
  const router = useRouter()

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
      // Keep support for standard `/`
      if (e.key === "/" && e.target instanceof HTMLElement && e.target.tagName !== "INPUT" && e.target.tagName !== "TEXTAREA") {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }

    const customOpen = () => setOpen(true)

    document.addEventListener("keydown", down)
    document.addEventListener("open-command-palette", customOpen)
    
    return () => {
      document.removeEventListener("keydown", down)
      document.removeEventListener("open-command-palette", customOpen)
    }
  }, [])

  const runCommand = React.useCallback(
    (command: () => unknown) => {
      setOpen(false)
      command()
    },
    []
  )

  return (
    <>
      <div 
        className="text-sm text-muted-foreground hidden lg:flex items-center gap-1 cursor-pointer hover:text-foreground transition-colors"
        onClick={() => setOpen(true)}
      >
        <span className="bg-muted px-1.5 py-0.5 rounded-md border text-xs">/</span> to search
      </div>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Search tools..." />
        <CommandList>
          <CommandEmpty>No tool found.</CommandEmpty>
          <CommandGroup heading="Tools">
            {toolsList.map((tool) => (
              <CommandItem
                key={tool.id}
                value={`${tool.name} ${tool.keywords.join(" ")}`}
                onSelect={() => runCommand(() => router.push(tool.href))}
              >
                <div className="flex items-center gap-2">
                  <tool.icon className="h-4 w-4" />
                  <span>{tool.name}</span>
                </div>
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  )
}
