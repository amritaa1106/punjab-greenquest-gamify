import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Play, Award, Users, Target } from "lucide-react";
import heroImage from "@/assets/hero-image.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-hero opacity-80"></div>
      </div>
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Punjab <span className="text-green-300">Green</span> Quest
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-green-100">
            Gamified Environmental Education Platform for Schools & Colleges
          </p>
          <p className="text-lg mb-12 text-green-50 max-w-3xl mx-auto">
            Join thousands of students across Punjab in taking real environmental action. 
            Complete eco-missions, earn badges, and create measurable impact for a sustainable future.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Button size="lg" variant="success" className="text-lg px-8 py-4">
              <Play className="w-5 h-5 mr-2" />
              Start Your Quest
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 py-4 border-white text-white hover:bg-white hover:text-primary">
              Watch Demo
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-2xl mx-auto">
            <Card className="bg-white/10 backdrop-blur-md border-white/20 p-6">
              <div className="flex items-center justify-center mb-2">
                <Users className="w-8 h-8 text-green-300" />
              </div>
              <h3 className="text-2xl font-bold mb-1">5,000+</h3>
              <p className="text-green-100">Active Students</p>
            </Card>
            
            <Card className="bg-white/10 backdrop-blur-md border-white/20 p-6">
              <div className="flex items-center justify-center mb-2">
                <Target className="w-8 h-8 text-blue-300" />
              </div>
              <h3 className="text-2xl font-bold mb-1">50+</h3>
              <p className="text-green-100">Eco Missions</p>
            </Card>
            
            <Card className="bg-white/10 backdrop-blur-md border-white/20 p-6">
              <div className="flex items-center justify-center mb-2">
                <Award className="w-8 h-8 text-yellow-300" />
              </div>
              <h3 className="text-2xl font-bold mb-1">10,000+</h3>
              <p className="text-green-100">Actions Completed</p>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;