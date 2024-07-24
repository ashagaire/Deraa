import {Link, useLocation} from "react-router-dom"

const Header = () => {
  return (
    <header class="flex flex-col relative z-20 shadow-md ">
      <div class="max-w-[1400px] mx-auto w-full flex items-center justify-between p-4 py-6">
      
        
          <h1 class="font-semibold text-indigo-400">
          <Link to="/">Deera</Link>
          </h1>
        
        <nav class="hidden md:flex item-center gap-4 lg:gap-6">
        <Link to="/" className="duration-200 hover:text-indigo-400 cursor-pointer">Search</Link>
         
        <Link to="/Upload" className="duration-200 hover:text-indigo-400 cursor-pointer">Upload</Link>
          <a
            class="duration-200 hover:text-indigo-400 cursor-pointer"
            href="#faqs"
          >
            FAQs
          </a>
        </nav>
      </div>
    </header>
  );
};

export default Header;
