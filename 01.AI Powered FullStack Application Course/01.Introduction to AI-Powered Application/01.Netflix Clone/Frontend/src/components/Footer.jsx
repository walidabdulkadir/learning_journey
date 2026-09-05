import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";

function Footer() {
  return (
    <div className="bg-[#141414] px-4 sm:px-6 md:px-10 py-8 sm:py-10">
      <div className="flex ml-2 sm:ml-6 md:ml-10 mt-3 sm:mt-5 p-2 gap-4 sm:gap-5">
        <FaFacebookF size={22} className="sm:w-7 sm:h-7" />
        <FaInstagram size={22} className="sm:w-7 sm:h-7" />
        <FaTwitter size={22} className="sm:w-7 sm:h-7" />
        <FaYoutube size={22} className="sm:w-7 sm:h-7" />
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:gap-6 md:gap-10 p-4 sm:p-6 md:p-10 tracking-wider text-xs sm:text-sm text-neutral-400 mt-2">
        <div className="space-y-2">
          <h4>Audio description</h4>
          <h4>Investor Relation</h4>
          <h4>Legal Notice</h4>
        </div>
        <div className="space-y-2">
          <h4>Help Center</h4>
          <h4>Jops</h4>
          <h4>Cookie Preferences</h4>
        </div>
        <div className="space-y-2">
          <h4>Gift Cards</h4>
          <h4>Terms of Use</h4>
          <h4>Corporate information</h4>
        </div>
        <div className="space-y-2">
          <h4>Media Centre</h4>
          <h4>Privacy</h4>
          <h4>Contact Us</h4>
        </div>
      </div>

      <div className="ml-4 sm:ml-6 md:ml-10 mt-4 sm:mt-5 p-2 tracking-wider text-xs sm:text-sm text-neutral-500">
        1997-2026 Netflix,Inc.
      </div>
    </div>
  );
}

export default Footer;

