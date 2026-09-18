import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signup, clearAuthError } from "../features/auth/authSlice";
import { addToast } from "../features/ui/uiSlice";
import Input from "../components/common/Input";
import Button from "../components/common/Button";
import { AuthShell } from "./Login";
import { isValidEmail } from "../utils/helpers";

export default function Signup() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error, isAuthenticated } = useSelector((state) => state.auth);
  const [form, setForm] = useState({ name: "", email: "", password: "", confirmPassword: "" });
  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    dispatch(clearAuthError());
  }, [dispatch]);

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(addToast({ message: "Account created — welcome to WorkFlow!", variant: "success" }));
      navigate("/dashboard", { replace: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated]);

  const validate = () => {
    const next = {};
    if (!form.name.trim()) next.name = "Name is required.";
    if (!isValidEmail(form.email)) next.email = "Enter a valid email address.";
    if (form.password.length < 6) next.password = "Use at least 6 characters.";
    if (form.confirmPassword !== form.password) next.confirmPassword = "Passwords don't match.";
    setFormErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    dispatch(signup({ name: form.name, email: form.email, password: form.password }));
  };

  return (
    <AuthShell>
      <h1 className="font-display text-2xl font-extrabold text-paper-100 mb-1.5">Create your account</h1>
      <p className="text-sm text-paper-100/55 mb-6">Set up WorkFlow for your team in a minute.</p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input label="Full name" value={form.name} onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))} error={formErrors.name} placeholder="Jordan Blake" />
        <Input label="Email" type="email" value={form.email} onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))} error={formErrors.email} placeholder="you@company.com" />
        <Input label="Password" type="password" value={form.password} onChange={(e) => setForm((p) => ({ ...p, password: e.target.value }))} error={formErrors.password} placeholder="At least 6 characters" />
        <Input label="Confirm password" type="password" value={form.confirmPassword} onChange={(e) => setForm((p) => ({ ...p, confirmPassword: e.target.value }))} error={formErrors.confirmPassword} placeholder="Repeat your password" />
        {error && <p className="text-sm text-coral">{error}</p>}
        <Button type="submit" className="w-full">
          Create account
        </Button>
      </form>

      <p className="text-sm text-paper-100/55 mt-6 text-center">
        Already have an account?{" "}
        <Link to="/login" className="text-signal font-semibold hover:text-signal-light">
          Sign in
        </Link>
      </p>
    </AuthShell>
  );
}
