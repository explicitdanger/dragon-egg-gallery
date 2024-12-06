import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Filter, SortAsc, ChevronLeft, ChevronRight } from "lucide-react"

interface FilterBarProps {
  regions: string[];
  selectedRegion: string | null;
  selectedSort: string | null;
  rarityOrder: 'asc' | 'desc' | null;
  selectedStage: number;
  onStageSelect: (stage: number) => void;
  onRegionSelect: (region: string | null) => void;
  onRarityOrderChange: (order: 'asc' | 'desc' | null) => void;
  className?: string;
}

const stages = ['Egg', 'Hatch', 'Hatchling', 'Adult'];

export default function FilterBar({
  regions,
  selectedRegion,
  rarityOrder,
  selectedStage,
  onStageSelect,
  onRegionSelect,
  onRarityOrderChange,
  className
}: FilterBarProps) {
  const FilterContent = ({ isMobile = false }) => (
    <div className={cn("space-y-6", className)}>
      {/* Stage Selector Section */}
      <div className="space-y-3">
        <h3 className="text-sm font-medium text-bistre/80 flex items-center gap-2">
          Default Stage
        </h3>
        <div className="flex items-center justify-between gap-4">
          <Button
            variant="outline"
            size="icon"
            className={cn(
              "h-8 w-8 shrink-0",
              "border-bistre/20",
              "bg-background-dark text-vanilla",
              "hover:bg-vanilla hover:text-bistre",
              "transition-colors duration-200",
              "disabled:opacity-50 disabled:cursor-not-allowed"
            )}
            onClick={(e) => {
              e.stopPropagation();  // Prevent event bubbling
              onStageSelect(Math.max(0, selectedStage - 1));
            }}
            disabled={selectedStage === 0}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          
          <div className="flex-1 text-center">
            <span className="text-sm font-medium text-bistre">
              {stages[selectedStage]}
            </span>
          </div>

          <Button
            variant="outline"
            size="icon"
            className={cn(
              "h-8 w-8 shrink-0",
              "border-bistre/20",
              "bg-background-dark text-vanilla",
              "hover:bg-vanilla hover:text-bistre",
              "transition-colors duration-200",
              "disabled:opacity-50 disabled:cursor-not-allowed"
            )}
            onClick={(e) => {
              e.stopPropagation();  // Prevent event bubbling
              onStageSelect(Math.min(stages.length - 1, selectedStage + 1));
            }}
            disabled={selectedStage === stages.length - 1}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <Separator className="bg-bistre/10" />

      {/* Rarity Order Section */}
      <div className="space-y-3">
        <h3 className="text-sm font-medium text-bistre/80 flex items-center gap-2">
          <SortAsc className="h-4 w-4" />
          Rarity
        </h3>
        <RadioGroup
          className="text-bistre grid grid-cols-1 gap-2"
          defaultValue={rarityOrder || ""}
          onValueChange={(value) => 
            onRarityOrderChange(value as 'asc' | 'desc' | null)
          }
        >
          <div className="flex items-center space-x-3 rounded-lg border border-bistre/10 p-3 cursor-pointer hover:bg-bistre/5">
            <RadioGroupItem value="asc" id={`asc-${isMobile ? 'mobile' : 'desktop'}`} />
            <Label 
              htmlFor={`asc-${isMobile ? 'mobile' : 'desktop'}`}
              className="flex-grow cursor-pointer"
            >
              Common to Legendary
            </Label>
          </div>
          <div className="flex items-center space-x-3 rounded-lg border border-bistre/10 p-3 cursor-pointer hover:bg-bistre/5">
            <RadioGroupItem value="desc" id={`desc-${isMobile ? 'mobile' : 'desktop'}`} />
            <Label 
              htmlFor={`desc-${isMobile ? 'mobile' : 'desktop'}`}
              className="flex-grow cursor-pointer"
            >
              Legendary to Common
            </Label>
          </div>
          <div className="flex items-center space-x-3 rounded-lg border border-bistre/10 p-3 cursor-pointer hover:bg-bistre/5">
            <RadioGroupItem value="" id={`none-${isMobile ? 'mobile' : 'desktop'}`} />
            <Label 
              htmlFor={`none-${isMobile ? 'mobile' : 'desktop'}`}
              className="flex-grow cursor-pointer"
            >
              No sorting
            </Label>
          </div>
        </RadioGroup>
      </div>

      <Separator className="bg-bistre/10" />

      {/* Region Section */}
      <div className="space-y-3">
        <h3 className="text-sm font-medium text-bistre/80 flex items-center gap-2">
          <Filter className="h-4 w-4" />
          Region
        </h3>
        <ScrollArea className={cn(
          "pr-4",
          isMobile ? "h-[40vh]" : "h-[200px]"
        )}>
          <div className="space-y-2">
            <Button
              variant={selectedRegion === null ? "default" : "outline"}
              className={cn(
                "w-full justify-start rounded-lg",
                selectedRegion === null 
                  ? "bg-chamoisee text-vanilla hover:bg-chamoisee/90"
                  : "bg-vanilla text-bistre hover:bg-chamoisee/10 border-bistre/20"
              )}
              onClick={() => onRegionSelect(null)}
            >
              All Regions
            </Button>
            {regions.map((region) => (
              <Button
                key={region}
                variant={selectedRegion === region ? "default" : "outline"}
                className={cn(
                  "w-full justify-start rounded-lg",
                  selectedRegion === region
                    ? "bg-chamoisee text-vanilla hover:bg-chamoisee/90"
                    : "bg-vanilla text-bistre hover:bg-chamoisee/10 border-bistre/20"
                )}
                onClick={() => onRegionSelect(region)}
              >
                {region}
              </Button>
            ))}
          </div>
        </ScrollArea>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile Filter Button & Sheet */}
      <div className="lg:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button 
              variant="outline" 
              className="w-full border-bistre/20 bg-vanilla text-bistre hover:bg-chamoisee/10 rounded-lg"
            >
              <Filter className="mr-2 h-4 w-4" />
              Filters
            </Button>
          </SheetTrigger>
          <SheetContent 
            side="left" 
            className="w-full max-w-[400px] border-r border-bistre/10 bg-vanilla p-0"
          >
            <SheetTitle className="sr-only">
              Filters
            </SheetTitle>
            <div className="flex flex-col h-full">
              <div className="p-6 border-b border-bistre/10">
                <h2 className="text-lg font-semibold text-bistre flex items-center gap-2">
                  <Filter className="h-5 w-5" />
                  Filters
                </h2>
              </div>
              <div className="flex-1 overflow-y-auto p-6">
                <FilterContent isMobile={true} />
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>

      {/* Desktop Filter Card */}
      <Card className={cn(
        "hidden lg:block w-[280px] border-bistre/20 bg-vanilla",
        className
      )}>
        <CardHeader>
          <CardTitle className="text-bistre flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filters
          </CardTitle>
        </CardHeader>
        <CardContent>
          <FilterContent isMobile={false} />
        </CardContent>
      </Card>
    </>
  );
} 