import { useInternetIdentity } from './hooks/useInternetIdentity';
import { useGetCallerUserProfile } from './hooks/useUserProfile';
import { ThemeProvider } from 'next-themes';
import { Toaster } from '@/components/ui/sonner';
import LoginButton from './components/LoginButton';
import ProfileSetupDialog from './components/ProfileSetupDialog';
import CardDashboard from './pages/CardDashboard';

export default function App() {
  const { identity, isInitializing } = useInternetIdentity();
  const { data: userProfile, isLoading: profileLoading, isFetched } = useGetCallerUserProfile();

  const isAuthenticated = !!identity;
  const showProfileSetup = isAuthenticated && !profileLoading && isFetched && userProfile === null;

  if (isInitializing) {
    return (
      <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50">
          <div className="text-center">
            <div className="w-12 h-12 border-4 border-amber-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading...</p>
          </div>
        </div>
        <Toaster />
      </ThemeProvider>
    );
  }

  if (!isAuthenticated) {
    return (
      <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
        <div className="min-h-screen flex flex-col bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50">
          <header className="border-b border-amber-200/50 bg-white/80 backdrop-blur-sm">
            <div className="container mx-auto px-4 py-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img src="/assets/generated/app-logo.dim_512x512.png" alt="App Logo" className="w-10 h-10" />
                <h1 className="text-xl font-bold text-amber-900">InstaWallet</h1>
              </div>
              <LoginButton />
            </div>
          </header>
          <main className="flex-1 flex items-center justify-center p-4">
            <div className="max-w-md w-full text-center space-y-6">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold text-amber-900">Welcome to InstaWallet</h2>
                <p className="text-lg text-amber-700">Your digital debit card and balance management</p>
              </div>
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-amber-200/50">
                <p className="text-muted-foreground mb-4">
                  Please log in to access your digital debit card and manage your balance.
                </p>
                <LoginButton />
              </div>
            </div>
          </main>
          <footer className="border-t border-amber-200/50 bg-white/80 backdrop-blur-sm py-4">
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
        </div>
        <Toaster />
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50">
        <CardDashboard />
        {showProfileSetup && <ProfileSetupDialog />}
      </div>
      <Toaster />
    </ThemeProvider>
  );
}
