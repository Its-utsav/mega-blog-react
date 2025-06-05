// "use clinet";
import { useEffect, useState } from "react";
import Container from "../components/Container/Container";
import { service } from "../appwrite/services/config";
import PostCard from "../components/PostCard";

const AllPost = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        service.getAllPost([]).then((res) => {
            if (res) setPosts(res.documents);
        });
    }, []);

    console.log(posts);

    return (
        <>
            <Container>
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
