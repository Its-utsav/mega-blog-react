import { Link } from "react-router";
import { service } from "../appwrite/services/config";

const PostCard = (props) => {
    const filePreview = service.getFilePreview(props.featured_image);
    console.log(props, filePreview);
    // TODO CHECK IT

    return (
        <Link to={`/post/${props.$id}`}>
            <div className="w-full rounded-xl bg-gray-100 p-4">
                <div className="mb-4 w-full justify-center">
                    <img
                        src={filePreview}
                        alt={props.title}
                        className="rounded-xl"
                    />
                </div>
                <h2 className="text-xl font-bold">{props.title}</h2>
            </div>
        </Link>
    );
};
export default PostCard;
