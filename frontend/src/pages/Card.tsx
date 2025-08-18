import { useGSAP } from "@gsap/react";
import type { IData } from "../Components/Mainpage";
import { IoIosTrash } from "react-icons/io";
import "./card.css";
import gsap from "gsap";
import Notes from '../assets/notes-record-stationery-svgrepo-com.svg'
import { AxiosError } from "axios";
import { useRef, useEffect } from "react";
import axiosInstance from "../api/axiosInstance.ts";

const gradients = [
    // Your original 6
    "from-[#7dd3fc] to-[#38bdf8]", // Light blue
    "from-[#1e3a8a] to-[#0f172a]", // Dark blue
    "from-[#d6b89c] to-[#c3a88b]", // Light brown
    "from-[#f97316] to-[#fbbf24]", // Orange
    "from-[#fca5a5] to-[#f87171]", // Light pink
    "from-[#ef4444] to-[#dc2626]", // Red

    // Extra 20
    "from-[#a78bfa] to-[#7c3aed]", // Purple
    "from-[#f9a8d4] to-[#ec4899]", // Pink
    "from-[#6ee7b7] to-[#10b981]", // Green
    "from-[#fde68a] to-[#fbbf24]", // Yellow
    "from-[#93c5fd] to-[#3b82f6]", // Sky blue
    "from-[#fcd34d] to-[#f59e0b]", // Amber
    "from-[#c084fc] to-[#9333ea]", // Violet
    "from-[#fda4af] to-[#fb7185]", // Rose
    "from-[#a7f3d0] to-[#34d399]", // Teal
    "from-[#d8b4fe] to-[#a855f7]", // Light purple
    "from-[#fbcfe8] to-[#f472b6]", // Soft pink
    "from-[#bbf7d0] to-[#4ade80]", // Mint green
    "from-[#bfdbfe] to-[#60a5fa]", // Soft blue
    "from-[#fef3c7] to-[#facc15]", // Warm yellow
    "from-[#fecaca] to-[#f87171]", // Coral
    "from-[#c7d2fe] to-[#6366f1]", // Indigo
    "from-[#fde68a] to-[#f97316]", // Sunset orange-yellow
    "from-[#e9d5ff] to-[#8b5cf6]", // Soft lavender
    "from-[#fed7aa] to-[#fb923c]", // Peach
    "from-[#f0abfc] to-[#d946ef]", // Bright pink-purple
    "from-[#a5f3fc] to-[#06b6d4]", // Aqua blue
    "from-[#ddd6fe] to-[#7c3aed]", // Soft purple
    "from-[#fecdd3] to-[#f43f5e]", // Blush pink
    "from-[#fde68a] to-[#ca8a04]", // Golden yellow
    "from-[#e0f2fe] to-[#0284c7]", // Light cyan-blue
    "from-[#ffedd5] to-[#ea580c]"  // Warm orange-brown
];

interface ICard extends IData {
    bgcolor?: "black" | "red";
    textcolor?: "white";
    getCard?: () => void;
}

const Card = ({
    title,
    link,
    tags,
    type,
    _id,
    description,
    getCard,
}: ICard) => {
    const cardRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        gsap.fromTo(
            cardRef.current,
            {
                opacity: 0,
                y: 30,
            },
            {
                y: 0,
                opacity: 1,
                duration: 0.8,
                ease: "power2.out",
            }
        );
    }, []);

    useEffect(() => {
        if (window.twttr && window.twttr.widgets) {
            window.twttr.widgets.load();
        }
    }, [link]);

    const convertToEmbedUrl = (link: string) => {
        try {
            const url = new URL(link);
            const videoId = url.searchParams.get("v");
            const startTime = url.searchParams.get("t");

            let embedUrl = `https://www.youtube.com/embed/${videoId}`;
            if (startTime) {
                const seconds = parseInt(startTime.replace("s", ""), 10);
                embedUrl += `?start=${seconds}`;
            }
            return embedUrl;
        } catch {
            return link;
        }
    };

    async function handleDeleteCard(e: string) {
        try {
            const response = await axiosInstance.delete(
                `/api/v1/delete_content/${e}`,
                {
                    headers: {
                        authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            );

            if (response.data && getCard) {
                getCard();
            }
        } catch (error) {
            const err = error as AxiosError<{ type: string }>;
            console.error(err.response?.data || err.message);
        }
    }

    return (
        <div
            ref={cardRef}
            className={`bg-gradient-to-t ${gradients[Math.floor(Math.random() * gradients.length)]}
            card-container relative flex flex-col gap-3 w-full rounded-2xl md:rounded-3xl p-4 md:p-6 shadow-lg min-h-64 sm:min-h-72 md:min-h-80 lg:min-h-96`}
        >
            <div className="flex justify-between items-center text-white">
                <h2 className="text-base sm:text-lg font-semibold text-white break-words pr-2">{title}</h2>
                <button
                    onClick={() => handleDeleteCard(_id)}
                    className="flex-shrink-0 flex justify-center items-center hover:text-red-600 transition-colors duration-300 rounded-xl p-2"
                >
                    Delete {<IoIosTrash size={20} />}
                </button>
            </div>

            {/* Media Embed */}
            {(type === "twitter" || type === "youtube") ? (
                <div className="w-full overflow-hidden rounded-xl bg-white max-h-56">
                    {type === "twitter" && (
                        <blockquote
                            className="twitter-tweet w-full"
                            style={{ margin: 0, padding: 0 }}
                        >
                            <a href={link}></a>
                        </blockquote>
                    )}
                    {type === "youtube" && (
                        <div className="relative w-full aspect-video">
                            <iframe
                                src={convertToEmbedUrl(link)}
                                title="YouTube video player"
                                className="absolute top-0 left-0 w-full h-full"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            ></iframe>
                        </div>
                    )}
                </div>
            ) : (<img src={Notes} alt="image" className="w-full max-h-48 object-contain my-auto" />)}

            {/* Description */}
            {description && (
                <p className="text-sm leading-relaxed text-gray-100">
                    <span className="font-medium text-white">Description: </span>
                    {description}
                </p>
            )}

            {/* Link */}
            <a
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-200 hover:text-blue-50 underline break-words text-sm md:text-base"
            >
                {link}
            </a>

            {/* Type */}
            <div className="text-xs md:text-sm text-gray-200">
                <span className="font-medium text-white">Type: </span>
                {type}
            </div>

            {/* Tags */}
            {tags && tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-auto">
                    {tags.map((tag) => (
                        <span
                            key={tag}
                            className="bg-blue-200 text-blue-800 text-xs px-2 py-1 rounded-full"
                        >
                            #{tag}
                        </span>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Card;