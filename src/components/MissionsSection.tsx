import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Droplets, Recycle, Leaf, Zap, Camera, Clock } from "lucide-react";

const missions = [
  {
    id: 1,
    title: "Plastic-Free Week Challenge",
    description: "Eliminate single-use plastics for 7 days and document alternatives",
    icon: <Recycle className="w-6 h-6" />,
    points: 500,
    difficulty: "Medium",
    timeLeft: "5 days left",
    progress: 65,
    participants: 234,
    category: "Waste Reduction"
  },
  {
    id: 2,
    title: "Save Water Campaign",
    description: "Implement water conservation methods and track usage reduction",
    icon: <Droplets className="w-6 h-6" />,
    points: 350,
    difficulty: "Easy",
    timeLeft: "12 days left", 
    progress: 80,
    participants: 456,
    category: "Water Conservation"
  },
  {
    id: 3,
    title: "Stubble Burning Alternatives",
    description: "Research and promote eco-friendly alternatives to stubble burning",
    icon: <Leaf className="w-6 h-6" />,
    points: 750,
    difficulty: "Hard",
    timeLeft: "20 days left",
    progress: 25,
    participants: 89,
    category: "Air Quality"
  },
  {
    id: 4,
    title: "Renewable Energy Project",
    description: "Create a small solar or wind energy demonstration",
    icon: <Zap className="w-6 h-6" />,
    points: 1000,
    difficulty: "Hard",
    timeLeft: "30 days left",
    progress: 10,
    participants: 67,
    category: "Energy"
  }
];

const MissionsSection = () => {
  return (
    <section id="missions" className="py-20 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 text-foreground">Active Eco-Missions</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Take on real-world environmental challenges and earn points, badges, and recognition
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {missions.map((mission) => (
            <Card key={mission.id} className="hover:shadow-green transition-all duration-300 border-l-4 border-l-primary">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-primary/10 rounded-lg text-primary">
                      {mission.icon}
                    </div>
                    <div>
                      <CardTitle className="text-xl">{mission.title}</CardTitle>
                      <CardDescription className="mt-1">{mission.description}</CardDescription>
                    </div>
                  </div>
                  <Badge variant="outline" className="ml-2">
                    {mission.points} pts
                  </Badge>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <span className="flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    {mission.timeLeft}
                  </span>
                  <span>{mission.participants} participants</span>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span>Progress</span>
                    <span>{mission.progress}%</span>
                  </div>
                  <Progress value={mission.progress} className="h-2" />
                </div>

                <div className="flex items-center justify-between">
                  <Badge variant={mission.difficulty === 'Easy' ? 'success' : mission.difficulty === 'Medium' ? 'warning' : 'destructive'}>
                    {mission.difficulty}
                  </Badge>
                  <Badge variant="secondary">{mission.category}</Badge>
                </div>
              </CardContent>

              <CardFooter className="flex space-x-2">
                <Button className="flex-1" variant="default">
                  <Camera className="w-4 h-4 mr-2" />
                  Join Mission
                </Button>
                <Button variant="outline" size="sm">
                  Learn More
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MissionsSection;