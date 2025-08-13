import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import gsap from "gsap";
import axios from "axios";
import "./card.css";
import  {useGSAP} from "@gsap/react";

interface IData {
    _id: string;
    title: string;
    link: string;
    description: string;
    type: string;
    tags: string[];
}

const GetData = () => {
    const { shareableLink } = useParams();


    const [data, setData] = useState<IData[]>([]);
    const cardRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        async function fetchData() {
            try {
                const  data  = localStorage.getItem('link')
                console.log(data)
                const response = await axios.get(
                    `http://localhost:3000/api/v1/share/${shareableLink}`
                );
                setData(response.data);
                console.log(response.data)// Assuming your API returns an array
            } catch (err) {
                console.error(err);
            }
        }
        fetchData();
    }, [shareableLink]);

    useGSAP(() => {
        if (cardRef.current) {
            gsap.fromTo(
                cardRef.current,
                { opacity: 0, y: 30 },
                { y: -10, opacity: 1, duration: 1.2 }
            );
        }
    });

    return (
        <div className="lg:flex lg:flex-wrap lg:gap-6 lg:justify-center p-6">

            {data.length > 0 ? (
                data.map((item) => (
                    <div
                        key={item._id}
                        ref={cardRef}
                        className="card-container lg:relative lg:flex lg:flex-col lg:gap-y-3 lg:w-[25vw] lg:rounded-4xl lg:p-10 lg:bg-gradient-to-bl from-gray-300 via-darkgrey-100"
                    >
                        <div>
                            <span>Title: </span>
                            {item.title}
                        </div>
                        <div className="lg:font-extralight">
                            {item.description && (
                                <div>
                                    <span>Description: </span>
                                    {item.description}
                                </div>
                            )}
                        </div>
                        <a href={item.link} target="_blank" rel="noreferrer">
                            <span>Link: </span>
                            {item.link}
                        </a>
                        <div>
                            <span>Type: </span>
                            {item.type}
                        </div>
                        <div>
                            <span>Tags: </span>
                            {item.tags?.map((tag) => (
                                <span
                                    key={tag}
                                    className="lg:bg-blue-200 lg:rounded-2xl lg:px-2 lg:text-blue-700"
                                >
                  #{tag}{" "}
                </span>
                            ))}
                        </div>
                    </div>
                ))
            ) : (
                <p>No shared content found</p>
            )}
        </div>
    );
};

export default GetData;
