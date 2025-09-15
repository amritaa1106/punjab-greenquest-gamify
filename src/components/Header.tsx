import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Trophy, User, Bell } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { LoginForm } from "@/components/auth/LoginForm";
import { SignupForm } from "@/components/auth/SignupForm";

const Header = () => {
  const { user, signOut } = useAuth();
  const [showAuth, setShowAuth] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
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
          {user ? (
            <>
              <Button variant="outline" size="sm">
                <Bell className="w-4 h-4 mr-2" />
                Notifications
              </Button>
              <Button variant="success" size="sm">
                <User className="w-4 h-4 mr-2" />
                Profile
              </Button>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={signOut}
                className="text-muted-foreground hover:text-destructive"
              >
                Sign Out
              </Button>
            </>
          ) : (
            <>
              <Button 
                variant="outline"
                size="sm"
                onClick={() => {
                  setIsLogin(true);
                  setShowAuth(true);
                }}
              >
                Sign In
              </Button>
              <Button 
                variant="success"
                size="sm"
                onClick={() => {
                  setIsLogin(false);
                  setShowAuth(true);
                }}
              >
                Join Quest
              </Button>
            </>
          )}
        </div>
      </div>

      <Dialog open={showAuth} onOpenChange={setShowAuth}>
        <DialogContent className="sm:max-w-md">
          {isLogin ? (
            <LoginForm onSwitchToSignup={() => setIsLogin(false)} />
          ) : (
            <SignupForm onSwitchToLogin={() => setIsLogin(true)} />
          )}
        </DialogContent>
      </Dialog>
    </header>
  );
};

export default Header;