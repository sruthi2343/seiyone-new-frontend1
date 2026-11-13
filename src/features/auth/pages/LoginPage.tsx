import { useState, type FormEvent } from "react";
import { ArrowRight, Eye, EyeOff, LockKeyhole, UserRound } from "lucide-react";
import { toast } from "sonner";
import { FormField } from "@/components/common/FormField";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import seiyoneLogo from "@/assets/images/seiyone-logo.png";

type LoginErrors = { username?: string; password?: string };

// Client-side checks only, with the old Seiyone messages. The real sign-in arrives with the auth phase.
function validate(username: string, password: string): LoginErrors {
  const errors: LoginErrors = {};
  if (!username.trim()) errors.username = "Please enter your username or email.";
  if (!password) errors.password = "Please enter your password.";
  return errors;
}

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<LoginErrors>({});

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors = validate(username, password);
    setErrors(nextErrors);
    if (nextErrors.username || nextErrors.password) return;
    toast.info("Sign-in is not available yet", {
      description: "It will work once the authentication service is connected.",
    });
  };

  return (
    <main className="flex min-h-[100dvh] items-center justify-center p-4 sm:p-6">
      <section aria-labelledby="login-heading" className="w-full max-w-sm rounded-2xl border bg-card p-6 shadow-sm sm:p-8">
        <div className="mb-6 flex justify-center">
          <img src={seiyoneLogo} alt="Seiyone" className="h-24 w-24 object-contain" />
        </div>
        <h1 id="login-heading" className="mb-6 text-center text-2xl font-semibold tracking-tight text-foreground">
          Welcome back
        </h1>

        <form noValidate onSubmit={handleSubmit} className="space-y-4">
          <FormField id="login-username" label="Username or Email" error={errors.username} required>
            {(field) => (
              <div className="relative">
                <UserRound aria-hidden="true" className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  {...field}
                  type="text"
                  autoComplete="username"
                  placeholder="Enter your username or email"
                  value={username}
                  onChange={(event) => setUsername(event.target.value)}
                  className="h-10 pl-9"
                />
              </div>
            )}
          </FormField>

          <FormField id="login-password" label="Password" error={errors.password} required>
            {(field) => (
              <div className="relative">
                <LockKeyhole aria-hidden="true" className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  {...field}
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  className="h-10 pl-9 pr-11"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  onClick={() => setShowPassword((shown) => !shown)}
                  className="absolute right-1 top-1/2 h-8 w-8 -translate-y-1/2 text-muted-foreground"
                >
                  {showPassword ? <EyeOff /> : <Eye />}
                </Button>
              </div>
            )}
          </FormField>

          <Button type="submit" className="h-11 w-full">
            Sign In
            <ArrowRight aria-hidden="true" />
          </Button>
        </form>
      </section>
    </main>
  );
}
