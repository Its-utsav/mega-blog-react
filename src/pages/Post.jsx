import parse from "html-react-parser";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router";
import { service } from "../appwrite/services/config";
import { Button, Container } from "../components";

const Post = () => {
    const { slug } = useParams();

    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);

    const userData = useSelector((state) => state.auth.userData);
    const navigate = useNavigate();

    useEffect(() => {
        setLoading(true);
        if (slug) {
            service
                .getPost(slug)
                .then((post) => {
                    if (post) setPost(post);
                })
                .finally(() => setLoading(false));
        }
    }, [slug, navigate]);

    const isAuthor = userData && post ? userData.$id === post.user_id : false;
    const deletePost = () => {
        service.deletePost(post.$id).then((res) => {
            if (res) {
                // delete img
                service.fileDelete(post.featured_image);
                navigate("/");
            }
        });
    };

    if (loading) {
        return (
            <h1 className="text-center text-2xl font-bold text-green-600">
                Loading ....
            </h1>
        );
    }
    return post ? (
        <div className="py-8">
            <Container>
                {isAuthor && (
                    <div className="m-4 flex justify-end-safe">
                        <Link to={`/edit-post/${post.$id}`}>
                            <Button className="mr-3 bg-green-500">Edit</Button>
                        </Link>
                        <Button className="bg-red-500" onClick={deletePost}>
                            Delete
                        </Button>
                    </div>
                )}
                <div className="relative mb-4 flex w-full justify-center rounded-xl border p-2">
                    <img
                        src={service.getFilePreview(post.featured_image)}
                        alt=""
                    />
                </div>

                <div className="mb-6 w-full">
                    <h1 className="text-2xl font-bold">{post.title}</h1>
                </div>
                <div className="browser-css">{parse(post.content)}</div>
            </Container>
        </div>
    ) : null;
};

export default Post;
