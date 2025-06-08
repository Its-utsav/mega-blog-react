import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { service } from "../appwrite/services/config";
import { Container, Loading, PostForm } from "../components/";

const EditPost = () => {
    const [post, setPost] = useState();
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();
    const { slug } = useParams();

    useEffect(() => {
        setLoading(true);
        if (slug) {
            service
                .getPost(slug)
                .then((res) => {
                    if (res) {
                        setPost(res);
                    }
                })
                .finally(() => {
                    setLoading(false);
                });
        } else {
            navigate("/");
        }
    }, [slug, navigate]);

    if (loading) {
        return <Loading />;
    }
    // console.log(post);
    return post ? (
        <div className="py-8">
            <Container>
                <PostForm post={post} />
            </Container>
        </div>
    ) : null;
};

export default EditPost;
