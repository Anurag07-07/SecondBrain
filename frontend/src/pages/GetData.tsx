import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import Card from "../pages/Card.tsx"; // adjust path if needed

interface ISharedItem {
    _id: string;
    title: string;
    link: string;
    type: string;
    tags: string[];
    description?: string;
    __v?: number;
}

export default function SharePage() {
    const { shareableLink } = useParams();
    const [data, setData] = useState<ISharedItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!shareableLink) return;

        setLoading(true);
        setError(null);

        axios
            .get(`/api/v1/share/${shareableLink}`)
            .then((res) => {
                setData(res.data.data || []); // "data" key inside response
            })
            .catch((err) => {
                setError(err.response?.data?.message || "Something went wrong");
            })
            .finally(() => {
                setLoading(false);
            });
    }, [shareableLink]);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen text-lg font-medium">
                ⏳ Loading share data...
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex justify-center items-center h-screen text-red-600 font-medium">
                ❌ {error}
            </div>
        );
    }

    if (!data.length) {
        return (
            <div className="flex justify-center items-center h-screen text-gray-600 font-medium">
                No shared items found.
            </div>
        );
    }

    return (
        <div className="flex flex-wrap gap-6 justify-center p-6">
            {data.map((item) => (
                <Card
                    key={item._id}
                    _id={item._id}
                    title={item.title}
                    link={item.link}
                    type={item.type}
                    tags={item.tags}
                    description={item.description}
                />
            ))}
        </div>
    );
}
