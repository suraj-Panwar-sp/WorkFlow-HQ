import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login, clearAuthError } from "../features/auth/authSlice";
import { addToast } from "../features/ui/uiSlice";
import Input from "../components/common/Input";
import Button from "../components/common/Button";

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error, isAuthenticated } = useSelector((state) => state.auth);
  const [form, setForm] = useState({ email: "admin@workflow.io", password: "admin123" });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    dispatch(clearAuthError());
  }, [dispatch]);

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(addToast({ message: "Welcome back!", variant: "success" }));
      navigate("/dashboard", { replace: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitting(true);
    dispatch(login(form));
    setSubmitting(false);
  };

  return (
    <AuthShell>
      <h1 className="font-display text-2xl font-extrabold text-paper-100 mb-1.5">Welcome back</h1>
      <p className="text-sm text-paper-100/55 mb-6">Sign in to manage your team on WorkFlow.</p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Email"
          type="email"
          required
          value={form.email}
          onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
          placeholder="you@company.com"
        />
        <Input
          label="Password"
          type="password"
          required
          value={form.password}
          onChange={(e) => setForm((p) => ({ ...p, password: e.target.value }))}
          placeholder="••••••••"
        />
        {error && <p className="text-sm text-coral">{error}</p>}
        <Button type="submit" className="w-full" isLoading={submitting}>
          Sign in
        </Button>
      </form>

      <p className="text-xs text-paper-100/40 mt-4 text-center">
        Demo credentials are pre-filled — just hit sign in.
      </p>
      <p className="text-sm text-paper-100/55 mt-6 text-center">
        Don't have an account?{" "}
        <Link to="/signup" className="text-signal font-semibold hover:text-signal-light">
          Create one
        </Link>
      </p>
    </AuthShell>
  );
}

export function AuthShell({ children }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-ink-900 px-4 py-10">
      <div className="w-full max-w-sm">
        <div className="flex items-center gap-2.5 justify-center mb-8">
          <div className="h-9 w-9 rounded-lg bg-signal flex items-center justify-center font-display font-extrabold text-ink-950">
            W
          </div>
          <span className="font-display text-xl font-extrabold text-paper-100 tracking-tight">WorkFlow</span>
        </div>
        <div className="card p-7">{children}</div>
      </div>
    </div>
  );
}
