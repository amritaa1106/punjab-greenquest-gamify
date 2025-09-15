import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Droplets, Recycle, TreePine, Zap, TrendingUp, Calendar } from "lucide-react";

const impactMetrics = [
  {
    icon: <Droplets className="w-8 h-8 text-blue-500" />,
    title: "Water Conserved",
    value: "45,000",
    unit: "Liters",
    progress: 75,
    target: "60,000 L",
    description: "This month's water conservation efforts"
  },
  {
    icon: <Recycle className="w-8 h-8 text-green-500" />,
    title: "Waste Recycled", 
    value: "2,300",
    unit: "KG",
    progress: 92,
    target: "2,500 KG",
    description: "Plastic and paper waste diverted from landfills"
  },
  {
    icon: <TreePine className="w-8 h-8 text-emerald-500" />,
    title: "Trees Planted",
    value: "1,250",
    unit: "Trees",
    progress: 83,
    target: "1,500 Trees",
    description: "Native species planted across Punjab campuses"
  },
  {
    icon: <Zap className="w-8 h-8 text-yellow-500" />,
    title: "Energy Saved",
    value: "12,500",
    unit: "kWh",
    progress: 68,
    target: "18,000 kWh",
    description: "Renewable energy generated and consumption reduced"
  }
];

const recentAchievements = [
  {
    college: "Punjab Engineering College",
    achievement: "Zero Waste Campus Status",
    date: "15 days ago",
    impact: "100% waste diversion achieved"
  },
  {
    college: "Guru Nanak Dev University", 
    achievement: "Solar Panel Installation",
    date: "1 month ago",
    impact: "50kW renewable energy capacity added"
  },
  {
    college: "Thapar Institute",
    achievement: "Plastic-Free Initiative",
    date: "2 months ago",
    impact: "Eliminated 500kg single-use plastic monthly"
  }
];

const ImpactSection = () => {
  return (
    <section id="impact" className="py-20 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 text-foreground">Real Impact Achieved</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Measurable environmental outcomes from student actions across Punjab's educational institutions
          </p>
        </div>

        {/* Impact Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {impactMetrics.map((metric, index) => (
            <Card key={index} className="text-center hover:shadow-green transition-all duration-300">
              <CardHeader className="pb-3">
                <div className="flex justify-center mb-2">
                  {metric.icon}
                </div>
                <CardTitle className="text-lg">{metric.title}</CardTitle>
                <CardDescription>{metric.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="text-3xl font-bold text-primary mb-1">
                      {metric.value}
                    </div>
                    <div className="text-sm text-muted-foreground">{metric.unit}</div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Progress to target</span>
                      <span>{metric.progress}%</span>
                    </div>
                    <Progress value={metric.progress} className="h-2" />
                    <div className="text-xs text-muted-foreground">
                      Target: {metric.target}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Recent Achievements */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <TrendingUp className="w-5 h-5 mr-2 text-primary" />
              Recent Institutional Achievements
            </CardTitle>
            <CardDescription>
              Major sustainability milestones reached by participating colleges
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {recentAchievements.map((achievement, index) => (
                <Card key={index} className="border border-success/20 bg-success/5">
                  <CardContent className="pt-6">
                    <div className="space-y-3">
                      <div className="flex items-start justify-between">
                        <h3 className="font-semibold text-success">{achievement.achievement}</h3>
                        <div className="flex items-center text-xs text-muted-foreground">
                          <Calendar className="w-3 h-3 mr-1" />
                          {achievement.date}
                        </div>
                      </div>
                      <p className="text-sm font-medium">{achievement.college}</p>
                      <p className="text-sm text-muted-foreground">{achievement.impact}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <Card className="bg-gradient-hero border-0 text-white max-w-2xl mx-auto">
            <CardContent className="pt-8 pb-8">
              <h3 className="text-2xl font-bold mb-4">Ready to Make an Impact?</h3>
              <p className="text-lg mb-6 text-green-100">
                Join thousands of students creating measurable environmental change across Punjab
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <button className="px-6 py-3 bg-white text-primary rounded-lg font-semibold hover:bg-green-50 transition-colors">
                  Start Your First Mission
                </button>
                <button className="px-6 py-3 border-2 border-white text-white rounded-lg font-semibold hover:bg-white hover:text-primary transition-colors">
                  View Impact Dashboard
                </button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default ImpactSection;