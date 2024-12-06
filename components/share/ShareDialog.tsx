"use client";

import { useState } from "react";
import { Check, Copy, Share2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface ShareDialogProps {
  url: string;
}

export function ShareDialog({ url }: ShareDialogProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="bg-background-dark text-vanilla border-bistre/20 hover:bg-vanilla/10 transition-colors duration-200 rounded-lg"
        >
          <Share2 className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-background-dark/95 backdrop-blur-sm text-vanilla border-bistre/20 shadow-xl rounded-xl sm:rounded-xl md:rounded-xl lg:rounded-xl font-sans">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-center font-sans">
            Share Dragon Preview
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-6 mt-2">
          <div className="flex space-x-2">
            <Input
              readOnly
              value={url}
              className="bg-background/5 text-vanilla border-bistre/20 focus-visible:ring-vanilla/20 selection:bg-vanilla/20 rounded-lg font-sans"
            />
            <Button
              variant="outline"
              size="icon"
              onClick={handleCopy}
              className={`
                bg-background-dark text-vanilla border-bistre/20 
                hover:bg-vanilla/10 transition-colors duration-200 rounded-lg
                ${copied ? "border-green-500/50 text-green-500" : ""}
              `}
            >
              {copied ? (
                <Check className="h-4 w-4" />
              ) : (
                <Copy className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
