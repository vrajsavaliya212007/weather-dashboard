import { Link } from "react-router-dom";
import { useState } from "react";
import toast from "react-hot-toast";
import AuthCard from "../../components/ui/AuthCard";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import { forgotPassword } from "../../services/authApi";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await forgotPassword(email);
      toast.success(res.message);
      setEmail("");
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthCard title="Forgot Password" subtitle="Receive password reset link">
      <form onSubmit={handleSubmit} className="space-y-5">
        <Input
          label="Email Address"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
        />
        <Button type="submit" loading={loading}>
          Send Reset Link
        </Button>
        <p className="text-center text-sm">
          <Link to="/login" className="font-semibold text-blue-600">
            Back To Login
          </Link>
        </p>
      </form>
    </AuthCard>
  );
}

export default ForgotPassword;
