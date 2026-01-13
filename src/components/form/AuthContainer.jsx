import bgImage from "@/assets/images/auth-bg.jpg";
import logo from "@/assets/images/logo.png";

const AuthContainer = ({ children, title, description }) => {
  return (
    <article
      style={{ backgroundImage: `url(${bgImage})` }}
      className="bg-cover bg-center p-4 flex items-center justify-center lg:p-0 lg:justify-start"
    >
      <section className="min-h-[90vh] overflow-y-auto w-full max-w-[500px] rounded-2xl lg:rounded-none flex flex-col items-center justify-center gap-4 bg-card p-6">
        <img src={logo} alt="logo" />
        <h3 className="text-2xl font-bold">{title}</h3>
        <p className="text-sm">{description}</p>

        {children}
      </section>
    </article>
  );
};

export default AuthContainer;
