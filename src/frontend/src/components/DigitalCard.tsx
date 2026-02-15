interface DigitalCardProps {
  cardholderName: string;
}

export default function DigitalCard({ cardholderName }: DigitalCardProps) {
  const cardNumber = '**** **** **** 4829';
  const expiryDate = '12/28';
  const cvv = '***';

  return (
    <div className="relative w-full max-w-md mx-auto">
      <div 
        className="relative aspect-[1.586/1] rounded-2xl shadow-2xl overflow-hidden"
        style={{
          backgroundImage: 'url(/assets/generated/card-bg.dim_1200x750.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        {/* Overlay for better text contrast */}
        <div className="absolute inset-0 bg-gradient-to-br from-amber-900/40 via-orange-900/30 to-rose-900/40"></div>
        
        {/* Card Content */}
        <div className="relative h-full p-6 md:p-8 flex flex-col justify-between text-white">
          {/* Top Section */}
          <div className="flex justify-between items-start">
            <div>
              <p className="text-xs md:text-sm font-medium opacity-90 mb-1">Digital Card</p>
              <p className="text-lg md:text-xl font-bold">InstaWallet</p>
            </div>
            <div className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
              <p className="text-xs font-semibold">DEBIT</p>
            </div>
          </div>

          {/* Middle Section - Card Number */}
          <div>
            <p className="text-xl md:text-2xl font-mono tracking-wider font-semibold">
              {cardNumber}
            </p>
          </div>

          {/* Bottom Section */}
          <div className="flex justify-between items-end">
            <div>
              <p className="text-xs opacity-75 mb-1">CARDHOLDER</p>
              <p className="text-sm md:text-base font-semibold uppercase tracking-wide">
                {cardholderName}
              </p>
            </div>
            <div className="text-right">
              <p className="text-xs opacity-75 mb-1">EXPIRES</p>
              <p className="text-sm md:text-base font-semibold font-mono">
                {expiryDate}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Card Info Below */}
      <div className="mt-4 text-center text-xs text-muted-foreground">
        <p>Secure digital debit card</p>
      </div>
    </div>
  );
}
