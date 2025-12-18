import { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Lock, LogOut, Home, BookOpen, Calendar, Settings, Mail, Menu, X, ArrowLeft, Shield } from "lucide-react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";

const AdminLayout = () => {
  const { user, login, logout, isAuthenticated, loading } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoggingIn(true);
    
    try {
      await login(email, password);
      navigate("/admin");
    } catch (error) {
      setError("Invalid email or password");
      console.error("Login error:", error);
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/admin/login");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="bg-card rounded-xl p-6 shadow-card text-center">
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-primary/10 flex items-center justify-center p-4 relative overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl"></div>
        </div>

        <div className="relative bg-card/80 backdrop-blur-xl rounded-2xl p-8 sm:p-10 shadow-2xl max-w-md w-full border border-primary/10">
          {/* Header with icon */}
          <div className="text-center mb-8">
            <div className="relative inline-block mb-6">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center mx-auto shadow-lg">
                <Shield className="w-10 h-10 text-white" />
              </div>
              <div className="absolute -top-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-4 border-card"></div>
            </div>
            <h1 className="font-heading text-3xl sm:text-4xl font-bold text-foreground mb-2 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
              Admin Portal
            </h1>
            <p className="text-muted-foreground text-sm">
              Secure access to your dashboard
            </p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleLogin} className="space-y-5">
            <div className="space-y-2">
              <Label className="flex items-center gap-2 text-sm font-medium text-foreground">
                <Mail className="w-4 h-4 text-primary" /> Email Address
              </Label>
              <div className="relative">
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => { 
                    setEmail(e.target.value); 
                    setError(""); 
                  }}
                  placeholder="admin@example.com"
                  required
                  className="pl-4 pr-4 py-3 text-base border-2 focus:border-primary transition-all"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label className="flex items-center gap-2 text-sm font-medium text-foreground">
                <Lock className="w-4 h-4 text-primary" /> Password
              </Label>
              <div className="relative">
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => { 
                    setPassword(e.target.value); 
                    setError(""); 
                  }}
                  placeholder="Enter your password"
                  required
                  className="pl-4 pr-4 py-3 text-base border-2 focus:border-primary transition-all"
                />
              </div>
            </div>

            {error && (
              <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-3 flex items-start gap-2">
                <Lock className="w-4 h-4 text-destructive mt-0.5 flex-shrink-0" />
                <p className="text-destructive text-sm">{error}</p>
              </div>
            )}

            <Button 
              type="submit" 
              variant="default" 
              className="w-full py-6 text-base font-semibold bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary shadow-lg hover:shadow-xl transition-all" 
              disabled={isLoggingIn}
            >
              {isLoggingIn ? (
                <span className="flex items-center justify-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Signing in...
                </span>
              ) : (
                "Sign In to Dashboard"
              )}
            </Button>
          </form>

          {/* Go to Home Button */}
          <div className="mt-6 pt-6 border-t border-border">
            <Link to="/">
              <Button 
                variant="outline" 
                className="w-full py-3 text-sm font-medium hover:bg-primary/5 transition-all group"
              >
                <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                Go to Home
              </Button>
            </Link>
          </div>

          {/* Footer text */}
          <p className="text-center text-xs text-muted-foreground mt-6">
            Protected by secure authentication
          </p>
        </div>
      </div>
    );
  }

  const navItems = [
    { href: "/admin", label: "Dashboard", icon: Settings },
    { href: "/admin/homepage", label: "Home Page", icon: Home },
    { href: "/admin/blogs", label: "Blogs", icon: BookOpen },
    { href: "/admin/slots", label: "Appointment Slots", icon: Calendar },
  ];

  return (
    <div className="min-h-screen bg-background flex">
      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 bg-card border-b border-border p-4 flex items-center justify-between z-50">
        <h2 className="text-xl font-bold text-foreground">Admin Panel</h2>
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </Button>
      </div>

      {/* Sidebar */}
      <aside className={`
        fixed lg:static inset-y-0 left-0 z-40
        w-64 bg-card border-r border-border p-4 flex flex-col justify-between
        transform transition-transform duration-300 ease-in-out
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        mt-[73px] lg:mt-0
      `}>
        {/* Top part */}
        <div>
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl font-bold text-foreground">Admin Panel</h2>
            <Button variant="ghost" size="icon" onClick={handleLogout}>
              <LogOut className="w-5 h-5" />
            </Button>
          </div>
          
          <nav className="space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  location.pathname === item.href
                    ? 'bg-primary/10 text-primary'
                    : 'text-muted-foreground hover:bg-accent/50 hover:text-foreground'
                }`}
              >
                <item.icon className="w-5 h-5" />
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
        
        {/* Bottom part */}
        <div className="mt-auto pt-4 border-t border-border">
          <div className="flex items-center gap-3 p-3 rounded-lg bg-accent/30">
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
              <span className="text-sm font-medium text-primary">
                {user?.email?.charAt(0).toUpperCase() || 'A'}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground truncate">{user?.email || 'Admin'}</p>
              <p className="text-xs text-muted-foreground">Admin</p>
            </div>
          </div>
        </div>
      </aside>
      
      {/* Overlay for mobile */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
      
      {/* Main content */}
      <main className="flex-1 p-4 sm:p-6 overflow-auto mt-[73px] lg:mt-0">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
