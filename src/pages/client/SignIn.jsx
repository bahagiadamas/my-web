import Container from "../../components/Container";
import Loading from "../../components/Loading";

import logo from "../../assets/img/logo.png";
import { IoLogoGoogle } from "react-icons/io5";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { Helmet } from "react-helmet-async";

export default function SignIn() {
  const { user, loading, isAdmin, loginWithGoogle } = useAuth();
  const navigate = useNavigate();
  const [signInError, setSignInError] = useState(null);

  useEffect(() => {
    if (!loading) {
      if (user) {
        if (isAdmin) {
          navigate("/admin", { replace: true });
        } else {
          navigate("/", { replace: true });
        }
      }
    }
  }, [user, loading, isAdmin, navigate]);

  const handleGoogleSignIn = async (e) => {
    e.preventDefault();
    setSignInError(null);
    const success = await loginWithGoogle();
    if (!success) {
      setSignInError("Login with Google Failed, please try again later.");
    }
  };

  if (loading) {
    return (
      <div className="loading-overlay bg-base-200 fixed inset-0">
        <Loading
          message="Checking authentication..."
          className="text-base-content fixed top-1/2 left-1/2 -translate-1/2"
        />
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>D B I CIPTA - Sign In</title>
        <meta
          name="description"
          content="Sign in to manage your portfolio projects, edit content, and access admin features."
        />
        <meta property="og:title" content="D B I CIPTA - Sign In" />
        <meta
          property="og:description"
          content="Securely sign in to your portfolio admin dashboard to manage and update your work."
        />
      </Helmet>

      <section id="sign-in">
        <Container>
          <div className="section-heading mt-8">
            <img
              src={logo}
              alt="Logo"
              loading="lazy"
              className="mx-auto max-h-16"
            />
            <h4 className="my-3 text-center">
              Sign in to Verify Your Identity
            </h4>
            {signInError && (
              <p className="text-error-content my-2 text-center">
                {signInError}
              </p>
            )}
          </div>
          <div className="form-wrapper mx-auto max-w-[min(100%,650px)]">
            <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-full border p-4">
              <input
                type="email"
                className="input my-2 w-full"
                placeholder="Email"
              />

              <input
                type="password"
                className="input my-2 w-full"
                placeholder="Password"
              />

              <button className="btn btn-neutral mt-4">Login</button>
              <div className="divider">OR</div>
              <button
                className="btn btn-outline"
                onClick={handleGoogleSignIn}
                disabled={loading}
              >
                <IoLogoGoogle /> Sign in with Google
              </button>
            </fieldset>
          </div>
        </Container>
      </section>
    </>
  );
}
