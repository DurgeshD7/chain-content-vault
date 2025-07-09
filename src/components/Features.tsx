
import { Shield, Zap, Globe, Lock, TrendingUp, Heart } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const Features = () => {
  const features = [
    {
      icon: Shield,
      title: "Smart Contract Protection",
      description: "Your intellectual property is protected by immutable smart contracts on the ICP blockchain, ensuring permanent copyright ownership.",
      gradient: "from-purple-500 to-purple-600"
    },
    {
      icon: Zap,
      title: "Instant Payments",
      description: "Get paid immediately when your content is purchased. No waiting periods, no intermediaries, just direct creator-to-consumer transactions.",
      gradient: "from-blue-500 to-blue-600"
    },
    {
      icon: Globe,
      title: "Global Reach",
      description: "Access a worldwide audience without geographical restrictions. The blockchain enables truly borderless content distribution.",
      gradient: "from-indigo-500 to-indigo-600"
    },
    {
      icon: Lock,
      title: "Decentralized Security",
      description: "Your content and earnings are secured by the Internet Computer's decentralized network, making censorship and seizure impossible.",
      gradient: "from-purple-600 to-blue-600"
    },
    {
      icon: TrendingUp,
      title: "Creator Analytics",
      description: "Track your earnings, audience engagement, and content performance with real-time analytics powered by blockchain transparency.",
      gradient: "from-blue-600 to-indigo-600"
    },
    {
      icon: Heart,
      title: "Community Driven",
      description: "Built by creators, for creators. Our platform evolves based on community feedback and decentralized governance.",
      gradient: "from-indigo-600 to-purple-600"
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Why Choose Our Platform?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Experience the future of content monetization with cutting-edge blockchain technology 
            designed specifically for creators.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="group hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 bg-white border-0 shadow-lg">
              <CardContent className="p-8">
                <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-r ${feature.gradient} mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className="h-8 w-8 text-white" />
                </div>
                
                <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-purple-600 transition-colors duration-300">
                  {feature.title}
                </h3>
                
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
