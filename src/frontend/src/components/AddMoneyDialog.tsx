import { useState } from 'react';
import { useAddMoney } from '../hooks/useBalance';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { DollarSign, Loader2 } from 'lucide-react';

interface AddMoneyDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function AddMoneyDialog({ open, onOpenChange }: AddMoneyDialogProps) {
  const [amount, setAmount] = useState('');
  const [error, setError] = useState('');
  const { mutate: addMoney, isPending } = useAddMoney();

  const validateAmount = (value: string): boolean => {
    setError('');
    
    if (!value || value.trim() === '') {
      setError('Please enter an amount');
      return false;
    }

    const numValue = parseFloat(value);
    
    if (isNaN(numValue)) {
      setError('Please enter a valid number');
      return false;
    }

    if (numValue <= 0) {
      setError('Amount must be greater than zero');
      return false;
    }

    if (numValue > 10000) {
      setError('Amount cannot exceed $10,000');
      return false;
    }

    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateAmount(amount)) {
      return;
    }

    const dollars = parseFloat(amount);
    const cents = Math.round(dollars * 100);

    addMoney(BigInt(cents), {
      onSuccess: (newBalance) => {
        const formattedBalance = new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD',
        }).format(Number(newBalance) / 100);
        
        toast.success('Money added successfully!', {
          description: `New balance: ${formattedBalance}`,
        });
        setAmount('');
        setError('');
        onOpenChange(false);
      },
      onError: (error) => {
        toast.error('Failed to add money', {
          description: error instanceof Error ? error.message : 'Please try again',
        });
      },
    });
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setAmount(value);
    if (error) {
      validateAmount(value);
    }
  };

  const quickAmounts = [10, 25, 50, 100];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-amber-900">Add Money to Your Card</DialogTitle>
          <DialogDescription>
            Enter the amount you want to add to your balance.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="amount">Amount (USD)</Label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="amount"
                  type="number"
                  step="0.01"
                  min="0"
                  max="10000"
                  placeholder="0.00"
                  value={amount}
                  onChange={handleAmountChange}
                  className={`pl-9 ${error ? 'border-destructive' : ''}`}
                  disabled={isPending}
                />
              </div>
              {error && (
                <p className="text-sm text-destructive">{error}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label className="text-sm text-muted-foreground">Quick amounts</Label>
              <div className="grid grid-cols-4 gap-2">
                {quickAmounts.map((quickAmount) => (
                  <Button
                    key={quickAmount}
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setAmount(quickAmount.toString());
                      setError('');
                    }}
                    disabled={isPending}
                    className="hover:bg-amber-100 hover:border-amber-300"
                  >
                    ${quickAmount}
                  </Button>
                ))}
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                setAmount('');
                setError('');
                onOpenChange(false);
              }}
              disabled={isPending}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isPending || !!error || !amount}
              className="bg-amber-600 hover:bg-amber-700"
            >
              {isPending ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Adding...
                </>
              ) : (
                'Add Money'
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
