import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Droplets } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { APP_ROUTES } from '@/constants/routes';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { loginThunk } from '@/redux/auth';
import { toast } from 'sonner';
const Login = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { loading, error, isAuthenticated } = useAppSelector((state) => state.auth);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    if (isAuthenticated) {
      navigate(APP_ROUTES.DASHBOARD);
    }
  }, [isAuthenticated, navigate]);

  const handleLogin = async () => {
    const result = await dispatch(
      loginThunk({
        email,
        password,
      })
    );

    if (loginThunk.fulfilled.match(result)) {
      toast.success('Login Successful');

      navigate(APP_ROUTES.DASHBOARD);
    }

    if (loginThunk.rejected.match(result)) {
      toast.error(result.payload as string);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100">
      <div className="container mx-auto flex min-h-screen items-center justify-center px-6">
        {/* Left Section */}
        <div className="hidden flex-1 pr-20 lg:block">
          <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-blue-600 text-white">
            <Droplets size={40} />
          </div>

          <h1 className="mb-6 text-5xl font-bold leading-tight text-slate-900">
            Sapthagiri Water Suppliers
          </h1>

          <p className="text-lg leading-8 text-slate-500">
            Manage customers, bookings, vehicles, drivers, expenses and reports from one centralized
            dashboard.
          </p>
        </div>

        {/* Login Card */}

        <div className="w-full max-w-md">
          <Card className="shadow-xl">
            <CardHeader className="space-y-3 text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-blue-600 text-white">
                <Droplets size={30} />
              </div>

              <CardTitle className="text-3xl">Welcome Back</CardTitle>

              <CardDescription>Sign in to continue</CardDescription>
            </CardHeader>

            <CardContent>
              <form
                className="space-y-5"
                onSubmit={(e) => {
                  e.preventDefault();
                  handleLogin();
                }}
              >
                {/* Email */}

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>

                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                {/* Password */}

                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>

                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>

                {/* Error */}

                {error && <p className="text-sm text-red-500">{error}</p>}

                {/* Remember */}

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="remember" />

                    <Label htmlFor="remember">Remember me</Label>
                  </div>

                  <button type="button" className="text-sm text-blue-600 hover:text-blue-700">
                    Forgot Password?
                  </button>
                </div>

                {/* Login Button */}

                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? 'Signing In...' : 'Sign In'}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Login;
