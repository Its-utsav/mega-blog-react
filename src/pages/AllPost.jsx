import { Query } from "appwrite";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router";
import { service } from "../appwrite/services/config";
import Container from "../components/Container/Container";
import PostCard from "../components/PostCard";

const AllPost = () => {
    const [posts, setPosts] = useState([]);
    const [postCount, setPostCount] = useState(0);
    const [loading, setLoading] = useState(true);

    const { pathname } = useLocation();

    let q = [Query.equal("status", true)];
    const userData = useSelector((state) => state.auth.userData);

    if (pathname === "/my-post") {
        q = [Query.equal("user_id", userData.$id)];
    }

    useEffect(() => {
        setLoading(true);
        service
            .getAllPost(q)
            .then((res) => {
                if (res) {
                    setPosts(res.documents);
                    setPostCount(res.total);
                }
            })
            .finally(() => setLoading(false));
    }, [pathname]);
    if (loading) {
        return (
            <div className="m-4">
                <h1 className="text-center text-lg text-green-300">
                    Loading ....
                </h1>
            </div>
        );
    }
    return (
        <>
            <Container>
                <div className="m-2 w-full text-center">
                    <h2>
                        Total Post's{" "}
                        <span className="font-bold text-white">
                            {postCount}{" "}
                        </span>
                        are found.
                    </h2>
                </div>
                {posts && (
                    <div className="flex flex-wrap">
                        {posts.map((post) => (
                            <div key={post.$id} className="w-1/4 p-2">
                                <PostCard {...post} />
                            </div>
                        ))}
                    </div>
                )}
            </Container>
        </>
    );
};
export default AllPost;
