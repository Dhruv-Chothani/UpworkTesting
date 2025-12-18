import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Shield, Mail, Lock, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(email, password);
      navigate('/admin');
    } catch (err) {
      setError('Failed to log in. Please check your credentials.');
      console.error('Login error:', err);
    } finally {
      setLoading(false);
    }
  };

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
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <Label className="flex items-center gap-2 text-sm font-medium text-foreground">
              <Mail className="w-4 h-4 text-primary" /> Email Address
            </Label>
            <div className="relative">
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                onChange={(e) => setPassword(e.target.value)}
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
            disabled={loading}
          >
            {loading ? (
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
