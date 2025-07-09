
import { Card, CardContent } from "@/components/ui/card";
import { Star, Eye } from "lucide-react";

const CreatorShowcase = () => {
  const creators = [
    {
      name: "Sarah Chen",
      type: "Digital Artist",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      earnings: "$12,400",
      content: "Abstract NFT Collection",
      rating: 4.9,
      sales: 156
    },
    {
      name: "Marcus Rivera",
      type: "Music Producer",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      earnings: "$8,750",
      content: "Electronic Beats Pack",
      rating: 4.8,
      sales: 89
    },
    {
      name: "Emma Thompson",
      type: "Video Creator",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      earnings: "$15,200",
      content: "Tutorial Series",
      rating: 5.0,
      sales: 234
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Meet Our Top Creators
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Join thousands of creators who are already earning fair compensation for their work.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {creators.map((creator, index) => (
            <Card key={index} className="group hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 bg-gradient-to-br from-purple-50 to-blue-50 border-0">
              <CardContent className="p-8 text-center">
                <div className="relative mb-6">
                  <img
                    src={creator.avatar}
                    alt={creator.name}
                    className="w-20 h-20 rounded-full mx-auto object-cover ring-4 ring-purple-200 group-hover:ring-purple-400 transition-all duration-300"
                  />
                  <div className="absolute -bottom-2 -right-2 bg-green-500 w-6 h-6 rounded-full border-2 border-white"></div>
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-2">{creator.name}</h3>
                <p className="text-purple-600 font-medium mb-4">{creator.type}</p>

                <div className="bg-white rounded-lg p-4 mb-6 shadow-sm">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-600">Latest Work</span>
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="text-sm font-medium">{creator.rating}</span>
                    </div>
                  </div>
                  <p className="font-semibold text-gray-900 mb-3">{creator.content}</p>
                  <div className="flex justify-between text-sm text-gray-600">
                    <span className="flex items-center"><Eye className="h-4 w-4 mr-1" /> {creator.sales} sales</span>
                    <span className="text-green-600 font-bold">{creator.earnings}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="text-2xl font-bold text-transparent bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text">
                    {creator.earnings}
                  </div>
                  <p className="text-sm text-gray-600">Total Earnings</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl p-8 text-white">
            <h3 className="text-3xl font-bold mb-4">Ready to Join Them?</h3>
            <p className="text-xl mb-8 text-purple-100">
              Start earning from your creative work today. No setup fees, no hidden costs.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CreatorShowcase;
