import { useState } from 'react';
import { useGetBalance } from '../hooks/useBalance';
import { useGetCallerUserProfile } from '../hooks/useUserProfile';
import LoginButton from '../components/LoginButton';
import DigitalCard from '../components/DigitalCard';
import AddMoneyDialog from '../components/AddMoneyDialog';
import { Button } from '@/components/ui/button';
import { Plus, Wallet } from 'lucide-react';

export default function CardDashboard() {
  const [showAddMoney, setShowAddMoney] = useState(false);
  const { data: balance, isLoading: balanceLoading } = useGetBalance();
  const { data: userProfile, isLoading: profileLoading } = useGetCallerUserProfile();

  const formatBalance = (amount: bigint | undefined) => {
    if (amount === undefined) return '$0.00';
    const dollars = Number(amount) / 100;
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(dollars);
  };

  return (
    <>
      <header className="border-b border-amber-200/50 bg-white/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src="/assets/generated/app-logo.dim_512x512.png" alt="InstaWallet Logo" className="w-10 h-10" />
            <h1 className="text-xl font-bold text-amber-900">InstaWallet</h1>
          </div>
          <LoginButton />
        </div>
      </header>

      <main className="flex-1 container mx-auto px-4 py-8 max-w-4xl">
        <div className="space-y-8">
          {/* Balance Section */}
          <section className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-amber-200/50">
            <div className="flex items-center gap-2 mb-2">
              <Wallet className="w-5 h-5 text-amber-700" />
              <h2 className="text-sm font-semibold text-amber-700 uppercase tracking-wide">Available Balance</h2>
            </div>
            {balanceLoading ? (
              <div className="h-12 bg-amber-100 animate-pulse rounded-lg w-48"></div>
            ) : (
              <p className="text-4xl md:text-5xl font-bold text-amber-900 mb-4">
                {formatBalance(balance)}
              </p>
            )}
            <Button 
              onClick={() => setShowAddMoney(true)}
              className="bg-amber-600 hover:bg-amber-700 text-white font-semibold shadow-md"
              size="lg"
            >
              <Plus className="w-5 h-5 mr-2" />
              Add Money
            </Button>
          </section>

          {/* Digital Card Section */}
          <section>
            <h2 className="text-lg font-semibold text-amber-900 mb-4">Your Digital Card</h2>
            <DigitalCard 
              cardholderName={profileLoading ? 'Loading...' : userProfile?.name || 'Cardholder'}
            />
          </section>

          {/* Info Section */}
          <section className="bg-white/60 backdrop-blur-sm rounded-xl p-6 border border-amber-200/50">
            <h3 className="text-lg font-semibold text-amber-900 mb-3">Features</h3>
            <div className="space-y-2 text-sm text-amber-800">
              <p>• Manage your digital debit card</p>
              <p>• Use the "Add Money" button to increase your balance</p>
              <p>• Your balance is stored securely and persists across sessions</p>
              <p>• Access your card information anytime</p>
            </div>
          </section>
        </div>
      </main>

      <footer className="border-t border-amber-200/50 bg-white/80 backdrop-blur-sm py-6 mt-auto">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} InstaWallet. Built with love using{' '}
            <a 
              href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-amber-700 hover:text-amber-900 font-medium"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </footer>

      <AddMoneyDialog open={showAddMoney} onOpenChange={setShowAddMoney} />
    </>
  );
}
