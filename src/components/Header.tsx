import { Button } from "@/components/ui/button";
import { Trophy, User, Bell } from "lucide-react";

const Header = () => {
  return (
    <header className="bg-background/80 backdrop-blur-md border-b border-border sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-lg">PG</span>
          </div>
          <div>
            <h1 className="text-xl font-bold text-foreground">Punjab Green Quest</h1>
            <p className="text-sm text-muted-foreground">Environmental Champions</p>
          </div>
        </div>
        
        <nav className="hidden md:flex items-center space-x-6">
          <a href="#missions" className="text-foreground hover:text-primary transition-colors">Missions</a>
          <a href="#leaderboard" className="text-foreground hover:text-primary transition-colors">Leaderboard</a>
          <a href="#impact" className="text-foreground hover:text-primary transition-colors">Impact</a>
          <a href="#certificates" className="text-foreground hover:text-primary transition-colors">Certificates</a>
        </nav>

        <div className="flex items-center space-x-3">
          <Button variant="outline" size="sm">
            <Bell className="w-4 h-4 mr-2" />
            Notifications
          </Button>
          <Button variant="success" size="sm">
            <User className="w-4 h-4 mr-2" />
            Profile
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;