import { useQuery } from "@tanstack/react-query";
import ReactQuill from "react-quill";
import { useParams } from "react-router-dom";
import { axiosInstance } from "../utils/axios";
import { getMinsToRead } from "../functions/mathFunctions";
import dayjs from "dayjs";
import { ErrorDiv } from "../components";
import { SyncLoader } from "react-spinners";
import { useEffect } from "react";

const Post = () => {
  let { postId } = useParams();

  // Fetch data from server.
  const { data, isLoading, error } = useQuery({
    queryKey: ["post-page", postId],
    queryFn: async () => {
      return axiosInstance.post("/get-post", { postId: postId });
    },
    staleTime: Infinity,
  });

  // Scroll to top
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  // Set window title.
  useEffect(() => {
    if (data?.data?.post?.title) {
      document.title = `${data?.data?.post?.title} | GridBox F1`;
    }
  }, [data?.data]);

  return (
    <main className="bg-greyBG flex justify-center py-10 rounded-lg">
      {/* Post is available */}
      {!isLoading && !error && (
        <div className="pb-10 w-full mx-2 md:mx-5 lg:mx-10 bg-white shadow-xl rounded-xl">
          {/* Thumbnail Image */}
          <div>
            <img
              src={data?.data?.post?.thumbnail}
              className={`h-52 lg:h-[30rem] w-full rounded-t ${
                data?.data?.post?.contain ? "object-contain" : "object-cover"
              } object-center`}
            ></img>
          </div>
          <div className="p-5 md:p-10 md:pt-0 mt-8">
            {/* Post Title */}
            <h1 className="mt-10 text-4xl lg:text-6xl font-bold text-ink">
              {data?.data?.post?.title}
            </h1>

            {/* Post Author */}
            <p className="break-all font-medium mt-10 pl-5">Admin</p>

            {/* Time required to read + post date */}
            <div className="mt-2 px-5 text-greyText font-medium">
              {getMinsToRead(data?.data?.post?.content)} min read | Posted on{" "}
              {dayjs(data?.data?.post?.createdAt).format("MMM DD, YYYY")}.
            </div>

            {/* Post Content */}
            <div className="mt-10">
              <ReactQuill
                value={data?.data?.post?.content}
                className="border-none postdisplay"
                theme="snow"
                readOnly
                modules={{ toolbar: null }}
              />
            </div>
          </div>
        </div>
      )}

      {/* Loader */}
      {isLoading && <SyncLoader className="py-20" size={50} />}

      {/* Post is unavailable */}
      {error && (
        <ErrorDiv text="Could not retrieve the requested article."></ErrorDiv>
      )}
    </main>
  );
};

export default Post;
