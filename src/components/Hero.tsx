
import { ArrowRight, Shield, Coins, Users } from "lucide-react";
import { Button } from "@/components/ui/button";

const Hero = () => {
  console.log("Hero component rendering");
  
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
        <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 leading-tight">
            Monetize Your
            <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent"> Creative Work</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-3xl mx-auto leading-relaxed">
            The first decentralized platform powered by ICP blockchain where creators retain full control, 
            smart contracts protect copyrights, and payments are instant and fair.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button size="lg" className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-4 text-lg font-semibold rounded-full transition-all duration-300 transform hover:scale-105">
              Start Creating <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button variant="outline" size="lg" className="border-2 border-white/30 text-white hover:bg-white/10 px-8 py-4 text-lg font-semibold rounded-full transition-all duration-300">
              Learn More
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <div className="bg-white/10 p-4 rounded-full backdrop-blur-sm">
                  <Shield className="h-8 w-8 text-purple-400" />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">100% Secure</h3>
              <p className="text-gray-300">Blockchain-protected copyrights</p>
            </div>
            
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <div className="bg-white/10 p-4 rounded-full backdrop-blur-sm">
                  <Coins className="h-8 w-8 text-blue-400" />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">0% Platform Fee</h3>
              <p className="text-gray-300">Keep 100% of your earnings</p>
            </div>
            
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <div className="bg-white/10 p-4 rounded-full backdrop-blur-sm">
                  <Users className="h-8 w-8 text-indigo-400" />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">10K+ Creators</h3>
              <p className="text-gray-300">Join our growing community</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
