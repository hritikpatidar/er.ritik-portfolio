"use client";

import { useState } from "react";
import { Variants, motion, AnimatePresence } from "framer-motion";
import { FaBars, FaDatabase, FaDocker, FaGitAlt, FaNodeJs, FaReact } from "react-icons/fa";
import Themetoggle from "@/src/Component/Themetoggle";
import { useRouter } from "next/navigation";
import { SiNextdotjs, SiRedux, SiTailwindcss } from "react-icons/si";

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

const Dashboard = () => {
    const router = useRouter();

    const [activeTab, setActiveTab] = useState("profile");
    const [menuOpen, setMenuOpen] = useState(false);

    const [profile, setProfile] = useState({
        name: "",
        title: "",
        about: "",
        email: "",
        location: "",
        resumeUrl: "",
    });

    const [skills, setSkills] = useState<any[]>([]);
    const [projects, setProjects] = useState<any[]>([]);

    // ---------------- SKILLS ----------------
    const addSkill = () => {
        setSkills([...skills, { name: "", level: 0 }]);
    };

    const updateSkill = (index: number, field: string, value: any) => {
        const updated = [...skills];
        updated[index][field] = value;
        setSkills(updated);
    };

    const deleteSkill = (index: number) => {
        setSkills(skills.filter((_, i) => i !== index));
    };

    // ---------------- PROJECTS ----------------
    const addProject = () => {
        setProjects([...projects, { title: "", description: "", github: "" }]);
    };

    const updateProject = (index: number, field: string, value: any) => {
        const updated = [...projects];
        updated[index][field] = value;
        setProjects(updated);
    };

    const deleteProject = (index: number) => {
        setProjects(projects.filter((_, i) => i !== index));
    };

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
        <div className="min-h-screen bg-gray-100 dark:bg-gray-950 text-gray-800 dark:text-white">

            {/* ================= NAVBAR ================= */}
            <motion.nav
                initial={{ y: -80, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6 }}
                className="fixed w-full z-50 backdrop-blur-xl bg-white/70 dark:bg-gray-900/70 border-b border-gray-200 dark:border-gray-800"
            >
                <div className="max-w-6xl mx-auto flex justify-between items-center px-6 py-4">

                    <h1
                        className="text-xl font-bold text-blue-600 cursor-pointer"
                        onClick={() => setActiveTab("profile")}
                    >
                        Admin Dashboard
                    </h1>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex gap-8">
                        {["profile", "about", "skills", "projects"].map((item) => (
                            <button
                                key={item}
                                onClick={() => setActiveTab(item)}
                                className={`capitalize transition ${activeTab === item
                                    ? "text-blue-600 font-semibold"
                                    : "hover:text-blue-500"
                                    }`}
                            >
                                {item}
                            </button>
                        ))}
                    </div>

                    {/* Right Side */}
                    <div className="flex items-center gap-4">
                        <div
                            className="md:hidden cursor-pointer"
                            onClick={() => setMenuOpen(!menuOpen)}
                        >
                            <FaBars />
                        </div>

                        <Themetoggle />
                        <motion.button
                            whileHover={{ x: -4 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => router.push("/")}
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
                                Portfolio
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
            </motion.nav>

            {/* Mobile Menu */}
            <AnimatePresence>
                {menuOpen && (
                    <motion.div
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        className="fixed top-0 right-0 h-screen w-64 bg-white dark:bg-gray-900 shadow-lg z-50 p-6 flex flex-col gap-6"
                    >
                        {["profile", "about", "skills", "projects"].map((item) => (
                            <button
                                key={item}
                                onClick={() => {
                                    setActiveTab(item);
                                    setMenuOpen(false);
                                }}
                                className="text-left capitalize hover:text-blue-500"
                            >
                                {item}
                            </button>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>

            {/* ================= CONTENT ================= */}
            <div className="max-w-5xl mx-auto pt-28 px-6 pb-20">

                {/* PROFILE VIEW */}
                {activeTab === "profile" && (
                    <div className="bg-white dark:bg-gray-900 p-8 rounded-3xl shadow-xl">

                        {/* Header */}
                        <div className="flex flex-col md:flex-row items-center md:items-start gap-6">

                            {/* Profile Image */}
                            <div className="w-32 h-32 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500 p-1">
                                <div className="w-full h-full rounded-full bg-white dark:bg-gray-800 flex items-center justify-center text-4xl font-bold text-blue-600">
                                    {profile.name ? profile.name.charAt(0) : "R"}
                                </div>
                            </div>

                            {/* Basic Info */}
                            <div className="text-center md:text-left flex-1">
                                <h2 className="text-3xl font-bold text-gray-800 dark:text-white">
                                    {profile.name || "Ritik Kumar"}
                                </h2>

                                <p className="text-blue-600 font-medium mt-1">
                                    {profile.title || "Full Stack Developer"}
                                </p>

                                <div className="mt-4 space-y-1 text-gray-600 dark:text-gray-400">
                                    <p>📧 {profile.email || "ritik@email.com"}</p>
                                    <p>📱 +91 98765 43210</p>
                                    <p>📍 {profile.location || "Indore, India"}</p>
                                </div>
                            </div>

                            {/* Edit Button */}
                            <div>
                                <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-xl">
                                    Edit Profile
                                </button>
                            </div>
                        </div>

                        {/* Divider */}
                        <div className="border-t border-gray-200 dark:border-gray-800 my-8"></div>

                        {/* Discription Section */}
                        <div>
                            <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-white">
                                Discription
                            </h3>
                            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                                {profile.about ||
                                    "Passionate React.js developer with experience building scalable e-commerce and SaaS platforms. Skilled in modern UI design, API integrations, and performance optimization."}
                            </p>
                        </div>

                        {/* Social Links */}
                        <div className="mt-8">
                            <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">
                                Social Links
                            </h3>

                            <div className="flex gap-6 flex-wrap text-blue-600 font-medium">
                                <a href="#" className="hover:underline">
                                    📧 Email
                                </a>
                                <a href="#" className="hover:underline">
                                    💻 GitHub
                                </a>
                                <a href="#" className="hover:underline">
                                    💼 LinkedIn
                                </a>
                            </div>
                        </div>
                        {/* Resume Section */}
                        <div className="mt-10">
                            <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">
                                Resume
                            </h3>

                            <div className="bg-gray-50 dark:bg-gray-800 p-5 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-4 border border-gray-200 dark:border-gray-700">

                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-900/40 text-blue-600">
                                        📄
                                    </div>

                                    <div>
                                        <p className="font-medium text-gray-800 dark:text-white">
                                            {profile?.resumeUrl ? "Resume Available" : "Resume.pdf"}
                                        </p>
                                        <p className="text-sm text-gray-500">
                                            PDF Document
                                        </p>
                                    </div>
                                </div>

                                <div className="flex gap-3">
                                    <a
                                        href={profile?.resumeUrl || "/resume.pdf"}
                                        target="_blank"
                                        className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-sm"
                                    >
                                        View
                                    </a>

                                    <a
                                        href={profile?.resumeUrl || "/resume.pdf"}
                                        download
                                        className="px-4 py-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white text-sm"
                                    >
                                        Download
                                    </a>
                                </div>
                            </div>
                        </div>

                    </div>
                )}


                {/* ABOUT */}
                {activeTab === "about" && (
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
                )}
                {/* SKILLS */}
                {activeTab === "skills" && (
                    <div className="max-w-6xl mx-auto">

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
                )}

                {/* PROJECTS */}
                {activeTab === "projects" && (
                    <div className="space-y-6">
                        <button
                            onClick={addProject}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
                        >
                            Add Project
                        </button>

                        {projects.map((project, index) => (
                            <div
                                key={index}
                                className="bg-white dark:bg-gray-900 p-4 rounded-xl shadow space-y-3"
                            >
                                <input
                                    placeholder="Project Title"
                                    value={project.title}
                                    onChange={(e) =>
                                        updateProject(index, "title", e.target.value)
                                    }
                                    className="w-full p-2 border rounded-lg bg-transparent"
                                />

                                <textarea
                                    placeholder="Description"
                                    value={project.description}
                                    onChange={(e) =>
                                        updateProject(index, "description", e.target.value)
                                    }
                                    className="w-full p-2 border rounded-lg bg-transparent"
                                />

                                <input
                                    placeholder="GitHub Link"
                                    value={project.github}
                                    onChange={(e) =>
                                        updateProject(index, "github", e.target.value)
                                    }
                                    className="w-full p-2 border rounded-lg bg-transparent"
                                />

                                <button
                                    onClick={() => deleteProject(index)}
                                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-lg"
                                >
                                    Delete Project
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Dashboard;
