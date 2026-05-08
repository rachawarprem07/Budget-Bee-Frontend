import { useState } from "react";
import { X, Target, Calendar, Tag, DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface AddGoalDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAddGoal: (goal: {
    name: string;
    category: string;
    target: number;
    deadline: string;
  }) => void;
}

const categories = [
  "Savings",
  "Travel",
  "Technology",
  "Housing",
  "Health",
  "Other",
];

export function AddGoalDialog({ open, onOpenChange, onAddGoal }: AddGoalDialogProps) {
  const [name, setName] = useState("");
  const [category, setCategory] = useState(categories[0]);
  const [target, setTarget] = useState("");
  const [deadline, setDeadline] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const targetNum = parseFloat(target);
    if (isNaN(targetNum) || targetNum <= 0 || !name.trim()) {
      return;
    }

    const goal = {
      name: name.trim(),
      category,
      target: targetNum,
      deadline,
    };

    onAddGoal(goal);
    
    setName("");
    setTarget("");
    setDeadline("");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Target className="h-5 w-5 text-brand-charcoal" />
            Add Goal
          </DialogTitle>
          <DialogDescription>
            Set a new financial goal to work towards
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="goalName" className="text-sm font-medium text-brand-charcoal">
              Goal Name
            </label>
            <Input
              id="goalName"
              placeholder="Enter goal name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="category" className="text-sm font-medium text-brand-charcoal">
              <Tag className="h-4 w-4 mr-2 inline" />
              Category
            </label>
            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              required
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <label htmlFor="target" className="text-sm font-medium text-brand-charcoal">
              <DollarSign className="h-4 w-4 mr-2 inline" />
              Target Amount
            </label>
            <Input
              id="target"
              type="number"
              step="0.01"
              min="0.01"
              placeholder="0.00"
              value={target}
              onChange={(e) => setTarget(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="deadline" className="text-sm font-medium text-brand-charcoal">
              <Calendar className="h-4 w-4 mr-2 inline" />
              Deadline
            </label>
            <Input
              id="deadline"
              type="date"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
              required
            />
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">
              Add Goal
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
