import React, { useState } from 'react';
import { AppPage } from '../types';
import { OFFERS, REWARDS } from '../data/cafeData';
import {
  Tag,
  Award,
  Sparkles,
  Gift,
  Copy,
  Check,
  ArrowRight,
  UserPlus,
  Percent,
} from 'lucide-react';

interface OffersPageProps {
  onNavigate: (page: AppPage) => void;
  onApplyDiscount: (code: string) => { success: boolean; message: string };
}

export const OffersPage: React.FC<OffersPageProps> = ({
  onNavigate,
  onApplyDiscount,
}) => {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [points, setPoints] = useState<number>(120);
  const [userJoined, setUserJoined] = useState<boolean>(false);
  const [signUpModalOpen, setSignUpModalOpen] = useState<boolean>(false);
  const [phoneInput, setPhoneInput] = useState('');
  const [nameInput, setNameInput] = useState('');
  const [redeemedToast, setRedeemedToast] = useState<string | null>(null);

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    onApplyDiscount(code);
    setTimeout(() => setCopiedCode(null), 2500);
  };

  const handleApplyAndOrder = (code: string) => {
    onApplyDiscount(code);
    onNavigate('order');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleJoinClub = (e: React.FormEvent) => {
    e.preventDefault();
    setUserJoined(true);
    setPoints(170); // Add 50 bonus welcome points!
    setSignUpModalOpen(false);
  };

  const handleRedeem = (rewardTitle: string, pts: number) => {
    if (points >= pts) {
      setPoints((prev) => prev - pts);
      setRedeemedToast(`Redeemed "${rewardTitle}"! Coupon BLISSFREE applied.`);
      onApplyDiscount('BLISSFREE');
      setTimeout(() => setRedeemedToast(null), 4000);
    } else {
      setRedeemedToast(`Need ${pts - points} more points for "${rewardTitle}".`);
      setTimeout(() => setRedeemedToast(null), 3000);
    }
  };

  return (
    <div className="w-full bg-[#120E0B] text-[#EDE7DE] pt-28 pb-24 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#241D17] border border-[#C9A87C]/30 text-[#C9A87C] text-xs font-semibold uppercase tracking-[0.2em] mb-4">
            <Gift className="w-3.5 h-3.5" />
            <span>Café Perks &amp; Rewards</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl text-[#FAF6F0] font-normal tracking-tight">
            Offers &amp; Loyalty Rewards
          </h1>
          <div className="w-16 h-[2px] bg-[#C9A87C]/50 mx-auto mt-4 mb-4" />
          <p className="text-sm sm:text-base text-[#BFB2A3] font-light leading-relaxed">
            Exclusive discounts, seasonal combos, and points earned on every handcrafted espresso, breakfast plate, and whole-bean bag.
          </p>
        </div>

        {/* LOYALTY POINTS BALANCE UI */}
        <section className="mb-20 p-8 sm:p-10 rounded-3xl bg-gradient-to-r from-[#1E1713] via-[#281D17] to-[#1E1713] border border-[#C9A87C]/30 shadow-2xl relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Points Display */}
            <div className="lg:col-span-7 space-y-4">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#C9A87C]">
                <Award className="w-4 h-4" />
                <span>Brew &amp; Bliss Club</span>
                {userJoined && <span className="text-emerald-400">· Member Active</span>}
              </div>

              <h2 className="font-serif text-3xl sm:text-4xl text-[#FAF6F0] font-normal leading-tight">
                Earn Points Every Time You Visit.
              </h2>

              <p className="text-xs sm:text-sm text-[#BFB2A3] font-light leading-relaxed max-w-xl">
                Earn 10 points for every $1 spent in-store or online. Redeem points for free size upgrades, warm butter croissants, signature lattes, or bags of direct-trade beans.
              </p>

              {/* Progress Bar towards Next Free Drink (150 pts) */}
              <div className="pt-2 max-w-md space-y-2">
                <div className="flex justify-between text-xs text-[#BFB2A3]">
                  <span>Current Points: <strong className="text-[#C9A87C] font-mono text-sm">{points} pts</strong></span>
                  <span>Next Reward: <strong>150 pts (Free Drink)</strong></span>
                </div>
                <div className="w-full h-3 rounded-full bg-[#14100D] overflow-hidden p-0.5 border border-[#3A2D23]">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-[#C9A87C] to-[#E8CBA3] transition-all duration-700"
                    style={{ width: `${Math.min(100, (points / 150) * 100)}%` }}
                  />
                </div>
                <div className="text-[11px] text-[#A89885] flex justify-between">
                  <span>Level 1: Novice Sipper</span>
                  <span>{150 - points > 0 ? `${150 - points} pts until Free Handcrafted Drink` : 'Reward Unlocked!'}</span>
                </div>
              </div>

              {redeemedToast && (
                <div className="p-3 rounded-xl bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-xs flex items-center gap-2 animate-in fade-in">
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span>{redeemedToast}</span>
                </div>
              )}
            </div>

            {/* Right Join / Sign Up Card */}
            <div className="lg:col-span-5 p-6 rounded-2xl bg-[#14100D]/80 border border-[#C9A87C]/25 text-center space-y-4">
              <div className="w-12 h-12 rounded-full bg-[#2A1F18] border border-[#C9A87C]/40 text-[#C9A87C] mx-auto flex items-center justify-center">
                <UserPlus className="w-6 h-6" />
              </div>

              <div>
                <h3 className="font-serif text-2xl text-[#FAF6F0]">
                  {userJoined ? 'Welcome, VIP Member!' : 'Join in 30 Seconds'}
                </h3>
                <p className="text-xs text-[#BFB2A3] mt-1 font-light">
                  {userJoined
                    ? 'Use your phone number at the counter or log in online to accumulate points.'
                    : 'Get 50 bonus points immediately upon sign-up — enough for a free drink upgrade!'}
                </p>
              </div>

              {!userJoined ? (
                <button
                  onClick={() => setSignUpModalOpen(true)}
                  className="w-full py-3 rounded-full bg-[#C9A87C] text-[#14100D] font-bold text-xs uppercase tracking-wider hover:bg-[#D8B98F] transition-all cursor-pointer shadow-md"
                >
                  Sign Up &amp; Get 50 Bonus Points
                </button>
              ) : (
                <button
                  onClick={() => onNavigate('order')}
                  className="w-full py-3 rounded-full bg-[#C9A87C] text-[#14100D] font-bold text-xs uppercase tracking-wider hover:bg-[#D8B98F] transition-all cursor-pointer shadow-md"
                >
                  Order &amp; Earn 10x Points
                </button>
              )}
            </div>
          </div>
        </section>

        {/* AVAILABLE REWARDS REDEEM TIER GRID */}
        <section className="mb-24">
          <div className="flex items-center justify-between mb-8">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#C9A87C]">
                Loyalty Tiers
              </p>
              <h2 className="font-serif text-3xl sm:text-4xl text-[#FAF6F0]">
                Available Rewards to Claim
              </h2>
            </div>
            <span className="text-xs text-[#A89885] font-mono">Your Balance: {points} pts</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {REWARDS.map((rew) => {
              const canAfford = points >= rew.pointsRequired;
              return (
                <div
                  key={rew.id}
                  className="p-6 rounded-3xl bg-[#1A1512] border border-[#2B221B] hover:border-[#C9A87C]/40 transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[10px] font-semibold uppercase tracking-wider text-[#C9A87C] bg-[#221A15] px-2.5 py-0.5 rounded-full border border-[#C9A87C]/20">
                        {rew.badge}
                      </span>
                      <span className="font-mono text-xs font-bold text-[#FAF6F0] bg-[#14100D] px-2.5 py-1 rounded-full border border-[#2D231C]">
                        {rew.pointsRequired} pts
                      </span>
                    </div>

                    <h3 className="font-serif text-xl text-[#FAF6F0] mb-2">{rew.title}</h3>
                    <p className="text-xs text-[#BFB2A3] font-light leading-relaxed">
                      {rew.description}
                    </p>
                  </div>

                  <div className="pt-5 mt-5 border-t border-[#261E18]">
                    <button
                      onClick={() => handleRedeem(rew.title, rew.pointsRequired)}
                      disabled={!canAfford}
                      className={`w-full py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                        canAfford
                          ? 'bg-[#C9A87C] text-[#14100D] hover:bg-[#D8B98F] shadow-md'
                          : 'bg-[#221B16] text-[#6E6053] border border-[#2D231C] cursor-not-allowed'
                      }`}
                    >
                      {canAfford ? 'Redeem Reward' : `Need ${rew.pointsRequired - points} more pts`}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* ACTIVE PROMOTIONS & WEEKEND COMBOS */}
        <section className="mb-20">
          <div className="text-center max-w-xl mx-auto mb-12">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#C9A87C] mb-2">
              Featured Promotions
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#FAF6F0]">
              Active Specials &amp; Coupon Codes
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {OFFERS.map((offer) => {
              const isCopied = copiedCode === offer.code;
              return (
                <div
                  key={offer.id}
                  className="rounded-3xl bg-[#1A1512] border border-[#2B221B] hover:border-[#C9A87C]/50 transition-all overflow-hidden flex flex-col justify-between shadow-lg"
                >
                  <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#241D17]">
                    <img
                      src={offer.image}
                      alt={offer.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1A1512] via-transparent to-transparent opacity-85" />

                    <div className="absolute top-4 left-4 z-10 flex items-center gap-1.5">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#14100D] bg-[#C9A87C] px-3 py-1 rounded-full shadow-md">
                        {offer.discount}
                      </span>
                    </div>

                    <div className="absolute bottom-3 left-4 right-4 z-10">
                      <span className="text-[11px] text-[#A89885]">{offer.validUntil}</span>
                    </div>
                  </div>

                  <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                    <div>
                      <span className="text-[10px] uppercase tracking-wider text-[#C9A87C] font-semibold block mb-1">
                        {offer.tag}
                      </span>
                      <h3 className="font-serif text-2xl text-[#FAF6F0] mb-2">{offer.title}</h3>
                      <p className="text-xs sm:text-sm text-[#BFB2A3] font-light leading-relaxed">
                        {offer.description}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-[#261E18] space-y-3">
                      {/* Code Pill & Copy Button */}
                      <div className="flex items-center justify-between p-2 rounded-xl bg-[#221A15] border border-[#2D231C]">
                        <span className="font-mono text-xs font-bold text-[#C9A87C] tracking-wider pl-2">
                          {offer.code}
                        </span>
                        <button
                          onClick={() => handleCopyCode(offer.code)}
                          className="px-3 py-1 rounded-lg bg-[#2D221B] text-[11px] text-[#FAF6F0] hover:bg-[#C9A87C] hover:text-[#14100D] transition-colors flex items-center gap-1 cursor-pointer"
                        >
                          {isCopied ? (
                            <>
                              <Check className="w-3 h-3 text-emerald-400" />
                              <span>Copied!</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3 h-3" />
                              <span>Copy</span>
                            </>
                          )}
                        </button>
                      </div>

                      <button
                        onClick={() => handleApplyAndOrder(offer.code)}
                        className="w-full py-2.5 rounded-full bg-[#C9A87C] text-[#14100D] font-semibold text-xs uppercase tracking-wider hover:bg-[#D8B98F] transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
                      >
                        <span>Apply &amp; Order Now</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </div>

      {/* SIGN UP MODAL */}
      {signUpModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="relative max-w-md w-full bg-[#181310] border border-[#C9A87C]/40 rounded-3xl p-6 sm:p-8 text-[#EDE7DE] shadow-2xl space-y-5 animate-in zoom-in-95">
            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-[#2A1F18] border border-[#C9A87C]/30 text-[#C9A87C] mx-auto flex items-center justify-center mb-3">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-3xl text-[#FAF6F0]">Join Brew &amp; Bliss Club</h3>
              <p className="text-xs text-[#BFB2A3] mt-1 font-light">
                Instantly receive 50 bonus welcome points and 20% off your next order.
              </p>
            </div>

            <form onSubmit={handleJoinClub} className="space-y-4">
              <div>
                <label className="block text-[11px] uppercase tracking-wider text-[#A89885] mb-1">
                  Your Full Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ethan Helese"
                  value={nameInput}
                  onChange={(e) => setNameInput(e.target.value)}
                  className="w-full bg-[#120E0B] border border-[#2B221B] focus:border-[#C9A87C] rounded-xl px-3.5 py-2 text-xs text-[#FAF6F0] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-wider text-[#A89885] mb-1">
                  Mobile Phone (For Loyalty Points ID)
                </label>
                <input
                  type="tel"
                  required
                  placeholder="(503) 555-0198"
                  value={phoneInput}
                  onChange={(e) => setPhoneInput(e.target.value)}
                  className="w-full bg-[#120E0B] border border-[#2B221B] focus:border-[#C9A87C] rounded-xl px-3.5 py-2 text-xs text-[#FAF6F0] focus:outline-none"
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setSignUpModalOpen(false)}
                  className="flex-1 py-3 rounded-full border border-[#2B221B] text-xs font-semibold uppercase tracking-wider text-[#BFB2A3] hover:text-[#FAF6F0]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 rounded-full bg-[#C9A87C] text-[#14100D] font-bold text-xs uppercase tracking-wider hover:bg-[#D8B98F] shadow-lg cursor-pointer"
                >
                  Join &amp; Claim 50 Pts
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
