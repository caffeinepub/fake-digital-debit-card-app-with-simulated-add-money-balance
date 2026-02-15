import { useState } from 'react';
import { useSaveCallerUserProfile } from '../hooks/useUserProfile';
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
import { Loader2, User } from 'lucide-react';

export default function ProfileSetupDialog() {
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const { mutate: saveProfile, isPending } = useSaveCallerUserProfile();

  const validateName = (value: string): boolean => {
    setError('');
    
    if (!value || value.trim() === '') {
      setError('Please enter your name');
      return false;
    }

    if (value.trim().length < 2) {
      setError('Name must be at least 2 characters');
      return false;
    }

    if (value.trim().length > 50) {
      setError('Name must be less than 50 characters');
      return false;
    }

    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateName(name)) {
      return;
    }

    saveProfile(
      { name: name.trim() },
      {
        onSuccess: () => {
          toast.success('Profile created successfully!', {
            description: 'Welcome to InstaWallet',
          });
        },
        onError: (error) => {
          toast.error('Failed to create profile', {
            description: error instanceof Error ? error.message : 'Please try again',
          });
        },
      }
    );
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setName(value);
    if (error) {
      validateName(value);
    }
  };

  return (
    <Dialog open={true} onOpenChange={() => {}}>
      <DialogContent className="sm:max-w-md" onPointerDownOutside={(e) => e.preventDefault()}>
        <DialogHeader>
          <DialogTitle className="text-amber-900 flex items-center gap-2">
            <User className="w-5 h-5" />
            Welcome to InstaWallet
          </DialogTitle>
          <DialogDescription>
            Please enter your name to set up your digital card and balance.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name">Your Name</Label>
              <Input
                id="name"
                type="text"
                placeholder="Enter your full name"
                value={name}
                onChange={handleNameChange}
                className={error ? 'border-destructive' : ''}
                disabled={isPending}
                autoFocus
              />
              {error && (
                <p className="text-sm text-destructive">{error}</p>
              )}
            </div>
          </div>
          <DialogFooter>
            <Button
              type="submit"
              disabled={isPending || !!error || !name}
              className="bg-amber-600 hover:bg-amber-700 w-full"
            >
              {isPending ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Setting up...
                </>
              ) : (
                'Continue'
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
