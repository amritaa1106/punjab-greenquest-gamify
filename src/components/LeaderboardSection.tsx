import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Trophy, Medal, Award, TrendingUp } from "lucide-react";

const leaderboardData = [
  {
    rank: 1,
    name: "Simran Kaur",
    college: "Punjab Engineering College",
    points: 2750,
    badges: 12,
    missions: 8,
    avatar: "/placeholder.svg"
  },
  {
    rank: 2, 
    name: "Arjun Singh",
    college: "Guru Nanak Dev University",
    points: 2680,
    badges: 11,
    missions: 7,
    avatar: "/placeholder.svg"
  },
  {
    rank: 3,
    name: "Priya Sharma",
    college: "Thapar Institute of Engineering",
    points: 2540,
    badges: 10,
    missions: 6,
    avatar: "/placeholder.svg"
  },
  {
    rank: 4,
    name: "Manpreet Kaur",
    college: "Chandigarh University",
    points: 2400,
    badges: 9,
    missions: 6,
    avatar: "/placeholder.svg"
  },
  {
    rank: 5,
    name: "Rohit Kumar",
    college: "LPU Jalandhar",
    points: 2350,
    badges: 8,
    missions: 5,
    avatar: "/placeholder.svg"
  }
];

const LeaderboardSection = () => {
  return (
    <section id="leaderboard" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 text-foreground">Champions Leaderboard</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Top environmental champions making the biggest impact across Punjab's institutions
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Top 3 Podium */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {leaderboardData.slice(0, 3).map((student, index) => (
              <Card 
                key={student.rank} 
                className={`text-center relative overflow-hidden ${
                  index === 0 ? 'md:order-2 ring-2 ring-primary shadow-glow' : 
                  index === 1 ? 'md:order-1 md:mt-8' : 'md:order-3 md:mt-8'
                }`}
              >
                <div className={`absolute top-0 left-0 right-0 h-1 ${
                  index === 0 ? 'bg-gradient-primary' : 
                  index === 1 ? 'bg-gradient-secondary' : 'bg-warning'
                }`} />
                
                <CardHeader className="pb-4">
                  <div className="flex justify-center mb-4">
                    <div className={`p-3 rounded-full ${
                      index === 0 ? 'bg-gradient-primary' : 
                      index === 1 ? 'bg-gradient-secondary' : 'bg-warning/20'
                    }`}>
                      {index === 0 ? (
                        <Trophy className="w-8 h-8 text-white" />
                      ) : index === 1 ? (
                        <Medal className="w-8 h-8 text-white" />
                      ) : (
                        <Award className="w-8 h-8 text-warning" />
                      )}
                    </div>
                  </div>
                  
                  <Avatar className="w-16 h-16 mx-auto mb-2">
                    <AvatarImage src={student.avatar} />
                    <AvatarFallback className="text-lg font-bold">
                      {student.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  
                  <CardTitle className="text-lg">{student.name}</CardTitle>
                  <p className="text-sm text-muted-foreground">{student.college}</p>
                </CardHeader>
                
                <CardContent>
                  <div className="text-center space-y-2">
                    <div className="text-2xl font-bold text-primary">{student.points}</div>
                    <p className="text-sm text-muted-foreground">Points</p>
                    
                    <div className="flex justify-center space-x-4 text-sm">
                      <div>
                        <span className="font-semibold text-success">{student.badges}</span>
                        <p className="text-muted-foreground">Badges</p>
                      </div>
                      <div>
                        <span className="font-semibold text-info">{student.missions}</span>
                        <p className="text-muted-foreground">Missions</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Remaining Rankings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <TrendingUp className="w-5 h-5 mr-2 text-primary" />
                Top Performers
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {leaderboardData.slice(3).map((student) => (
                  <div key={student.rank} className="flex items-center justify-between p-4 rounded-lg border border-border hover:bg-secondary/50 transition-colors">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-muted text-sm font-bold">
                        #{student.rank}
                      </div>
                      <Avatar className="w-10 h-10">
                        <AvatarImage src={student.avatar} />
                        <AvatarFallback>
                          {student.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-semibold">{student.name}</h3>
                        <p className="text-sm text-muted-foreground">{student.college}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-6 text-sm">
                      <div className="text-center">
                        <div className="font-bold text-primary">{student.points}</div>
                        <div className="text-muted-foreground">Points</div>
                      </div>
                      <div className="text-center">
                        <div className="font-bold text-success">{student.badges}</div>
                        <div className="text-muted-foreground">Badges</div>
                      </div>
                      <div className="text-center">
                        <div className="font-bold text-info">{student.missions}</div>
                        <div className="text-muted-foreground">Missions</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default LeaderboardSection;