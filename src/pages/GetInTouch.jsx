import {
  ArrowLeft,
  Mail,
  MapPin,
  Phone,
  Send,
  Github,
  Linkedin,
  Twitter,
} from "lucide-react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const GetInTouchPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const GOOGLE_SCRIPT_URL =
        "https://script.google.com/macros/s/AKfycbzBT8RiX8uDPPnrmJYJl3J1dI5-K4hlLSvGXwz1mSG2YMoUOt1YJSxpWklbn3vtjWye/exec";

      const formDataToSend = new FormData();
      formDataToSend.append("name", formData.name);
      formDataToSend.append("email", formData.email);
      formDataToSend.append("subject", formData.subject);
      formDataToSend.append("message", formData.message);
      formDataToSend.append("timestamp", new Date().toLocaleString());

      const response = await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        body: formDataToSend,
      });

      if (response.ok) {
        setSubmitStatus("success");
        setFormData({ name: "", email: "", subject: "", message: "" });

        setTimeout(() => {
          setSubmitStatus(null);
        }, 5000);
      } else {
        setSubmitStatus("error");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: <Mail size={24} />,
      title: "Email",
      value: "developer.sumit.personal@gmail.com",
      link: "mailto:developer.sumit.personal@gmail.com",
    },
    {
      icon: <Phone size={24} />,
      title: "Phone",
      value: "+91 6307980930",
      link: "tel:+916307980930",
    },
    {
      icon: <MapPin size={24} />,
      title: "Location",
      value: "India",
      link: null,
    },
  ];

  const socialLinks = [
    {
      icon: <Github size={20} />,
      name: "GitHub",
      url: "https://github.com/IndSumit07",
    },
    {
      icon: <Linkedin size={20} />,
      name: "LinkedIn",
      url: "https://www.linkedin.com/in/sumit-kumar-545737378/",
    },
    {
      icon: <Twitter size={20} />,
      name: "Twitter",
      url: "#",
    },
  ];

  return (
    <div className="w-full min-h-screen bg-black text-white font-space flex justify-center bg-[repeating-linear-gradient(45deg,_#1b1a1a_0px,_#141414_2px,_#000_2px,_#000_8px)] bg-repeat bg-fixed">
      <div className="w-full max-w-7xl border-l border-r border-white/20 min-h-screen flex flex-col bg-black">
        {/* Header */}
        <header className="px-6 md:px-20 py-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border-b border-white/20 bg-black/50 backdrop-blur-sm top-0 z-30">
          <div className="flex flex-col gap-2 md:gap-5">
            <motion.h3
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-4xl md:text-6xl lg:text-8xl font-bold"
            >
              Get In Touch
            </motion.h3>
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="text-base md:text-xl text-white/50 font-light"
            >
              Let's create something amazing together.
            </motion.p>
          </div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={() => navigate(-1)}
            className="flex justify-center items-center gap-3 border-2 border-white/50 px-4 py-2 rounded-xl hover:bg-white hover:text-black transition-all duration-300 cursor-pointer group"
          >
            <ArrowLeft
              size={20}
              className="group-hover:-translate-x-1 transition-transform"
            />
            <span>Back</span>
          </motion.div>
        </header>

        <main className="flex-1 px-3 md:px-20 py-10 md:py-16">
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
            {/* Left Side - Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="space-y-8"
            >
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
                  Let's Talk
                </h2>
                <p className="text-white/70 text-base md:text-lg leading-relaxed">
                  Have a project in mind or just want to chat? Feel free to
                  reach out. I'm always open to discussing new projects,
                  creative ideas, or opportunities to be part of your vision.
                </p>
              </div>

              {/* Contact Cards */}
              <div className="space-y-4">
                {contactInfo.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    className="group"
                  >
                    {item.link ? (
                      <a
                        href={item.link}
                        className="flex items-center gap-4 p-4 rounded-lg border border-white/10 bg-[#0a0a0a] hover:bg-[#1a1a1a] hover:border-white/30 transition-all duration-300"
                      >
                        <div className="text-[#b2b2d8] group-hover:scale-110 transition-transform">
                          {item.icon}
                        </div>
                        <div>
                          <p className="text-sm text-white/50">{item.title}</p>
                          <p className="text-base md:text-lg font-medium">
                            {item.value}
                          </p>
                        </div>
                      </a>
                    ) : (
                      <div className="flex items-center gap-4 p-4 rounded-lg border border-white/10 bg-[#0a0a0a]">
                        <div className="text-[#b2b2d8]">{item.icon}</div>
                        <div>
                          <p className="text-sm text-white/50">{item.title}</p>
                          <p className="text-base md:text-lg font-medium">
                            {item.value}
                          </p>
                        </div>
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>

              {/* Social Links */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                <h3 className="text-xl font-semibold mb-4">Connect With Me</h3>
                <div className="flex gap-4">
                  {socialLinks.map((social, index) => (
                    <a
                      key={index}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 flex items-center justify-center rounded-lg border border-white/10 bg-[#0a0a0a] hover:bg-[#1a1a1a] hover:border-white/30 hover:scale-110 transition-all duration-300"
                      aria-label={social.name}
                    >
                      {social.icon}
                    </a>
                  ))}
                </div>
              </motion.div>
            </motion.div>

            {/* Right Side - Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="relative"
            >
              <div className="sticky top-32">
                <form
                  onSubmit={handleSubmit}
                  className="space-y-6 p-6 md:p-8 rounded-xl border border-white/10 bg-[#0a0a0a]"
                >
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium mb-2 text-white/70"
                    >
                      Your Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-lg bg-[#111111] border border-white/10 focus:border-[#b2b2d8] focus:outline-none transition-colors text-white placeholder-white/30"
                      placeholder="John Doe"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium mb-2 text-white/70"
                    >
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-lg bg-[#111111] border border-white/10 focus:border-[#b2b2d8] focus:outline-none transition-colors text-white placeholder-white/30"
                      placeholder="john@example.com"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="subject"
                      className="block text-sm font-medium mb-2 text-white/70"
                    >
                      Subject
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-lg bg-[#111111] border border-white/10 focus:border-[#b2b2d8] focus:outline-none transition-colors text-white placeholder-white/30"
                      placeholder="Project Inquiry"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium mb-2 text-white/70"
                    >
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows="5"
                      className="w-full px-4 py-3 rounded-lg bg-[#111111] border border-white/10 focus:border-[#b2b2d8] focus:outline-none transition-colors text-white placeholder-white/30 resize-none"
                      placeholder="Tell me about your project..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-[#b2b2d8] to-[#8a8ab8] hover:from-[#c2c2e8] hover:to-[#9a9ac8] text-black font-semibold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed group"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-black/20 border-t-black rounded-full animate-spin" />
                        <span>Sending...</span>
                      </>
                    ) : (
                      <>
                        <span>Send Message</span>
                        <Send
                          size={18}
                          className="group-hover:translate-x-1 transition-transform"
                        />
                      </>
                    )}
                  </button>

                  {/* Success Message */}
                  {submitStatus === "success" && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-4 rounded-lg bg-green-500/10 border border-green-500/30 text-green-400 text-center"
                    >
                      Message sent successfully! I'll get back to you soon.
                    </motion.div>
                  )}

                  {/* Error Message */}
                  {submitStatus === "error" && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-4 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-center"
                    >
                      Oops! Something went wrong. Please try again later.
                    </motion.div>
                  )}
                </form>
              </div>
            </motion.div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default GetInTouchPage;
