import { Link, Head } from '@inertiajs/react';
import { GuestNavbar } from '@/Components/Navbar/GuestNavbar';
import LoadingPage from '@/Components/LoadingPage';
import { useEffect, useState } from 'react';
import HeroSection from '@/Components/Sections/HeroSection';
import UseCaseSection from '@/Components/Sections/UseCaseSection';
import PricingSection from '@/Components/Sections/PricingSection';
import FooterSection from '@/Components/Sections/FooterSection';

export default function Welcome(props) {
    const [loading, setLoading] = useState(true);
    const [theme, setTheme] = useState(
        localStorage.getItem("theme") || (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light")
      );
    
    useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);
    }, [theme]);

    function toggleTheme() {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
    }
    
    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 2000);

        return () => clearTimeout(timer);
    }, []);
    const features = [
        {
            title:'Voice-Activated',
            subtitle: '"Easily schedule tasks and set reminders hands-free. Just speak, and let VIRA handle the details."'
        },
        {
            title:'Integrated Scheduling',
            subtitle: '"From daily tasks to team meetings, keep everything organized in one seamless place."'
        },
        {
            title:'Routine Management',
            subtitle: '"Optimize your day-to-day routines and never miss a beat with tailored reminders."'
        },
        {
            title:'Smart Reminders',
            subtitle: '"Get timely reminders to stay on track, whether it’s for a quick task or a long-term goal."'
        }
    ]
    const useCases = [
        {
          title: "Daily Task Scheduling",
          description: "Daily Task Scheduling",
          points: [
            "Add tasks quickly using voice or text input.",
            "Organize tasks by priority to focus on what matters most.",
            "Receive reminders throughout the day to stay on track."
          ]
        },
        {
          title: "Team Meeting Coordination",
          description: "Team Meeting Coordination",
          points: [
            "Schedule meetings with team members using a shared calendar.",
            "Set reminders for everyone to prepare in advance.",
            "Easily reschedule meetings and notify participants automatically."
          ]
        },
        {
          title: "Project Deadline Tracking",
          description: "Project Deadline Tracking",
          points: [
            "Set deadlines for individual tasks and overall projects.",
            "Receive alerts as deadlines approach to keep projects on schedule.",
            "Track project milestones to measure progress over time."
          ]
        },
        {
          title: "Personalized Routine Management",
          description: "Personalized Routine Management",
          points: [
            "Create routines for daily, weekly, or monthly tasks.",
            "Set reminders to build consistent habits.",
            "Customize schedules to fit your unique lifestyle and goals."
          ]
        },
        {
          title: "Goal Tracking",
          description: "Goal Tracking",
          points: [
            "Set both short-term and long-term goals.",
            "Schedule periodic check-ins to review your progress.",
            "Stay motivated with reminders that keep you moving forward."
          ]
        },
        {
          title: "Event and Appointment Reminders",
          description: "Event and Appointment Reminders",
          points: [
            "Schedule important events like birthdays or anniversaries.",
            "Receive reminders well in advance to prepare.",
            "Use recurring reminders for annual events to stay organized."
          ]
        },
        {
          title: "Voice-Powered Quick Notes",
          description: "Voice-Powered Quick Notes",
          points: [
            "Capture quick ideas or notes using just your voice.",
            "Save important information without needing to type.",
            "Organize notes by category for easy reference later."
          ]
        }
      ];
      

    return (
        <>
            {loading ? (
                <LoadingPage />
            ) : (
                <>
                    <GuestNavbar theme={theme} toggleTheme={toggleTheme}/>
                    <Head title="VIRA - Your personal AI Assistant" />
                    <HeroSection className="min-h-screen" features={features}/>
                    <UseCaseSection className="min-h-screen bg-gray-200 dark:bg-gray-900" useCases={useCases}/>
                    <PricingSection className="min-h-screen" />
                    <FooterSection className=""/>
                </>
            )}
        </>
    );
}
