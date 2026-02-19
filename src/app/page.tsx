"use client";
import { Variants, motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import {
  FaReact,
  FaNodeJs,
  FaDatabase,
  FaGitAlt,
  FaDocker,
  FaGithub,
  FaLinkedin,
  FaEnvelope,
  FaBars
} from "react-icons/fa";

import { SiRedux, SiNextdotjs, SiTailwindcss } from "react-icons/si";

import myPhoto from "../assets/my-photo.jpg";
import { VscClose, VscGrabber } from "react-icons/vsc";

import Image from "next/image";
import Themetoggle from "@/component/Themetoggle";
import { useRouter } from "next/navigation";

const fadeUp: Variants = {
  hidden: {
    opacity: 0,
    y: 50,
  },
  visible: (custom: number = 1) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: custom * 0.15,
      duration: 0.6,
      ease: "easeOut",
    },
  }),
};

function App() {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState("home");

  useEffect(() => {
    const handleScroll = () => {

      const sections = ["home", "about", "skills", "journey", "projects", "education", "contact"];
      const scrollPos = window.scrollY + 200;

      sections.forEach((id) => {
        const section = document.getElementById(id);
        if (section) {
          if (
            scrollPos >= section.offsetTop &&
            scrollPos < section.offsetTop + section.offsetHeight
          ) {
            setActive(id);
          }
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);

    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }

    setMenuOpen(false);
  };

  const skills = [
    { name: "React.js", level: 95 },
    { name: "Node.js", level: 90 },
    { name: "MongoDB", level: 85 },
    { name: "Redux Toolkit", level: 92 },
    { name: "Next.js", level: 88 },
  ];
  // Skill Item Component
  const SkillItem = ({ icon, name, exp }: any) => {
    return (
      <div
        className="
        flex items-center justify-between
        bg-gray-100 dark:bg-gray-800
        px-5 py-3
        rounded-xl
        hover:bg-gray-200 dark:hover:bg-gray-700
        transition-all duration-300
      "
      >
        <div className="flex items-center gap-3 text-lg text-gray-800 dark:text-gray-200">
          <span className="text-blue-600 dark:text-blue-400">
            {icon}
          </span>
          <span>{name}</span>
        </div>

        <span className="text-xs bg-blue-500/20 text-blue-600 dark:text-blue-400 px-3 py-1 rounded-full">
          {exp}
        </span>
      </div>
    );
  };

  return (
    <div className="bg-white dark:bg-gray-950 text-white font-sans">

      {/* NAVBAR */}
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7 }}
        className={`fixed w-full z-50 transition-all duration-500 backdrop-blur-xl 
  py-4 bg-transparent`}
      >
        <div className="max-w-6xl mx-auto flex justify-between items-center px-6">

          {/* LOGO with animation */}
          <motion.h1
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            className="text-xl font-bold text-blue-500 cursor-pointer"
            onClick={() => scrollToSection("home")}
          >
            Er.Ritik
          </motion.h1>
          {/* this ui for logo image */}
          {/* <motion.div
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="cursor-pointer flex items-center"
            onClick={() => scrollToSection("home")}
          >
            <img
              src={logo}
              alt="RN Technology Logo"
              className="h-10 md:h-12 w-auto object-contain"
            />
          </motion.div> */}

          {/* DESKTOP MENU */}
          <div className="hidden md:flex items-center gap-8 relative">

            {["home", "about", "skills", "journey", "projects", "education", "contact"].map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item)}
                className={`relative px-2 py-1 transition-colors duration-300 cursor-pointer
          ${active === item
                    ? "text-blue-500"
                    : "text-gray-700 dark:text-gray-300 hover:text-blue-500"
                  }`}
              >
                {item.charAt(0).toUpperCase() + item.slice(1)}

                {/* Active animated pill */}
                {active === item && (
                  <motion.span
                    layoutId="activeNav"
                    className="absolute left-0 top-0 w-full h-full rounded-md bg-blue-500/10 -z-10"
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  />
                )}
              </button>
            ))}

          </div>

          {/* RIGHT SIDE */}
          <div className="flex items-center gap-4">

            <motion.div
              animate={{ rotate: menuOpen ? 90 : 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden cursor-pointer text-gray-700 dark:text-gray-300"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <FaBars size={20} />
            </motion.div>

            <Themetoggle />
            <motion.button
              whileHover={{ x: -4 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => router.push("/login")}
              className="
                flex items-center gap-2
                px-4 py-2
                rounded-full
                bg-white/70 dark:bg-gray-900/70
                backdrop-blur-md
                border border-gray-200 dark:border-gray-700
                shadow-md
                cursor-pointer
                text-gray-800 dark:text-gray-200
                hover:text-blue-600
                hover:border-blue-500/40
                transition-all duration-300
              "
            >
              {/* <motion.span
                animate={{ x: [0, -3, 0] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
              >
                ←
              </motion.span> */}

              <span className="text-sm font-medium">
                Login
              </span>
              <motion.span
                className="text-lg"
                animate={{ x: [0, 5, 0] }}
                transition={{ repeat: Infinity, duration: 1.2 }}
              >
                →
              </motion.span>
            </motion.button>
          </div>
        </div>
        {/* Mobile Menu */}
        <AnimatePresence>
          {menuOpen && (
            <>
              {/* Overlay Background */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.4 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="fixed inset-0 bg-black md:hidden z-40"
                onClick={() => setMenuOpen(false)}
              />

              {/* Sliding Panel */}
              <motion.div
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ type: "spring", stiffness: 260, damping: 25 }}
                className="fixed top-0 right-0 h-screen w-3/4 max-w-xs 
        bg-white dark:bg-gray-950 
        border-l border-gray-200 dark:border-gray-800 
        shadow-2xl z-50 p-8 flex flex-col gap-8"
              >
                {["home", "about", "skills", "journey", "projects", "education", "contact"].map((item, index) => (
                  <motion.div
                    key={item}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.07 }}
                    onClick={() => scrollToSection(item)}
                    className="text-lg font-medium text-gray-700 dark:text-gray-300 
            hover:text-blue-500 transition cursor-pointer"
                  >
                    {item.charAt(0).toUpperCase() + item.slice(1)}
                  </motion.div>
                ))}
                
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </motion.nav>


      {/* HERO */}
      <section
        id="home"
        className="min-h-screen flex items-center bg-white dark:bg-gray-950 px-6 pt-24 relative overflow-hidden transition-colors duration-300"
      >
        {/* Background Glow */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/20 dark:bg-blue-600/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-72 h-72 bg-purple-500/20 dark:bg-purple-600/20 rounded-full blur-3xl"></div>

        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center relative z-10">

          {/* LEFT CONTENT */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6 text-gray-900 dark:text-white">
              Hi, I'm{" "}
              <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
                Ritik Kumar Patidar
              </span>
            </h1>

            <h2 className="text-xl md:text-2xl text-blue-500 mb-4">
              Senior Mern Stack Developer
            </h2>

            <p className="text-gray-600 dark:text-gray-400 leading-7 mb-8 max-w-lg">
              4+ years of experience building scalable web applications,
              enterprise dashboards, e-commerce platforms, and RESTful APIs.
              Passionate about clean architecture, performance optimization,
              and user-centric design.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4">
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition shadow-lg hover:shadow-blue-500/30">
                Download Resume
              </button>

              <button
                onClick={() => scrollToSection("contact")}
                className="border border-blue-500 text-gray-900 dark:text-white px-6 py-3 rounded-lg hover:bg-blue-500/10 transition"
              >
                Contact Me
              </button>
            </div>
          </motion.div>

          {/* RIGHT PROFILE IMAGE */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex justify-center"
          >
            <div className="relative">
              {/* Glow Border */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-3xl blur-xl opacity-30"></div>

              <Image
                src={myPhoto}
                alt="profile"
                className="relative w-72 md:w-96 rounded-3xl border border-gray-300 dark:border-gray-800 shadow-2xl"
              />
            </div>
          </motion.div>

        </div>
      </section>


      {/* ABOUT */}
      <section
        id="about"
        className="py-28 bg-gray-100 dark:bg-gray-900 px-6 transition-colors duration-300"
      >
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">

          {/* LEFT SIDE - TEXT */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            variants={fadeUp}
            custom={1}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold mb-6 text-gray-900 dark:text-white">
              About Me
            </h2>

            <p className="text-gray-600 dark:text-gray-400 leading-8 mb-6">
              I'm <span className="text-blue-600 dark:text-blue-400 font-semibold">
                Ritik Kumar Patidar
              </span>, a passionate React.js Developer with 3+ years of professional experience
              building scalable, high-performance web applications.
            </p>

            <p className="text-gray-600 dark:text-gray-400 leading-8 mb-6">
              I specialize in React.js, Next.js, Redux Toolkit, TypeScript,
              Material-UI, and Tailwind CSS. My focus lies in crafting modern UI/UX
              experiences while maintaining clean architecture and optimized performance.
            </p>

            <p className="text-gray-600 dark:text-gray-400 leading-8">
              From E-Commerce platforms to enterprise dashboards,
              I have contributed to building production-ready systems
              that deliver real business value.
            </p>
          </motion.div>

          {/* RIGHT SIDE - HIGHLIGHT CARDS */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            variants={fadeUp}
            custom={1}
            viewport={{ once: true }}
            className="grid grid-cols-2 gap-10"
          >

            {/* Experience */}
            <motion.div
              className="
      bg-white dark:bg-gray-900
      p-8
      rounded-2xl
      border border-gray-200 dark:border-gray-800
      shadow-md dark:shadow-none
      hover:shadow-xl dark:hover:shadow-blue-500/10
      hover:-translate-y-2
      transition-all duration-300
    "
            >
              <h3 className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                3+
              </h3>
              <p className="text-gray-700 dark:text-gray-300 text-sm">
                Years of Experience
              </p>
            </motion.div>

            {/* Projects */}
            <motion.div
              className="
      bg-white dark:bg-gray-900
      p-8
      rounded-2xl
      border border-gray-200 dark:border-gray-800
      shadow-md dark:shadow-none
      hover:shadow-xl dark:hover:shadow-blue-500/10
      hover:-translate-y-2
      transition-all duration-300
    "
            >
              <h3 className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                15+
              </h3>
              <p className="text-gray-700 dark:text-gray-300 text-sm">
                Completed Projects
              </p>
            </motion.div>

            {/* Tech Stack */}
            <motion.div
              className="
      bg-white dark:bg-gray-900
      p-8
      rounded-2xl
      border border-gray-200 dark:border-gray-800
      shadow-md dark:shadow-none
      hover:shadow-xl dark:hover:shadow-blue-500/10
      hover:-translate-y-2
      transition-all duration-300
    "
            >
              <h3 className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                10+
              </h3>
              <p className="text-gray-700 dark:text-gray-300 text-sm">
                Modern Technologies
              </p>
            </motion.div>

            {/* Location */}
            <motion.div
              className="
                  bg-white dark:bg-gray-900
                  p-8
                  rounded-2xl
                  border border-gray-200 dark:border-gray-800
                  shadow-md dark:shadow-none
                  hover:shadow-xl dark:hover:shadow-blue-500/10
                  hover:-translate-y-2
                  transition-all duration-300
                "
            >
              <h3 className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                India
              </h3>
              <p className="text-gray-700 dark:text-gray-300 text-sm">
                Neemuch District (Jeeran)
              </p>
            </motion.div>

          </motion.div>


        </div>
      </section>


      {/* SKILLS */}
      <section
        id="skills"
        className="py-28 bg-gray-50 dark:bg-gray-950 px-6 transition-colors duration-300"
      >
        <div className="max-w-6xl mx-auto">

          <motion.h2
            className="text-4xl font-bold text-center mb-16 text-gray-900 dark:text-white"
            initial="hidden"
            whileInView="visible"
            variants={fadeUp}
            custom={1}
            viewport={{ once: true }}
          >
            Technical Expertise
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-12">

            {/* FRONTEND */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              variants={fadeUp}
              custom={1}
              viewport={{ once: true }}
              className="
          relative
          bg-white dark:bg-gray-900
          p-10
          rounded-3xl
          border border-gray-200 dark:border-gray-800
          shadow-lg dark:shadow-none
          hover:shadow-xl dark:hover:shadow-blue-500/10
          hover:-translate-y-3
          transition-all duration-500
          group
        "
            >
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-blue-500/5 to-purple-500/5 dark:from-blue-500/10 dark:to-purple-500/10 opacity-0 group-hover:opacity-100 transition duration-500"></div>

              <h3 className="text-2xl font-semibold mb-8 text-blue-600 dark:text-blue-400 relative z-10">
                Frontend Engineering
              </h3>

              <div className="space-y-5 relative z-10">
                <SkillItem icon={<FaReact />} name="React.js" exp="4+ Years" />
                <SkillItem icon={<SiNextdotjs />} name="Next.js" exp="2+ Years" />
                <SkillItem icon={<SiRedux />} name="Redux Toolkit" exp="3+ Years" />
                <SkillItem icon={<SiTailwindcss />} name="Tailwind CSS" exp="3+ Years" />
              </div>
            </motion.div>

            {/* BACKEND */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              variants={fadeUp}
              custom={1}
              viewport={{ once: true }}
              className="
          relative
          bg-white dark:bg-gray-900
          p-10
          rounded-3xl
          border border-gray-200 dark:border-gray-800
          shadow-lg dark:shadow-none
          hover:shadow-xl dark:hover:shadow-blue-500/10
          hover:-translate-y-3
          transition-all duration-500
          group
        "
            >
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-blue-500/5 to-purple-500/5 dark:from-blue-500/10 dark:to-purple-500/10 opacity-0 group-hover:opacity-100 transition duration-500"></div>

              <h3 className="text-2xl font-semibold mb-8 text-blue-600 dark:text-blue-400 relative z-10">
                Backend Development
              </h3>

              <div className="space-y-5 relative z-10">
                <SkillItem icon={<FaNodeJs />} name="Node.js" exp="4+ Years" />
                <SkillItem icon={<FaDatabase />} name="MongoDB" exp="4+ Years" />
                <SkillItem icon={<FaDatabase />} name="REST API Design" exp="4+ Years" />
              </div>
            </motion.div>

            {/* DEVOPS */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              variants={fadeUp}
              custom={1}
              viewport={{ once: true }}
              className="
          relative
          bg-white dark:bg-gray-900
          p-10
          rounded-3xl
          border border-gray-200 dark:border-gray-800
          shadow-lg dark:shadow-none
          hover:shadow-xl dark:hover:shadow-blue-500/10
          hover:-translate-y-3
          transition-all duration-500
          group
        "
            >
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-blue-500/5 to-purple-500/5 dark:from-blue-500/10 dark:to-purple-500/10 opacity-0 group-hover:opacity-100 transition duration-500"></div>

              <h3 className="text-2xl font-semibold mb-8 text-blue-600 dark:text-blue-400 relative z-10">
                DevOps & Tools
              </h3>

              <div className="space-y-5 relative z-10">
                <SkillItem icon={<FaGitAlt />} name="Git & GitHub" exp="4+ Years" />
                <SkillItem icon={<FaDocker />} name="Docker" exp="1+ Year" />
              </div>
            </motion.div>

          </div>
        </div>
      </section>


      {/* PROFESSIONAL JOURNEY */}
      <section
        id="journey"
        className="py-20 bg-gray-50 dark:bg-gray-950 px-6 transition-colors duration-300"
      >
        <div className="max-w-4xl mx-auto">

          <h2 className="text-3xl font-bold text-center mb-10 text-gray-900 dark:text-white">
            Professional Journey
          </h2>

          {[
            {
              title: "Senior React Developer",
              year: "2023 - Present",
              desc: "Leading frontend development, mentoring team members, optimizing performance.",
            },
            {
              title: "Full Stack Developer",
              year: "2021 - 2023",
              desc: "Developed scalable REST APIs, integrated payment systems, built admin dashboards.",
            },
            {
              title: "Frontend Developer",
              year: "2020 - 2021",
              desc: "Built responsive UI using React and improved UX across web applications.",
            },
          ].map((item, index) => (
            <motion.div
              key={index}
              className="mb-10 border-l-2 border-blue-500 pl-6 relative"
              initial="hidden"
              whileInView="visible"
              variants={fadeUp}
              custom={index}
              viewport={{ once: true }}
            >
              {/* Timeline Dot */}
              <div className="absolute -left-[9px] top-2 w-4 h-4 bg-blue-500 rounded-full border-2 border-white dark:border-gray-950"></div>

              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                {item.title}
              </h3>

              <span className="text-blue-600 dark:text-blue-400 text-sm">
                {item.year}
              </span>

              <p className="text-gray-600 dark:text-gray-400 mt-2 leading-6">
                {item.desc}
              </p>
            </motion.div>
          ))}

        </div>
      </section>

      {/* PROJECTS */}
      <section
        id="projects"
        className="py-24 bg-gray-50 dark:bg-gray-950 px-6 transition-colors duration-300"
      >
        <div className="max-w-6xl mx-auto">

          <motion.h2
            className="text-3xl font-bold text-center mb-14 text-gray-900 dark:text-white"
            initial="hidden"
            whileInView="visible"
            variants={fadeUp}
            custom={1}
            viewport={{ once: true }}
          >
            Featured Projects
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-10">

            {[
              {
                title: "E-Commerce System",
                desc: "Full-stack scalable e-commerce platform with product variants, cart system, secure authentication, and admin dashboard.",
                tech: ["React", "Node.js", "MongoDB", "Redux"],
              },
              {
                title: "Logistics Dashboard",
                desc: "Real-time shipment tracking dashboard with API integration, order management, and role-based access control.",
                tech: ["React", "REST API", "JWT", "Tailwind"],
              },
              {
                title: "SaaS CRM Platform",
                desc: "Multi-tenant CRM tool with analytics, lead management, and secure cloud deployment architecture.",
                tech: ["Next.js", "Express", "MongoDB", "Stripe"],
              },
            ].map((project, index) => (
              <motion.div
                key={index}
                initial="hidden"
                whileInView="visible"
                variants={fadeUp}
                custom={index}
                viewport={{ once: true }}
                className="
            bg-white dark:bg-gray-900
            p-8
            rounded-2xl
            border border-gray-200 dark:border-gray-800
            shadow-md dark:shadow-none
            hover:shadow-xl dark:hover:shadow-blue-500/10
            hover:-translate-y-2
            transition-all duration-300
            flex flex-col justify-between
          "
              >
                <div>
                  <h3 className="text-xl font-semibold mb-3 text-blue-600 dark:text-blue-400">
                    {project.title}
                  </h3>

                  <p className="text-gray-600 dark:text-gray-400 text-sm leading-6 mb-4">
                    {project.desc}
                  </p>

                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tech.map((tech, i) => (
                      <span
                        key={i}
                        className="
                    bg-gray-200 dark:bg-gray-800
                    text-gray-700 dark:text-gray-300
                    text-xs px-3 py-1 rounded-full
                  "
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Buttons */}
                <div className="flex gap-4 mt-4">
                  <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg text-sm transition">
                    Live Demo
                  </button>

                  <button className="flex-1 border border-blue-500 text-gray-900 dark:text-white hover:bg-blue-500/10 py-2 rounded-lg text-sm transition">
                    GitHub
                  </button>
                </div>
              </motion.div>
            ))}

          </div>
        </div>
      </section>


      {/* EDUCATION */}
      <section
        id="education"
        className="py-24 bg-gray-50 dark:bg-gray-950 px-6 transition-colors duration-300"
      >
        <div className="max-w-6xl mx-auto">

          <motion.h2
            className="text-3xl font-bold text-center mb-14 text-gray-900 dark:text-white"
            initial="hidden"
            whileInView="visible"
            variants={fadeUp}
            custom={1}
            viewport={{ once: true }}
          >
            Education
          </motion.h2>

          <div className="grid md:grid-cols-2 gap-10">

            {/* MCA */}
            <motion.div
              className="
          bg-white dark:bg-gray-900
          p-8
          rounded-2xl
          border border-gray-200 dark:border-gray-800
          shadow-md dark:shadow-none
          hover:shadow-xl dark:hover:shadow-blue-500/10
          hover:-translate-y-2
          transition-all duration-300
        "
              initial="hidden"
              whileInView="visible"
              variants={fadeUp}
              custom={1}
              viewport={{ once: true }}
            >
              <h3 className="text-xl font-semibold mb-2 text-blue-600 dark:text-blue-400">
                Master of Computer Applications (MCA)
              </h3>

              <p className="text-gray-700 dark:text-gray-300 mb-2">
                Gyanodaya Institute of Technology
              </p>

              <p className="text-gray-500 dark:text-gray-400 text-sm mb-4">
                2022 - 2024
              </p>

              <p className="text-gray-600 dark:text-gray-400 text-sm leading-6">
                Specialized in Full Stack Development, Data Structures,
                Database Management Systems, and Software Engineering.
              </p>
            </motion.div>

            {/* BCA */}
            <motion.div
              className="
          bg-white dark:bg-gray-900
          p-8
          rounded-2xl
          border border-gray-200 dark:border-gray-800
          shadow-md dark:shadow-none
          hover:shadow-xl dark:hover:shadow-blue-500/10
          hover:-translate-y-2
          transition-all duration-300
        "
              initial="hidden"
              whileInView="visible"
              variants={fadeUp}
              custom={1}
              viewport={{ once: true }}
            >
              <h3 className="text-xl font-semibold mb-2 text-blue-600 dark:text-blue-400">
                Bachelor of Computer Applications (BCA)
              </h3>

              <p className="text-gray-700 dark:text-gray-300 mb-2">
                Gyanodaya Institute of Technology
              </p>

              <p className="text-gray-500 dark:text-gray-400 text-sm mb-4">
                2019 - 2022
              </p>

              <p className="text-gray-600 dark:text-gray-400 text-sm leading-6">
                Built strong foundation in Programming, Web Technologies,
                Computer Networks, and Object-Oriented Design.
              </p>
            </motion.div>

          </div>
        </div>
      </section>


      {/* CONTACT */}
      <section
        id="contact"
        className="py-28 bg-gray-50 dark:bg-gray-950 px-6 relative overflow-hidden transition-colors duration-300"
      >
        {/* Background Glow */}
        <div className="absolute top-10 left-10 w-72 h-72 bg-blue-600/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-72 h-72 bg-purple-600/10 rounded-full blur-3xl"></div>

        <div className="max-w-4xl mx-auto text-center relative z-10">

          <motion.h2
            className="text-4xl font-bold mb-6 text-gray-900 dark:text-white"
            initial="hidden"
            whileInView="visible"
            variants={fadeUp}
            custom={1}
            viewport={{ once: true }}
          >
            Let’s Connect
          </motion.h2>

          <motion.p
            className="text-gray-600 dark:text-gray-400 mb-14 max-w-2xl mx-auto leading-7"
            initial="hidden"
            whileInView="visible"
            variants={fadeUp}
            custom={1}
            viewport={{ once: true }}
          >
            I'm open to full-time opportunities, freelance projects,
            and high-impact collaborations. Feel free to reach out —
            let’s build something exceptional together.
          </motion.p>

          {/* CONTACT CARDS */}
          <div className="grid md:grid-cols-3 gap-8">

            {/* EMAIL */}
            <motion.a
              href="mailto:yourmail@example.com"
              className="
          bg-white dark:bg-gray-900
          p-8 rounded-3xl
          border border-gray-200 dark:border-gray-800
          hover:border-blue-500/40
          hover:-translate-y-2
          transition-all duration-300
          group
        "
              initial="hidden"
              whileInView="visible"
              variants={fadeUp}
              custom={1}
              viewport={{ once: true }}
            >
              <FaEnvelope className="text-4xl text-blue-500 dark:text-blue-400 mx-auto mb-4 group-hover:scale-110 transition" />
              <h3 className="font-semibold text-lg mb-2 text-gray-900 dark:text-white">
                Email
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                yourmail@example.com
              </p>
            </motion.a>

            {/* GITHUB */}
            <motion.a
              href="https://github.com/hritikpatidar"
              target="_blank"
              rel="noreferrer"
              className="
          bg-white dark:bg-gray-900
          p-8 rounded-3xl
          border border-gray-200 dark:border-gray-800
          hover:border-blue-500/40
          hover:-translate-y-2
          transition-all duration-300
          group
        "
              initial="hidden"
              whileInView="visible"
              variants={fadeUp}
              custom={1}
              viewport={{ once: true }}
            >
              <FaGithub className="text-4xl text-blue-500 dark:text-blue-400 mx-auto mb-4 group-hover:scale-110 transition" />
              <h3 className="font-semibold text-lg mb-2 text-gray-900 dark:text-white">
                GitHub
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                github.com/yourprofile
              </p>
            </motion.a>

            {/* LINKEDIN */}
            <motion.a
              href="https://www.linkedin.com/in/ritik-patidar-0453a4235/"
              target="_blank"
              rel="noreferrer"
              className="
          bg-white dark:bg-gray-900
          p-8 rounded-3xl
          border border-gray-200 dark:border-gray-800
          hover:border-blue-500/40
          hover:-translate-y-2
          transition-all duration-300
          group
        "
              initial="hidden"
              whileInView="visible"
              variants={fadeUp}
              custom={1}
              viewport={{ once: true }}
            >
              <FaLinkedin className="text-4xl text-blue-500 dark:text-blue-400 mx-auto mb-4 group-hover:scale-110 transition" />
              <h3 className="font-semibold text-lg mb-2 text-gray-900 dark:text-white">
                LinkedIn
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                linkedin.com/in/yourprofile
              </p>
            </motion.a>

          </div>

          {/* CTA BUTTON */}
          <motion.div
            className="mt-16"
            initial="hidden"
            whileInView="visible"
            variants={fadeUp}
            custom={1}
            viewport={{ once: true }}
          >
            <a
              href="mailto:yourmail@example.com"
              className="
          inline-block
          bg-blue-600 hover:bg-blue-700
          text-white
          px-8 py-4
          rounded-xl
          transition
          shadow-lg hover:shadow-blue-500/30
        "
            >
              Get In Touch
            </a>
          </motion.div>

        </div>
      </section>




      <footer className="bg-gray-100 dark:bg-gray-900 py-6 text-center transition-colors duration-300">
        <p className="text-gray-600 dark:text-gray-400 text-sm">
          © {new Date().getFullYear()} RN Technology. All rights reserved.
        </p>
      </footer>

    </div >
  );
}

export default App;
