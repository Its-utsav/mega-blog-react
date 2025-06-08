import { Link } from "react-router";
import { service } from "../appwrite/services/config";

const PostCard = ({ featured_image, $id, title }) => {
    const filePreview = service.getFilePreview(featured_image);

    // TODO CHECK IT

    return (
        <Link to={`/post/${$id}`}>
            <div className="card" title={title}>
                <div className="mb-4 flex w-full items-center justify-center">
                    <img
                        src={filePreview}
                        alt={title}
                        className="h-24 rounded-xl object-cover"
                    />
                </div>
                <h2 className="overflow-hidden text-center text-xl font-bold text-ellipsis whitespace-nowrap">
                    {title}
                </h2>
            </div>
        </Link>
    );
};
export default PostCard;
