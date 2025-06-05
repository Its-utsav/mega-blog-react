import { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { service } from "../../appwrite/services/config";
import { tranformBoolValue } from "../../utils";
import Button from "../Button";
import Input from "../Input";
import RTE from "../RTE";
import Select from "../Select";

const PostForm = ({ post }) => {
    // console.log(post);
    const userData = useSelector((state) => state.auth.userData);
    const navigate = useNavigate();
    // console.log(userData);
    // const { $id } = userData.user;
    const { register, handleSubmit, watch, setValue, getValues, control } =
        useForm({
            defaultValues: {
                title: post?.title || "",
                slug: post?.$id || "",
                content: post?.content || "",
                status: post?.status || "active",
            },
        });

    const submit = async (data) => {
        if (post) {
            // Updation of Postr
            const img = data.image[0];

            const file = img ? await service.fileUpload(img) : null;

            if (file) await service.fileDelete(post.featured_image);

            const updatedPost = await service.updatePost(data.$id, {
                title: data.title,
                content: data.Content,
                featured_image: file ? file.$id : null,
                slug: data.slug,
                user_id: userData.user.$id,
                status: tranformBoolValue(data.status),
            });

            if (updatedPost) navigate(`/posts/${updatedPost.$id}`);
        } else {
            const img = data.image[0];
            const file = img ? await service.fileUpload(img) : null;
            // can be ignore because of required is set to true

            const newPost = await service.createPost({
                title: data.title,
                content: data.Content,
                featured_image: file.$id,
                slug: data.slug,
                user_id: userData.user.$id,
                status: tranformBoolValue(data.status),
            });

            if (newPost) navigate(`/posts/${newPost.$id}`);
        }
    };

    //  replace space with '-'
    const slugTransform = useCallback((value) => {
        if (value && typeof value === "string")
            return value.trim().toLowerCase().replace(/\s/g, "-");

        return "";
    });

    useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === "slug") {
                setValue("slug", slugTransform(value.slug));
            }
        });

        return () => subscription.unsubscribe();
    }, [slugTransform, watch, setValue]);

    return (
        <div>
            <form
                className="m-2 flex flex-wrap"
                onSubmit={handleSubmit(submit)}
            >
                <div className="w-2/3 px-2">
                    <Input
                        label={"Title :"}
                        placeholder="Title"
                        className="mb-4"
                        {...register("title", {
                            required: true,
                        })}
                    />

                    <Input
                        label={"Slug :"}
                        placeholder="Slug"
                        className="mb-4"
                        {...register("slug", {
                            required: true,
                        })}
                    />

                    <RTE
                        label={"Content :"}
                        control={control}
                        name="Content"
                        defaultValue={getValues("content")}
                    />
                </div>
                <div className="w-1/3 px-2">
                    <Input
                        label={"Featured Image :"}
                        type="file"
                        className="mb-4"
                        accept="image/png, image/jpeg, image/jpg , image/gif"
                        {...register("image", {
                            required: !post,
                        })}
                    />
                    {post && (
                        <div className="mb-4 w-full">
                            <img
                                src={service.getFilePreview(
                                    post.featured_image
                                )}
                                alt={post.title}
                                className="rounded-2xl"
                            />
                        </div>
                    )}
                    <Select options={["ACTIVE", "INACTIVE"]} />
                    <div className="my-4 flex w-full items-center justify-center rounded-full text-center">
                        <Button type="submit" className="w-2/3">
                            {post ? "Update" : "Add !!"}
                        </Button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default PostForm;
