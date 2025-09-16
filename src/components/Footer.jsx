import Logo from "./headerComponents/Logo";

const Footer = () => {
  return (
    <footer className="border-t border-gray-900/20 shadow-lg">
      <div className="max-w-7xl mx-auto flex flex-col items-center justify-center px-4 py-8">
        <div
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="cursor-pointer mb-4"
        >
          <Logo />
        </div>

        <div className="border-t border-gray-900/20 w-full mt-3 pt-4 text-center text-sm text-gray-400">
          &copy; {new Date().getFullYear()}{" "}
          <span className="font-[poppins] text-gray-500">Hydra Tech</span>. All
          rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
