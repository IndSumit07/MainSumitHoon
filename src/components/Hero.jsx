import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Award,
  FileDown,
  Folder,
  Layers,
  Search,
  UserRound,
  X,
  ArrowDown,
  ArrowUp,
  CornerDownLeft,
  Briefcase,
  FileText,
} from "lucide-react";

const Hero = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [loopIndex, setLoopIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(150);

  const navigate = useNavigate();

  const roles = ["Developer", "UI/UX Master", "ML Learner", "Data Analyst"];

  // Typing effect
  useEffect(() => {
    const current = loopIndex % roles.length;
    const fullText = roles[current];

    const timer = setTimeout(() => {
      if (!isDeleting) {
        setDisplayText(fullText.substring(0, displayText.length + 1));
        setTypingSpeed(150);
        if (displayText === fullText) {
          setTimeout(() => setIsDeleting(true), 1000);
        }
      } else {
        setDisplayText(fullText.substring(0, displayText.length - 1));
        setTypingSpeed(80);
        if (displayText === "") {
          setIsDeleting(false);
          setLoopIndex(loopIndex + 1);
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, loopIndex]);

  const links = [
    {
      title: "Projects",
      desc: "View my projects",
      icon: <Folder />,
      route: "/projects",
    },
    {
      title: "Experience",
      desc: "View my experience",
      icon: <Briefcase />,
      route: "/experience",
    },
    {
      title: "Certificates",
      desc: "View my certifications",
      icon: <Award />,
      route: "/certificates",
    },
    {
      title: "Get In Touch",
      desc: "Contact me",
      icon: <UserRound />,
      route: "/contact",
    },
  ];
  const handleClick = (url) => {
    if (url && url !== "#") window.open(url, "_blank");
  };

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.ctrlKey && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
      }

      if (e.key === "Escape") setIsSearchOpen(false);

      if (isSearchOpen) {
        if (e.key === "ArrowDown") {
          e.preventDefault();
          setSelectedIndex((prev) => (prev + 1) % links.length);
        } else if (e.key === "ArrowUp") {
          e.preventDefault();
          setSelectedIndex((prev) => (prev - 1 + links.length) % links.length);
        } else if (e.key === "Enter") {
          navigate(links[selectedIndex].route);
          setIsSearchOpen(false);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isSearchOpen, selectedIndex]);

  return (
    <div className="w-full min-h-screen bg-black flex flex-col border border-white/20 font-space text-white relative overflow-hidden">
      {/* Floating Bar */}
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1, x: "-50%" }}
        transition={{ delay: 1, duration: 0.8, type: "spring" }}
        className="fixed z-40 bottom-4 sm:bottom-6 left-1/2 backdrop-blur-md bg-[#1b1b1b]/80 px-3 sm:px-4 py-3 rounded-full border border-white/20 flex justify-center items-center gap-3 sm:gap-4 shadow-2xl shadow-black/50"
      >
        {/* Social Icons */}
        {[
          {
            id: 1,
            svg: (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 118 93"
                fill="none"
              >
                <path d="M115.583 44.1071C113.961 39.026 111.485 34.7123 109.414 31.6512C108.309 30.0177 107.319 28.7425 106.628 27.9017C108.433 26.6265 110.018 25.1623 111.279 23.4582C112.926 21.2379 114.006 18.6056 114.294 15.584C114.344 15.0536 114.062 14.5515 113.58 14.3201C113.101 14.086 112.534 14.1791 112.15 14.5486H112.147L112.142 14.5543C112.867 12.6922 113.456 10.2603 113.456 7.28386C113.456 5.67009 113.284 3.89833 112.875 1.97704C112.759 1.441 112.317 1.04038 111.772 0.981131C111.228 0.919063 110.709 1.21248 110.481 1.71184C108.825 5.30332 106.583 8.40955 103.213 10.9938C101.1 12.6132 98.5308 14.0295 95.3607 15.1975C90.5154 12.5427 84.9424 11.4622 79.4371 11.4622C75.4688 11.4622 71.5288 12.0208 67.8878 12.98C64.5823 13.849 61.5307 15.0508 58.9191 16.4784C56.3074 15.0508 53.2558 13.849 49.9504 12.98C46.3093 12.0208 42.3693 11.4622 38.4011 11.4622C32.8901 11.4622 27.3143 12.5427 22.4662 15.2032C19.2905 14.0323 16.7155 12.6161 14.6002 10.9938C11.2271 8.40955 8.98774 5.30332 7.3322 1.71184C7.10375 1.21248 6.58481 0.919063 6.04048 0.981131C5.49334 1.04038 5.05336 1.441 4.93773 1.97704C4.52878 3.89833 4.35674 5.67009 4.35674 7.28386C4.35674 10.2603 4.94337 12.6922 5.67102 14.5543L5.66256 14.5486C5.42001 14.3145 5.10413 14.1932 4.78261 14.1932C4.59647 14.1932 4.40751 14.2327 4.22982 14.3201C3.75037 14.5515 3.46833 15.0536 3.5191 15.584C3.80677 18.6056 4.88696 21.2379 6.53404 23.4582C7.76653 25.1256 9.30926 26.5673 11.0663 27.8199C11.1058 27.8481 11.1509 27.8763 11.1932 27.9074C10.4938 28.7622 9.53771 30.0036 8.4829 31.5553C6.37046 34.6643 3.85472 39.0232 2.2302 44.1071C0.918742 48.2206 0.233398 52.6076 0.233398 56.9947C0.233398 63.0492 1.53922 69.1065 4.35674 74.3992C5.48488 76.5151 6.85838 78.5098 8.48572 80.321C8.76775 80.637 9.05825 80.9473 9.35721 81.2492C9.48412 81.3818 9.61386 81.5088 9.74641 81.6386C9.91845 81.8078 10.0933 81.9743 10.271 82.1379C11.6163 83.3934 13.1083 84.5332 14.7441 85.5376C15.6268 86.0821 16.5519 86.5871 17.5165 87.0469C18.2723 87.4081 19.0225 87.7269 19.7614 88.0118C23.521 89.4563 27.0718 89.967 30.3631 89.9641C34.0831 89.9613 37.4788 89.3293 40.5587 88.7199C43.6385 88.1077 46.4109 87.5294 48.8505 87.535C49.6825 87.535 50.4778 87.5999 51.2393 87.7438C52.3843 87.961 53.4561 88.3532 54.5222 89.0049C55.5403 89.6312 56.5528 90.503 57.5738 91.7246C57.8558 92.1788 58.3522 92.4638 58.8937 92.4638H58.9191C59.4634 92.4638 59.9598 92.176 60.239 91.719C61.6181 90.0742 62.9747 89.0641 64.3595 88.4378C65.0787 88.1106 65.8092 87.8877 66.5735 87.7438C67.335 87.5999 68.1275 87.535 68.9595 87.535C71.3991 87.5294 74.1715 88.1077 77.2541 88.7199C80.3339 89.3293 83.7268 89.9613 87.4497 89.9641C90.8284 89.967 94.478 89.4281 98.3503 87.8933C98.9905 87.6394 99.6392 87.3573 100.293 87.0469C102.067 86.2034 103.698 85.2131 105.187 84.0987C106.098 83.4244 106.955 82.6993 107.762 81.932C107.863 81.836 107.965 81.7373 108.066 81.6386C108.269 81.4382 108.47 81.2379 108.667 81.032C108.96 80.7245 109.251 80.4113 109.524 80.0925C112.071 77.2007 113.975 73.8631 115.289 70.2999C116.843 66.0792 117.579 61.537 117.579 56.9947C117.579 52.4525 116.894 48.2206 115.583 44.1071ZM38.4011 14.5656C42.076 14.5656 45.7678 15.0875 49.1607 15.979C52.5536 16.8734 55.6503 18.1373 58.135 19.5959C58.6173 19.878 59.2209 19.878 59.7031 19.5959C62.1879 18.1373 65.2846 16.8734 68.6775 15.979C72.0703 15.0875 75.7622 14.5656 79.4371 14.5656C83.4166 14.5627 87.3707 15.1806 90.9412 16.5574C90.3151 16.7182 89.6777 16.8705 89.015 17.0173C85.7716 17.7226 82.2095 18.5182 78.6812 19.6664C76.0329 20.5297 73.3987 21.5877 70.9281 22.9673C69.0723 23.9999 67.3096 25.2159 65.7076 26.6604C63.3047 28.8243 61.2684 31.513 59.847 34.8449C59.4888 35.6856 59.1701 36.5659 58.8937 37.4856C58.4142 35.8888 57.8079 34.4161 57.0915 33.059C55.6362 30.3055 53.7268 28.0456 51.5495 26.1864C48.2751 23.399 44.4028 21.5115 40.4487 20.115C36.4945 18.7185 32.4473 17.81 28.7978 17.0173C28.1407 16.8734 27.5061 16.721 26.8885 16.563C30.459 15.1806 34.4159 14.5627 38.4011 14.5656ZM61.2318 59.3138C62.4276 60.7047 63.7701 62.3269 65.0251 63.746C65.6541 64.457 66.2604 65.1143 66.8245 65.6758C67.1714 66.0172 67.4986 66.3162 67.8144 66.5786C67.5324 67.5519 66.8837 69.5917 65.7584 72.0321C64.4131 74.955 62.3853 78.4421 59.5367 81.3451C59.3308 81.5567 59.1193 81.7627 58.905 81.9658C58.6906 81.7627 58.4791 81.5539 58.2732 81.3451C55.3739 78.3885 53.3235 74.828 51.981 71.8713C51.2111 70.1842 50.6696 68.6945 50.3227 67.6337C50.1845 67.2077 50.0773 66.8551 49.9983 66.5814C50.1901 66.4234 50.3875 66.2485 50.5906 66.0567C51.3154 65.3767 52.1221 64.5021 52.9653 63.5429C54.2289 62.1069 55.5685 60.4818 56.7502 59.1191C57.3397 58.4364 57.8897 57.8185 58.3607 57.3305C58.5609 57.1217 58.7414 56.9439 58.9078 56.7859C58.9783 56.8537 59.0545 56.927 59.1306 57.0032C59.7031 57.5703 60.4364 58.3913 61.2318 59.3138ZM110.717 72.9377C109.753 74.749 108.597 76.4446 107.246 77.9935C106.969 78.3094 106.684 78.617 106.391 78.9188C106.23 79.0881 106.064 79.2574 105.895 79.421C105.754 79.5593 105.61 79.6975 105.463 79.8329C104.899 80.3605 104.307 80.8655 103.684 81.3451C102.265 82.4454 100.694 83.4188 98.9623 84.2426C97.1488 85.1059 95.4058 85.7125 93.7249 86.1244C93.677 86.1357 93.6262 86.1469 93.5783 86.1582C93.5303 86.1695 93.4796 86.1808 93.4316 86.1921C91.3558 86.6745 89.3731 86.8579 87.4497 86.8607C84.085 86.8607 80.9093 86.2796 77.8549 85.6758C74.8004 85.0749 71.8701 84.4373 68.9595 84.4316C66.9796 84.4316 64.9941 84.742 63.0819 85.6081C61.6238 86.2683 60.2277 87.2444 58.905 88.5761C57.5851 87.2444 56.189 86.2683 54.7309 85.6081C53.7748 85.1764 52.7989 84.8802 51.8146 84.694C50.8332 84.5078 49.8432 84.4316 48.8505 84.4316C45.9399 84.4373 43.0124 85.0749 39.9579 85.6758C36.9035 86.2796 33.7278 86.8607 30.3631 86.8607C28.544 86.8579 26.6685 86.6943 24.7168 86.2683C24.6717 86.2598 24.6237 86.2485 24.5786 86.2372C24.5335 86.2288 24.4883 86.2175 24.4432 86.2062C22.6495 85.7971 20.7937 85.1651 18.8505 84.2426C17.367 83.5344 15.9991 82.7191 14.7441 81.805C13.9628 81.2408 13.2239 80.637 12.5273 79.9994C12.3186 79.8104 12.1155 79.6157 11.9153 79.421C11.8053 79.3138 11.6981 79.2066 11.5937 79.0966C11.2948 78.7975 11.0099 78.49 10.7307 78.1768C8.40675 75.5672 6.6525 72.5258 5.43411 69.225C4.0183 65.388 3.33577 61.2012 3.33577 56.9947C3.33577 52.7882 3.97317 48.8525 5.18592 45.0494C6.67788 40.3633 9.04979 36.2358 11.0466 33.3017C12.045 31.8346 12.9503 30.6638 13.599 29.8653C13.6893 29.7553 13.771 29.6537 13.85 29.5578C15.8045 30.6384 17.931 31.5581 20.1676 32.3481C23.5153 33.5302 27.1 34.4302 30.6762 35.1524C31.3615 35.2907 32.0328 34.8449 32.1710 34.1565C32.3092 33.4709 31.8635 32.8023 31.1782 32.6612C28.0702 32.0349 24.9791 31.2732 22.0854 30.3196C19.1946 29.366 16.504 28.2205 14.1969 26.8353C11.8871 25.45 9.9664 23.8335 8.57315 21.9488C7.75525 20.8373 7.11785 19.6354 6.67788 18.315C7.27861 18.6536 7.98088 19.0119 8.78468 19.3646C9.3431 19.61 10.0002 19.421 10.3443 18.9188C10.6856 18.4166 10.6235 17.7423 10.1977 17.3107H10.1948C10.161 17.274 9.33182 16.405 8.51674 14.732C7.70166 13.059 6.89505 10.5847 6.89505 7.28386C6.89505 6.95659 6.90351 6.62368 6.92043 6.28231C8.49418 8.77349 10.4853 11.0446 13.0575 13.011C16.7888 15.869 21.7047 18.0724 28.2563 19.4972C31.4884 20.1997 34.9631 20.9811 38.3419 22.0814C40.8774 22.9053 43.3564 23.9096 45.6381 25.1848C47.35 26.1413 48.9492 27.2472 50.3875 28.545C52.5423 30.4917 54.336 32.8615 55.6052 35.8408C56.8743 38.8201 57.6217 42.4172 57.6245 46.8268V55.2822C57.5174 55.3838 57.4074 55.4853 57.2946 55.5982C56.6459 56.2386 55.8929 57.085 55.0834 58.0273C53.8707 59.4351 52.531 61.0545 51.307 62.437C50.695 63.1282 50.114 63.7601 49.5978 64.2708C49.0845 64.7814 48.6277 65.1736 48.3343 65.3626C47.979 65.5911 47.8098 66.0143 47.9113 66.4234C47.9197 66.4657 48.5741 69.1544 50.1845 72.6923C51.3972 75.3499 53.1515 78.4928 55.6024 81.3451C56.3667 82.2367 57.2015 83.0972 58.1068 83.9097C58.2901 84.1523 58.5778 84.3047 58.8937 84.3047H58.9191C59.235 84.3047 59.5226 84.1523 59.706 83.9097C60.6113 83.0972 61.4433 82.2367 62.2076 81.3451C64.6613 78.4928 66.4156 75.3499 67.6283 72.6923C69.2387 69.1544 69.8902 66.4657 69.9015 66.4234C70.0002 66.0143 69.831 65.5911 69.4784 65.3626C69.2556 65.2187 68.9341 64.9564 68.5703 64.615C67.9301 64.0169 67.1517 63.1733 66.3281 62.2395C65.0928 60.8345 63.756 59.2151 62.5545 57.827C61.9538 57.1301 61.3869 56.4925 60.8764 55.9593C60.6254 55.6998 60.3885 55.4656 60.1628 55.2596V46.8268C60.1628 41.6018 61.212 37.5166 62.9409 34.2468C64.2411 31.7979 65.9276 29.7948 67.8934 28.119C70.8407 25.608 74.4281 23.8391 78.2018 22.5103C81.9726 21.1786 85.9182 20.2871 89.5536 19.4972C96.1081 18.0724 101.024 15.869 104.755 13.011C107.325 11.0446 109.319 8.77349 110.892 6.28231C110.906 6.62368 110.918 6.95659 110.918 7.28386C110.915 10.692 110.058 13.217 109.217 14.89C108.797 15.7279 108.379 16.3486 108.075 16.7521C107.925 16.9552 107.801 17.1019 107.719 17.195C107.68 17.2401 107.649 17.274 107.632 17.2909L107.615 17.3078C107.373 17.5561 107.248 17.8777 107.248 18.205C107.248 18.4533 107.322 18.7016 107.468 18.9188C107.813 19.421 108.47 19.61 109.025 19.3646C109.832 19.0119 110.534 18.6536 111.135 18.315C110.692 19.6354 110.058 20.8373 109.24 21.9488C108.193 23.3623 106.854 24.6262 105.271 25.7519C102.902 27.4447 99.9945 28.8271 96.7991 29.9528C93.6065 31.0813 90.1318 31.9559 86.6346 32.6612C85.9464 32.8023 85.5036 33.4709 85.6418 34.1565C85.78 34.8449 86.4513 35.2907 87.1366 35.1524C90.1177 34.5487 93.1073 33.8236 95.9586 32.9151C98.81 32.0039 101.529 30.9064 103.971 29.5578C104.611 30.3196 105.68 31.6625 106.89 33.4568C108.836 36.343 111.143 40.3972 112.627 45.0494C113.84 48.8525 114.477 52.9321 114.477 56.9947C114.477 62.6062 113.259 68.1726 110.717 72.9377Z" fill="#4C281A" />
                <path d="M90.9415 16.5575C90.3153 16.7183 89.6779 16.8707 89.0152 17.0174C85.7718 17.7227 82.2097 18.5183 78.6814 19.6665C76.0331 20.5299 73.3989 21.5878 70.9283 22.9674C69.0725 24 67.3098 25.216 65.7079 26.6605C63.3049 28.8244 61.2686 31.5131 59.8472 34.845C59.489 35.6857 59.1703 36.566 58.8939 37.4857C58.4145 35.8889 57.8081 34.4162 57.0917 33.0591C55.6364 30.3056 53.727 28.0457 51.5497 26.1865C48.2753 23.3991 44.403 21.5117 40.4489 20.1151C36.4948 18.7186 32.4476 17.8102 28.7980 17.0174C28.1409 16.8735 27.5063 16.7211 26.8887 16.5631C30.4592 15.1807 34.4162 14.5629 38.4013 14.5657C42.0762 14.5657 45.7680 15.0876 49.1609 15.9791C52.5538 16.8735 55.6505 18.1374 58.1352 19.596C58.6175 19.8781 59.2211 19.8781 59.7034 19.596C62.1881 18.1374 65.2848 16.8735 68.6777 15.9791C72.0705 15.0876 75.7624 14.5657 79.4373 14.5657C83.4168 14.5629 87.3709 15.1807 90.9415 16.5575Z" fill="#70242E" />
                <path d="M57.6244 46.8268V55.2821C57.5172 55.3837 57.4072 55.4853 57.2944 55.5981C56.6457 56.2385 55.8927 57.0849 55.0833 58.0272C54.1215 59.1416 53.0836 60.3914 52.0824 61.5482C53.5546 58.6959 54.5925 55.2567 54.4346 51.843C54.1272 45.2497 49.6795 38.6705 41.6246 35.4852C39.2978 34.5655 36.8103 34.131 34.3086 34.0746C33.7079 34.0605 32.9972 34.0238 32.1934 33.9392C32.2131 33.3354 31.7901 32.7881 31.1780 32.6611C28.0700 32.0348 24.9789 31.2731 22.0853 30.3195C19.1944 29.3659 16.5038 28.2205 14.1968 26.8352C11.8869 25.45 9.96625 23.8334 8.57300 21.9488C7.75511 20.8372 7.11771 19.6353 6.67773 18.315C7.27847 18.6535 7.98073 19.0118 8.78453 19.3645C9.34296 19.6099 10.0001 19.4209 10.3442 18.9187C10.6854 18.4165 10.6234 17.7422 10.1975 17.3106H10.1947C10.1609 17.2739 9.33168 16.405 8.51660 14.7319C7.70152 13.0589 6.89490 10.5847 6.89490 7.28378C6.89490 6.95651 6.90336 6.62360 6.92028 6.28223C8.49403 8.77341 10.4852 11.0445 13.0573 13.011C16.7887 15.8689 21.7045 18.0723 28.2562 19.4971C31.4883 20.1996 34.9629 20.9811 38.3417 22.0814C40.8772 22.9052 43.3563 23.9096 45.6379 25.1848C47.3499 26.1412 48.9490 27.2471 50.3874 28.5449C52.5421 30.4916 54.3359 32.8615 55.6050 35.8407C56.8742 38.8200 57.6216 42.4171 57.6244 46.8268Z" fill="#D78137" />
                <path d="M111.134 18.315C110.691 19.6353 110.057 20.8372 109.239 21.9488C108.193 23.3622 106.853 24.6262 105.271 25.7518C102.902 27.4446 99.9938 28.827 96.7984 29.9527C93.6057 31.0812 90.1311 31.9558 86.6338 32.6611C85.9823 32.7937 85.5508 33.4003 85.6242 34.0464C85.0347 34.1282 84.4199 34.1564 83.8445 34.1564C80.6096 34.1621 77.4000 34.8166 74.4923 36.2301C67.5091 39.6241 63.6622 45.7293 63.3773 51.843C63.2165 55.2567 64.2572 58.6959 65.7266 61.5482C64.6662 60.3209 63.5634 58.9921 62.5538 57.8269C61.9530 57.1301 61.3861 56.4924 60.8757 55.9592C60.6246 55.6997 60.3877 55.4655 60.1621 55.2596V46.8268C60.1621 41.6018 61.2113 37.5166 62.9401 34.2467C64.2403 31.7978 65.9269 29.7947 67.8927 28.1189C70.8399 25.6080 74.4274 23.8390 78.2010 22.5102C81.9718 21.1786 85.9175 20.2870 89.5529 19.4971C96.1074 18.0723 101.023 15.8689 104.755 13.011C107.324 11.0445 109.318 8.77341 110.892 6.28223C110.906 6.62360 110.917 6.95651 110.917 7.28378C110.914 10.6919 110.057 13.2169 109.216 14.8899C108.796 15.7279 108.379 16.3485 108.074 16.7520C107.925 16.9551 107.801 17.1018 107.719 17.1949C107.679 17.2401 107.648 17.2739 107.631 17.2908L107.614 17.3078C107.372 17.5560 107.248 17.8777 107.248 18.2049C107.248 18.4532 107.321 18.7015 107.468 18.9187C107.812 19.4209 108.469 19.6099 109.025 19.3645C109.831 19.0118 110.533 18.6535 111.134 18.315Z" fill="#D78137" />
                <path d="M114.477 56.9948C114.477 62.6063 113.259 68.1726 110.718 72.9378C109.446 75.3218 107.847 77.5111 105.895 79.4211C103.946 81.3311 101.647 82.9646 98.9625 84.2426C94.7940 86.2232 91.0147 86.8579 87.4498 86.8608C84.0852 86.8608 80.9094 86.2796 77.8550 85.6758C74.8006 85.0749 71.8702 84.4373 68.9597 84.4317C66.9798 84.4317 64.9943 84.7420 63.0821 85.6081C61.6239 86.2683 60.2279 87.2445 58.9051 88.5761C57.5852 87.2445 56.1892 86.2683 54.7310 85.6081C53.7749 85.1765 52.7991 84.8802 51.8148 84.6940C50.8333 84.5078 49.8434 84.4317 48.8506 84.4317C45.9400 84.4373 43.0125 85.0749 39.9581 85.6758C36.9037 86.2796 33.7279 86.8608 30.3633 86.8608C26.7955 86.8579 23.0163 86.2232 18.8506 84.2426C16.1657 82.9646 13.8671 81.3311 11.9154 79.4211C8.99354 76.5547 6.85008 73.0647 5.43427 69.2250C4.01846 65.3881 3.33594 61.2013 3.33594 56.9948C3.33594 52.7882 3.97334 48.8526 5.18608 45.0495C6.67804 40.3633 9.04995 36.2358 11.0468 33.3017C12.0452 31.8346 12.9505 30.6638 13.5992 29.8654C13.6894 29.7553 13.7712 29.6538 13.8502 29.5579C14.6935 30.0234 15.5706 30.4607 16.4759 30.8669C16.7354 30.9882 17.0005 31.1039 17.2656 31.2168C17.4941 31.3183 17.7253 31.4143 17.9566 31.5074C18.3035 31.6484 18.6532 31.7867 19.0086 31.9221C19.2398 32.0124 19.4739 32.0970 19.7080 32.1816C19.8603 32.2381 20.0126 32.2945 20.1677 32.3481C23.5155 33.5302 27.1001 34.4302 30.6763 35.1524C31.3617 35.2907 32.0329 34.8449 32.1711 34.1565C32.1768 34.1199 32.1824 34.0832 32.1880 34.0465C32.1909 34.0098 32.1937 33.9760 32.1937 33.9393C32.9975 34.0239 33.7082 34.0606 34.3089 34.0747C36.8106 34.1311 39.2981 34.5656 41.6249 35.4854C49.6798 38.6706 54.1275 45.2498 54.4349 51.8431C54.5928 55.2568 53.5550 58.6960 52.0827 61.5483C51.9530 61.7006 51.8204 61.8502 51.6907 61.9997C51.5638 62.1464 51.4341 62.2931 51.3071 62.4370C50.6951 63.1282 50.1141 63.7602 49.5980 64.2708C49.0847 64.7815 48.6278 65.1736 48.3345 65.3627C47.9791 65.5912 47.8099 66.0144 47.9114 66.4235C47.9143 66.4376 47.9820 66.7169 48.1230 67.2050C48.1484 67.2952 48.1794 67.3912 48.2104 67.4927C48.3486 67.9526 48.5376 68.5422 48.7829 69.2334C48.8055 69.2927 48.8252 69.3548 48.8506 69.4168C48.8788 69.5015 48.9127 69.5889 48.9465 69.6792C49.1270 70.1758 49.3385 70.7146 49.5754 71.2873C49.6347 71.4369 49.6995 71.5892 49.7672 71.7444C49.8321 71.8967 49.8998 72.0547 49.9703 72.2127C50.0380 72.3707 50.1113 72.5315 50.1846 72.6923C50.2269 72.7882 50.2721 72.8814 50.3172 72.9801C51.9135 76.4108 54.4011 80.5919 58.1070 83.9097C58.2903 84.1523 58.5780 84.3047 58.8939 84.3047H58.9192C59.2351 84.3047 59.5228 84.1523 59.7061 83.9097C63.4120 80.5919 65.8996 76.4108 67.4959 72.9801C67.5410 72.8814 67.5862 72.7882 67.6285 72.6923C67.6792 72.5823 67.7300 72.4723 67.7779 72.3622C67.8259 72.2550 67.8738 72.1450 67.9190 72.0406C67.9979 71.8629 68.0713 71.6908 68.1418 71.5187C68.2010 71.3776 68.2602 71.2394 68.3138 71.1039C68.3984 70.9008 68.4774 70.7033 68.5507 70.5115C68.6184 70.3366 68.6833 70.1673 68.7481 70.0037C68.8497 69.7356 68.9427 69.4789 69.0302 69.2334C69.0668 69.1262 69.1035 69.0219 69.1402 68.9203C69.2220 68.6805 69.2981 68.4548 69.3658 68.2460C69.4560 67.9667 69.5350 67.7128 69.6027 67.4927C69.6337 67.3912 69.6619 67.2924 69.6873 67.2050C69.7042 67.1485 69.7212 67.0949 69.7353 67.0441C69.7381 67.0300 69.7437 67.0159 69.7465 67.0018C69.7578 66.9595 69.7691 66.9172 69.7804 66.8777C69.8086 66.7818 69.8311 66.6971 69.8481 66.6294C69.8594 66.5843 69.8706 66.5448 69.8791 66.5137C69.8791 66.5081 69.8791 66.5053 69.8819 66.5024C69.8847 66.4940 69.8847 66.4883 69.8876 66.4799C69.8960 66.4460 69.9016 66.4263 69.9016 66.4235C70.0004 66.0144 69.8311 65.5912 69.4786 65.3627C69.2558 65.2188 68.9343 64.9564 68.5705 64.6150C67.9302 64.0169 67.1518 63.1733 66.3283 62.2395C66.1309 62.0166 65.9363 61.7909 65.7332 61.5568C65.7332 61.5568 65.7304 61.5511 65.7304 61.5483C64.2610 58.6960 63.2203 55.2568 63.3810 51.8431C63.6659 45.7294 67.5128 39.6242 74.4960 36.2302C77.4038 34.8167 80.6133 34.1622 83.8482 34.1565C84.4236 34.1565 85.0384 34.1283 85.6279 34.0465C85.6307 34.0832 85.6363 34.1199 85.6448 34.1565C85.7830 34.8449 86.4542 35.2907 87.1396 35.1524C90.1207 34.5487 93.1103 33.8236 95.9616 32.9152C96.6864 32.6838 97.4028 32.4384 98.1079 32.1816C98.4548 32.0547 98.7961 31.9277 99.1373 31.7951C99.3094 31.7274 99.4814 31.6597 99.6506 31.5920C99.7493 31.5525 99.8452 31.5130 99.9411 31.4707C99.9834 31.4566 100.023 31.4396 100.065 31.4199C100.229 31.3550 100.392 31.2873 100.553 31.2168C100.818 31.1067 101.081 30.9911 101.343 30.8698C102.248 30.4635 103.128 30.0262 103.974 29.5579C104.614 30.3196 105.683 31.6625 106.893 33.4569C108.839 36.3430 111.146 40.3972 112.630 45.0495C113.843 48.8526 114.480 52.9321 114.480 56.9948H114.477Z" fill="#DB7F37" />
              </svg>
            ),
            link: "https://codolio.com/profile/IndSumit07",
            label: "Codolio",
          },
          {
            id: 2,
            svg: (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                <rect width="4" height="12" x="2" y="9" />
                <circle cx="4" cy="4" r="2" />
              </svg>
            ),
            link: "https://www.linkedin.com/in/sumit-kumar-545737378/",
            label: "LinkedIn",
          },
          {
            id: 3,
            svg: (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                <path d="M9 18c-4.51 2-5-2-7-2" />
              </svg>
            ),
            link: "https://github.com/IndSumit07",
            label: "GitHub",
          },
        ].map((icon) => (
          <a
            href={icon.link || "#"}
            key={icon.id}
            className="bg-[#2e2e2f] p-2.5 rounded-full transition-all duration-300 hover:-translate-y-1 hover:bg-[#3e3e3f] cursor-pointer"
            target={icon.link && icon.link !== "#" ? "_blank" : undefined}
            rel={
              icon.link && icon.link !== "#" ? "noopener noreferrer" : undefined
            }
            aria-label={icon.label}
          >
            {icon.svg}
          </a>
        ))}

        {/* Expand on hover green dot */}
        <div className="group relative flex items-center bg-[#2e2e2f] rounded-full px-3 py-1.5 cursor-pointer transition-all duration-300 hover:px-5 hover:bg-[#3e3e3f]">
          <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse shadow-[0_0_10px_#22c55e]" />
          <span className="ml-0 max-w-0 overflow-hidden text-gray-300 text-sm opacity-0 transition-all duration-300 group-hover:ml-3 group-hover:max-w-[200px] group-hover:opacity-100 whitespace-nowrap">
            Studying at GLA University
          </span>
        </div>
      </motion.div>

      {/* Header */}
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-full h-[80px] md:h-[100px] flex justify-between items-center px-5 md:px-10 border-white/20 border-b relative z-10 bg-black/50 backdrop-blur-sm"
      >
        <h1 className="font-space text-xl md:text-2xl font-bold tracking-wider bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
          @Sumit
        </h1>
        <div className="flex justify-center items-center gap-8">
          <Link
            to="/projects"
            className="font-semibold cursor-pointer hover:text-[#b2b2d8] transition-colors duration-300 md:flex hidden"
          >
            Projects
          </Link>
          <Link
            to="/experience"
            className="font-semibold cursor-pointer hover:text-[#b2b2d8] transition-colors duration-300 md:flex hidden"
          >
            Experience
          </Link>
          <Link
            to="/certificates"
            className="font-semibold cursor-pointer hover:text-[#b2b2d8] transition-colors duration-300 md:flex hidden"
          >
            Certificates
          </Link>
          <div className="flex justify-center items-center gap-5">
            <div
              onClick={() => setIsSearchOpen(true)}
              className="md:h-[54px] h-[40px] flex justify-center items-center px-4 border-white/15 rounded-lg border-2 gap-3 hover:border-[#b2b2d8] hover:bg-white/5 transition-all duration-300 cursor-pointer group"
            >
              <span className="text-[#b2b2d8] md:text-base text-sm group-hover:text-white transition-colors">
                Search
              </span>
              <div className="md:flex hidden justify-center items-center gap-1 ">
                <span className="bg-[#252528] px-2 py-1 rounded text-xs text-gray-400 group-hover:text-white transition-colors">
                  Ctrl
                </span>
                <span className="bg-[#252528] px-2 py-1 rounded text-xs text-gray-400 group-hover:text-white transition-colors">
                  K
                </span>
              </div>
            </div>
            <div
              onClick={() => handleClick("https://github.com/IndSumit07")}
              className="h-[54px] w-[54px] md:flex hidden justify-center items-center border-white/15 rounded-lg border-2 cursor-pointer hover:border-[#b2b2d8] hover:bg-white/5 transition-all duration-300"
            >
              <img
                className="w-6 opacity-80 hover:opacity-100 transition-opacity"
                src="/github.png"
                alt="github"
              />
            </div>
          </div>
        </div>
      </motion.header>

      {/* Main Section */}
      <main className="flex-1 flex flex-col justify-center px-5 md:px-10 pb-20">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          <h3 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold leading-tight">
            Hi I'm Sumit <br /> I am a <br className="md:hidden flex" />{" "}
            <span className="inline-block border-r-4 border-[#b2b2d8] pr-2 animate-pulse text-[#b2b2d8]">
              {displayText}
            </span>
          </h3>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="w-full md:w-3/4 lg:w-1/2 pt-6 md:pt-10 text-base sm:text-lg md:text-xl text-gray-400 leading-relaxed"
        >
          I build Websites that look and feel good to use.{" "}
          <br className="hidden md:block" /> Specialized in Full Stack
          Development and UI & UX Design.
          <br />I am also a Data Analyst and ML Learner.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="flex flex-col sm:flex-row justify-start items-center mt-8 md:mt-12 gap-4"
        >
          <button
            onClick={() => navigate('/resume')}
            className="group flex justify-center items-center bg-[#171717] px-6 py-3.5 rounded-lg gap-3 border border-white/10 hover:bg-[#222226] hover:border-white/30 transition-all duration-300 text-gray-300 hover:text-white w-full sm:w-auto cursor-pointer"
          >
            <span className="font-medium">View Resume</span>
            <FileText size={20} className="group-hover:translate-y-1 transition-transform duration-300" />
          </button>
          <button
            onClick={() => navigate("/contact")}
            className="group flex justify-center items-center bg-[#171717] px-6 py-3.5 rounded-lg gap-3 border border-white/10 hover:bg-[#222226] hover:border-white/30 transition-all duration-300 text-gray-300 hover:text-white w-full sm:w-auto"
          >
            <span className="font-medium">Get in Touch</span>
            <UserRound
              size={20}
              className="group-hover:scale-110 transition-transform duration-300"
            />
          </button>
        </motion.div>
      </main>

      {/* Search Modal */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-start justify-center pt-6 sm:pt-16 px-4 sm:px-6 bg-black/60 backdrop-blur-md"
            role="dialog"
            aria-modal="true"
            aria-label="Search"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: "spring", duration: 0.3 }}
              className="w-full max-w-3xl mx-auto rounded-xl overflow-hidden border border-white/10 bg-[#0a0a0a] shadow-2xl"
            >
              {/* Search Bar */}
              <div className="flex items-center gap-3 px-3 sm:px-5 py-3 sm:py-4 border-b border-white/10">
                <div className="flex-shrink-0">
                  <Search color="#fff" />
                </div>

                <input
                  autoFocus
                  type="text"
                  placeholder="Search for pages and sections..."
                  className="flex-1 bg-transparent outline-none text-white text-base sm:text-lg placeholder-white/40 py-2"
                  aria-label="Search input"
                />

                <div
                  className="flex items-center gap-3 ml-2 cursor-pointer hover:opacity-80 transition-opacity"
                  role="button"
                  tabIndex={0}
                  onClick={() => setIsSearchOpen(false)}
                  onKeyDown={(e) => e.key === "Enter" && setIsSearchOpen(false)}
                >
                  <span className="hidden sm:inline-block bg-[#1C1C1F] rounded px-2 py-1 text-sm text-gray-400">
                    esc
                  </span>
                  <X size={20} className="text-white" />
                </div>
              </div>

              {/* Links List (scrollable on small screens) */}
              <div className="max-h-[60vh] sm:max-h-[50vh] overflow-y-auto p-2 border-b border-white/10">
                {links.map((link, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      navigate(link.route);
                      setIsSearchOpen(false);
                    }}
                    className={`w-full text-left px-3 sm:px-5 py-3 sm:py-4 rounded-lg mb-2 flex items-center justify-between gap-4 transition-all duration-150 focus:outline-none
                ${selectedIndex === index
                        ? "bg-[#1C1C1F] border border-white/10"
                        : "hover:bg-[#0F0F10] border border-transparent"
                      }`}
                    aria-current={selectedIndex === index ? "true" : "false"}
                    tabIndex={0}
                  >
                    <div className="flex items-center gap-4">
                      <div className="flex-shrink-0 bg-[#252528] w-10 h-10 sm:w-12 sm:h-12 rounded-lg flex items-center justify-center text-white">
                        {link.icon}
                      </div>
                      <div className="flex flex-col">
                        <h3 className="font-semibold text-sm sm:text-base text-white">
                          {link.title}
                        </h3>
                        <p className="text-xs sm:text-sm text-white/60">
                          {link.desc}
                        </p>
                      </div>
                    </div>

                    <div className="hidden sm:inline-block text-sm bg-[#252528] px-3 py-1 rounded-md text-gray-400">
                      Pages
                    </div>
                  </button>
                ))}
              </div>

              {/* Footer */}
              <div className="px-3 sm:px-5 py-3 sm:py-4 flex flex-col sm:flex-row items-center justify-between gap-3 bg-[#080808]">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <div className="bg-[#1C1C1F] p-1 rounded">
                      <ArrowUp size={14} color="#fff" />
                    </div>
                    <div className="bg-[#1C1C1F] p-1 rounded">
                      <ArrowDown size={14} color="#fff" />
                    </div>
                    <span className="text-sm text-white/60 ml-1 hidden sm:inline">
                      navigate
                    </span>
                  </div>

                  <div className="flex items-center gap-2 ml-2">
                    <div className="bg-[#1C1C1F] p-1 rounded">
                      <CornerDownLeft color="#fff" size={14} />
                    </div>
                    <span className="text-sm text-white/60">enter</span>
                  </div>
                </div>

                <div className="text-sm text-white/60">@code by Sumit</div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Hero;
