import { useEffect, useState } from "react";
import { service } from "../appwrite/services/config";
import Container from "../components/Container/Container";
import PostCard from "../components/PostCard";

const AllPost = () => {
    const [posts, setPosts] = useState([]);
    const [postCount, setPostCount] = useState(0);
    useEffect(() => {
        service.getAllPost().then((res) => {
            if (res) {
                setPosts(res.documents);
                setPostCount(res.total);
            }
        });
    }, []);

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
