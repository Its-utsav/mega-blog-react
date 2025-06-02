import { Link } from "react-router";
import { service } from "../appwrite/services/config";

const PostCard = ({ $id, title }) => {
    const filePreview = service.getFilePreview($id);

    // TODO CHECK IT

    return (
        <Link to={`/post/${$id}`}>
            <div className="w-full rounded-xl bg-gray-100 p-4">
                <div className="mb-4 w-full justify-center">
                    <img src={filePreview} alt={title} className="rounded-xl" />
                </div>
                <h2 className="text-xl font-bold">{title}</h2>
            </div>
        </Link>
    );
};
export default PostCard;
