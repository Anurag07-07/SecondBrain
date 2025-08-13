import { useGSAP } from "@gsap/react";
import type { IData } from "../Components/Mainpage";
import { IoIosTrash } from "react-icons/io";
import "./card.css";
import gsap from "gsap";
import axios, { AxiosError } from "axios";
import { useRef, useEffect } from "react";

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
            const response = await axios.delete(
                `http://localhost:3000/api/v1/delete_content/${e}`,
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
            className="card-container relative flex flex-col gap-3 w-full lg:w-[25vw] md:m-6 rounded-3xl p-6 bg-gray-200 shadow-lg"
            style={{height:"500px"}}
        >
            <div className="flex justify-between items-start">
                <h2 className="text-lg font-semibold">{title}</h2>
                <button
                    onClick={() => handleDeleteCard(_id)}
                    className="hover:bg-red-600 transition-colors duration-300 rounded-xl p-2"
                >
                    <IoIosTrash size={20} />
                </button>
            </div>

            {/* Media Embed */}
            {(type === "twitter" || type === "youtube") && (
                <div className="lg:w-full lg:overflow-auto  lg:rounded-xl bg-white lg:scroll-auto w-full overflow-y-scroll max-h-48 scrollbar-hide">
                    {type === "twitter" && (
                        <blockquote
                            className="twitter-tweet"
                            style={{ margin: 0, padding: 0 }}
                        >
                            <a href={link}></a>
                        </blockquote>
                    )}

                    {type === "youtube" && (
                        <div className="relative w-full pb-[56.25%] h-0">
                            <iframe
                                src={convertToEmbedUrl(link)}
                                title="YouTube video player"
                                className="absolute top-0 left-0 w-full h-full"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            ></iframe>
                        </div>
                    )}
                </div>
            )}

            {/* Description */}
            {description && (
                <p className="text-sm text-gray-700 leading-relaxed">
                    <span className="font-medium">Description: </span>
                    {description}
                </p>
            )}

            {/* Link */}
            <a
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline break-words"
            >
                {link}
            </a>

            {/* Type */}
            <div className="text-sm">
                <span className="font-medium">Type: </span>
                {type}
            </div>

            {/* Tags */}
            {tags && tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
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
