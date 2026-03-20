import { SignupForm } from "./_components/SignupForm/";
import { SignupHero } from "./_components/SignupHero";

const SignupPage = () => {
  return (
    <div className="flex h-screen select-none flex-row">
      <div className="flex w-2/5 flex-col bg-blue-600 dark:bg-blue-950">
        <SignupHero />
      </div>
      <div className="w-3/5 bg-surface">
        <SignupForm />
      </div>
    </div>
  );
};

export default SignupPage;
